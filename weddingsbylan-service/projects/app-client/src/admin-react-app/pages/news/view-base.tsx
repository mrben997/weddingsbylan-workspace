import React, { Component } from 'react'
import { TNewsProps } from './types'
import { DictToListNotNull } from '@/admin-react-app/ultilities/helper'
import { ActionPannel, CRUDPannel } from '@/modules/Library/Table'
import { INews } from '@/admin-react-app/model'
import { FormCreate } from './form.create'
import { FormEdit } from './form.edit'
import { FormDelete } from './form.delete'
import { language, PropsContext, TableInstance } from './configs'

interface INewsPageState {
  loading: boolean
}
export class NewsPage extends Component<TNewsProps, INewsPageState> {
  constructor(props: TNewsProps) {
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
  render() {
    return (
      <PropsContext.Provider value={{ getProps: () => this.props }}>
        <TableInstance
          InnerProps={{
            loading: this.state.loading,
            disableRowSelectionOnClick: true
          }}
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
      </PropsContext.Provider>
    )
  }
}
