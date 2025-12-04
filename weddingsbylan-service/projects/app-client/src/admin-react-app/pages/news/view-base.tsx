import React, { Component } from 'react'
import { IUploadResult, TNewsProps } from './types'
import { DictToListNotNull } from '@/admin-react-app/ultilities/helper'
import { ActionPannel, CRUDPannel } from '@/modules/Library/Table'
import { INews } from '@/admin-react-app/model'
import { FormCreate } from './form.create'
import { FormEdit } from './form.edit'
import { FormDelete } from './form.delete'
import { getTableInstance, language, PropsContext, TableInstance } from './configs'
import {
  IProcessItem,
  IUploadLayoutContext,
  mapUploadLayoutContext,
  OnBatchCompleteFunction,
  OnUploadExecutorFunction,
  UploadLayout
} from '@/modules/LibraryLab/upload-layout'
import { fileToAttachItem, IAttachItem, ICellAttachWidgetParams, IOnChangeParams } from '@/modules/LibraryLab/attach-widget'

type IAttachItemDTO = IAttachItem<{ resourceId: string }>

interface IViewBaseProps extends TNewsProps {
  onAttachChange: ICellAttachWidgetParams['onChange']
  onUploadAttachFile: (file: File, signal?: AbortSignal) => Promise<IUploadResult>
  onDeleteAttachFile?: (fileName: string) => Promise<void>
}

interface INewsPageState {
  loading: boolean
}

export class ViewBase extends Component<IViewBaseProps, INewsPageState> {
  constructor(props: IViewBaseProps) {
    super(props)
    this.state = {
      loading: false
    }
  }
  onCreate = async (data: Partial<INews>) => {
    await this.props.Create(data)
  }
  onEdit = async (data: Partial<INews>) => {
    data?.Id && (await this.props.Update(data.Id, data))
  }
  onDetele = async (data?: INews) => {
    if (data?.Id) {
      try {
        this.setState({ loading: true })
        await this.props.Delete(data.Id)
      } catch (error) {
      } finally {
        this.setState({ loading: false })
      }
    }
  }
  refUploadLayout: UploadLayout | null = null
  render() {
    return (
      <PropsContext.Provider value={{ getProps: () => this.props }}>
        <UploadLayout
          ref={(ref) => {
            this.refUploadLayout = ref
          }}
          onUploadExecutor={this.handleUpload}
          onBatchComplete={this.handleBatchComplete}
        >
          {mapUploadLayoutContext((context) => (
            <TableInstance
              attachActions={{ onChange: (x) => this.handleAttachChange(context, x) }}
              InnerProps={{ loading: this.state.loading, disableRowSelectionOnClick: true, rowHeight: 60 }}
              CRUDPannel={(p) => (
                <CRUDPannel
                  Title={language.Blog}
                  Create={<FormCreate title={language.TableCreate} onSubmit={this.onCreate} />}
                  ButtonName={{
                    Create: language.TableCreate
                  }}
                />
              )}
              data={DictToListNotNull(this.props.data)}
              ActionPannel={(p) => (
                <ActionPannel
                  Edit={<FormEdit title={language.TableEdit} data={p.data} onCreateSubmit={this.onCreate} onSubmit={this.onEdit} />}
                  Delete={<FormDelete data={p.data} onSubmit={this.onDetele} />}
                />
              )}
            />
          ))}
        </UploadLayout>
      </PropsContext.Provider>
    )
  }

  private handleUpload: OnUploadExecutorFunction = async (item, progress) => {
    const result = await this.props.onUploadAttachFile(item.file, item?.signalController?.signal)
    progress(1)
    return result
  }

  attachmentPrams: IOnChangeParams | null = null
  private handleAttachChange = async (context: IUploadLayoutContext, params: IOnChangeParams) => {
    this.attachmentPrams = params
    const addList = params.items.filter((x) => x.status === 'new')
    if (addList.length === 0) {
      return this.handleAttachSave()
    }
    const temps = addList.map<IProcessItem<IAttachItem>>(({ file, ...x }) => ({
      id: x.id ?? '',
      file: file!,
      name: file?.name || 'Unknown',
      status: 'Pending',
      other: x
    }))
    context.addItems(temps)
    context.show()
  }

  private handleBatchComplete: OnBatchCompleteFunction = async (results) => {
    if (!this.props.onAttachChange) return
    const list: IProcessItem<IAttachItem>[] = results.completed
    const itemsUploaded = list.map<IAttachItem>((x) => {
      const obj: IAttachItemDTO = fileToAttachItem(x.file, x.other)
      const uploadResult = x.uploadResult as IUploadResult | undefined
      obj.url = uploadResult?.filename || ''
      delete obj.thumbnail
      delete obj.file
      delete obj.status
      return obj
    })
    if (results.errors.length <= 0) {
      this.refUploadLayout?.close()
    }
    return this.handleAttachSave(itemsUploaded)
  }

  private handleRemove = async (item: IAttachItemDTO[]) => {
    const { onDeleteAttachFile } = this.props
    if (!onDeleteAttachFile) return
    for (const i of item) {
      if (i.options?.resourceId) {
        await onDeleteAttachFile(i.options.resourceId)
      }
    }
  }

  private handleAttachSave = async (newItems: IAttachItemDTO[] = []) => {
    const { value, row, options, items = [] } = this.attachmentPrams || {}
    const removeList = items.filter((x) => x.status === 'deleted' && x.name)
    this.handleRemove(removeList)
    const { onAttachChange } = this.props
    if (!onAttachChange) return
    const currentItems = items.filter((x) => !x.status || x.status === 'old') || []
    if (items.length === currentItems.length) return
    const mergedItems = [...newItems, ...currentItems]
    return onAttachChange({ value, row, items: mergedItems, options })
  }
}
