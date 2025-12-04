import { Component } from 'react'
import { IServiceDTO, TServiceProps } from './types'
import { DictToListNotNull, getLocale } from '@/admin-react-app/ultilities/helper'
import { ActionPannel, CreateTableTemplate, CRUDPannel } from '@/modules/Library/Table'
import { IService } from '@/admin-react-app/model'
import { FormCreate } from './form.create'
import { FormEdit } from './form.edit'
import { FormDelete } from './form.delete'
import { Box, Typography } from '@mui/material'
import { getTranslation } from '@/locales/helper'
import { GetImageUrl } from '@/shared/helper'
import { CreatePropsContext } from '../components/context.shared'
import SwitchLazy from '../components/switch.lazy'
const language = getTranslation(getLocale())
const PropsContext = CreatePropsContext<TServiceProps>()

const Table = CreateTableTemplate<IServiceDTO>('Client', {
  getRowId: (x: IService) => x.Id,
  config: {
    Id: {
      headerName: 'Image',
      renderCell(params) {
        const row = params.row as IService
        return (
          <Box sx={{ padding: '5px', height: '100%', display: 'flex', justifyContent: 'center', border: '1px dotted #e0e0e0' }}>
            <img style={{ height: '100%' }} src={GetImageUrl('Service', row.ImageUrl)} />
          </Box>
        )
      }
    },
    Name: { minWidth: 300, headerName: language.TableName },
    IsActive: {
      minWidth: 150,
      headerName: language.TableStatus,
      renderCell: (param) => {
        const isActive = param.value === true
        const row = param.row as IService
        return (
          <PropsContext.Consumer>
            {({ getProps }) => {
              const props = getProps()
              return (
                <SwitchLazy
                  defaultChecked={isActive}
                  onChange={async (value) => {
                    await props.UpdateFull({ Key: row.Key }, { IsActive: value })
                  }}
                />
              )
            }}
          </PropsContext.Consumer>
        )
      }
    },
    Tags: { minWidth: 150, headerName: language.TableTags },
    Area: { minWidth: 150, headerName: 'Area' },
    Type: { minWidth: 150, headerName: 'Type' }
  }
})
interface IServicePageState {
  loading: boolean
}
class ServicePage extends Component<TServiceProps, IServicePageState> {
  constructor(props: TServiceProps) {
    super(props)
    this.state = {
      loading: false
    }
  }
  onCreate = async (data: Partial<IService>) => {
    await this.props.Create(data)
  }
  onEdit = async (data: Partial<IService>) => {
    data?.Id && (await this.props.Update(data.Id, data))
  }
  onDetele = async (data?: IService) => {
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
        <Table
          InnerProps={{ loading: this.state.loading, disableRowSelectionOnClick: true }}
          CRUDPannel={(p) => (
            <CRUDPannel
              Title={language.Service}
              Create={<FormCreate title={language.TableCreate} onSubmit={this.onCreate} />}
              ButtonName={{ Create: language.TableCreate }}
            />
          )}
          data={DictToListNotNull(this.props.data)}
          ActionPannel={(p) => (
            <ActionPannel
              Edit={<FormEdit title={language.TableEdit} onCreateSubmit={this.onCreate} data={p.data} onSubmit={this.onEdit} />}
              Delete={<FormDelete data={p.data} onSubmit={this.onDetele} />}
            />
          )}
        />
      </PropsContext.Provider>
    )
  }
}

export default ServicePage
