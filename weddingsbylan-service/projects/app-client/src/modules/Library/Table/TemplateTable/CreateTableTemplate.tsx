import React, { Component } from 'react'
import { Box, BoxProps, styled } from '@mui/material'
import { GridColDef, GridRowIdGetter, GridValidRowModel, GridToolbar } from '@mui/x-data-grid'
import { DataGrid, DataGridProps, GridSortModel, GridFeatureMode, GridFilterOperator } from '@mui/x-data-grid'
import { GridRowSelectionModel, GridCallbackDetails, GridFilterModel, GridPaginationModel } from '@mui/x-data-grid'
import { CustomGridFilterPanel } from './CustomGridFilterPanel'

interface ITableTemplatePropBases<T extends GridValidRowModel> {
  InnerProps?: Omit<DataGridProps<T> & React.RefAttributes<HTMLDivElement>, 'rows' | 'columns' | 'getRowId'>
  CRUDPannel?: React.JSXElementConstructor<any>
  ActionPannel?: React.JSXElementConstructor<{ data: any }>
}

interface ITableTemplateClientProps<T extends GridValidRowModel> {
  data: T[]
}

interface ITableTemplateServerProps<T extends GridValidRowModel> {
  ServerOption: ITableServerSide<T>
}

export type TOnTableTemplateChange<T, TK extends TFetchChange<T>> = (key: TK, value: ITableTemplateState<T>[TK], details: GridCallbackDetails) => void

interface ITableTemplateReduxProps<T extends GridValidRowModel> {
  ReduxOption: ITableTemplateState<T>
  onChange?: TOnTableTemplateChange<T, TFetchChange<T>>
}

interface ITableMode<T extends GridValidRowModel> {
  Server: ITableTemplateServerProps<T>
  Client: ITableTemplateClientProps<T>
  Redux: ITableTemplateReduxProps<T>
}

export interface IFetchPagination<T> extends GridPaginationModel {
  rowTotal?: number
  data: T[]
}

export type ITableTemplateProps<T extends GridValidRowModel, Key extends keyof ITableMode<T>> = ITableTemplatePropBases<T> & ITableMode<T>[Key]

export interface ITableTemplateState<T = any> {
  selectionIds?: GridRowSelectionModel
  details?: GridCallbackDetails
  PageInfo: IFetchPagination<T>
  isLoading: boolean
  FilterModel?: GridFilterModel
  GridSortModel?: GridSortModel
}

export type GridColDefConfig<T extends GridValidRowModel> = {
  [key in keyof T]?: Omit<GridColDef, 'field'>
}

type TGridColumnVisibilityModel<TModel> = { [key in keyof TModel]: boolean }

interface ITableOption<T extends GridValidRowModel> {
  getRowId: GridRowIdGetter<T>
  config: GridColDefConfig<T>
  GridColumnVisibilityModel?: TGridColumnVisibilityModel<Partial<T>>
  filterOperators?: (config: GridColDef) => GridFilterOperator[]
  minWidthColumnActions?: number
}
export interface IFetchModel {
  FilterModel: GridFilterModel
  PageInfo: GridPaginationModel
  GridSortModel: GridSortModel
  details: GridCallbackDetails<'filter'>
  abort: AbortSignal
}
export interface ITableServerSide<T> {
  FetchFilterData: (model: Partial<IFetchModel>) => Promise<IFetchPagination<T>>
  FetchInitialData: () => Promise<IFetchPagination<T>>
}

export interface ITableTemplateContext {
  state: ITableTemplateState<any>
}
export const TableTemplateContext = React.createContext<ITableTemplateContext>({} as any)
export type TFetchChange<TModel> = keyof ITableTemplateState<TModel>

export const CreateTableTemplate = function <TModel extends GridValidRowModel>(mode: keyof ITableMode<TModel>, option: ITableOption<TModel>) {
  const generateColumns = () => {
    return Object.keys(option.config).map((key) => {
      const opt = { ...option.config[key], field: key } as GridColDef
      if (mode === 'Server' && !opt.type && opt.filterable !== false) throw new Error("When mode is Server you need set type for column 'GridColDef'")
      if (option.filterOperators) {
        opt.filterOperators = option.filterOperators(opt)
      }
      return opt
    })
  }

  return class TableTemplate
    extends Component<ITableTemplateProps<TModel, keyof ITableMode<TModel>>, ITableTemplateState<TModel>>
    implements ITableTemplateContext
  {
    constructor(props: ITableTemplateProps<TModel, keyof ITableMode<TModel>>) {
      super(props)
      this.state = {
        PageInfo: { data: [], page: 0, pageSize: 0, rowTotal: 0 },
        isLoading: true
      }
      this.columns = generateColumns()
      if (!this.columns.some((x) => x.field === 'Actions') && props.ActionPannel) {
        this.columns.push({
          field: 'Actions',
          sortable: false,
          filterable: false,
          renderCell: (params) => {
            const { ActionPannel } = this.props
            return ActionPannel ? <ActionPannel data={params.row} /> : <></>
          },
          minWidth: option.minWidthColumnActions ?? 150
        })
      }
    }
    columns: GridColDef[]
    GetDataGridProp = () => {
      let _DataGridProp
      if (mode === 'Server') {
        _DataGridProp = {
          rows: this.state.PageInfo.data,
          loading: this.state.isLoading,
          paginationModel: this.state.PageInfo,
          rowCount: this.state.PageInfo.rowTotal,
          pageSizeOptions: [this.state.PageInfo.pageSize],
          onPaginationModelChange: this.onPaginationModelChange,
          onFilterModelChange: this.onServerFilterChange,
          onSortModelChange: this.onSortModelChange,
          filterMode: 'server' as GridFeatureMode,
          paginationMode: 'server' as GridFeatureMode,
          sortingMode: 'server' as GridFeatureMode,
          filterModel: this.state.FilterModel,
          sortModel: this.state.GridSortModel
        }
      } else if (mode === 'Client' && 'data' in this.props) {
        _DataGridProp = {
          rows: this.props.data,
          componentsProps: {
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 }
            }
          }
        }
      } else if (mode === 'Redux' && 'ReduxOption' in this.props) {
        _DataGridProp = {
          rows: this.props.ReduxOption.PageInfo.data ?? [],
          loading: this.props.ReduxOption.isLoading,
          paginationModel: this.props.ReduxOption.PageInfo,
          rowCount: this.props.ReduxOption.PageInfo.rowTotal ?? 0,
          pageSizeOptions: [this.props.ReduxOption.PageInfo.pageSize ?? 25],
          onPaginationModelChange: this.onPaginationModelChange,
          onFilterModelChange: this.onServerFilterChange,
          onSortModelChange: this.onSortModelChange,
          filterMode: 'server' as GridFeatureMode,
          paginationMode: 'server' as GridFeatureMode,
          sortingMode: 'server' as GridFeatureMode,
          filterModel: this.props.ReduxOption.FilterModel,
          sortModel: this.props.ReduxOption.GridSortModel
        }
      } else {
        _DataGridProp = { rows: [] }
      }
      return _DataGridProp
    }

    AbortController?: AbortController
    onChange = <TK extends TFetchChange<TModel>>(key: TK, value: ITableTemplateState<TModel>[TK], details: GridCallbackDetails) => {
      if (mode === 'Redux' && 'onChange' in this.props && this.props.onChange) {
        this.props.onChange(key, value, details)
      }
    }

    onRowSelectionModelChange = (rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails) => {
      this.setState({ details: details, selectionIds: rowSelectionModel })
    }
    timer?: NodeJS.Timeout
    onServerFilterChange = (model: GridFilterModel, details: GridCallbackDetails<'filter'>) => {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (mode === 'Server') {
          this.setState({ FilterModel: model, isLoading: true })
          this.FetchData({ FilterModel: model, details })
        } else if (mode === 'Redux') {
          this.onChange('FilterModel', model, details)
        }
      }, 500)
    }
    onPaginationModelChange = (model: GridPaginationModel, details: GridCallbackDetails) => {
      if (mode === 'Server') {
        const modeTemp = Object.assign({}, this.state.PageInfo, model)
        this.setState({ PageInfo: modeTemp, isLoading: true })
        this.FetchData({ PageInfo: model, details })
      } else if (mode === 'Redux' && 'ReduxOption' in this.props) {
        const modeTemp = Object.assign({}, this.props.ReduxOption.PageInfo, model)
        this.onChange('PageInfo', modeTemp, details)
      }
    }
    onSortModelChange = (model: GridSortModel, details: GridCallbackDetails) => {
      if (mode === 'Server') {
        this.setState({ GridSortModel: model, isLoading: true })
        this.FetchData({ GridSortModel: model, details })
      } else if (mode === 'Redux') {
        this.onChange('GridSortModel', model, details)
      }
    }
    FetchData = async (model: Partial<IFetchModel>) => {
      this.AbortController?.abort()
      if (mode === 'Server' && 'ServerOption' in this.props) {
        try {
          this.AbortController = new AbortController()
          const data = await this.props.ServerOption.FetchFilterData(
            Object.assign(
              {},
              {
                PaginationModel: this.state.PageInfo,
                FilterModel: this.state.FilterModel,
                GridSortModel: this.state.GridSortModel,
                abort: this.AbortController.signal
              },
              model
            )
          )
          this.setState({ isLoading: false, PageInfo: data })
        } catch {
          this.setState({ isLoading: false })
        }
      }
    }

    isServerSide = () => {
      return mode === 'Server'
    }
    async componentDidMount() {
      if (mode === 'Server' && 'ServerOption' in this.props) {
        this.AbortController?.abort()
        try {
          this.AbortController = new AbortController()
          const data = await this.props.ServerOption.FetchInitialData()
          this.setState({ isLoading: false, PageInfo: data })
        } catch {
          this.setState({ isLoading: false })
        }
      }
    }

    render() {
      const CRUDPannel = this.props.CRUDPannel || (() => <></>)
      return (
        <TableTemplateContext.Provider value={this}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CRUDPannel />
            <WrapTable>
              <DataGrid
                getRowId={option.getRowId}
                columns={this.columns}
                {...this.GetDataGridProp()}
                slots={{ toolbar: GridToolbar, filterPanel: CustomGridFilterPanel }}
                style={{ border: 0, display: 'flex' }}
                checkboxSelection={true}
                onRowSelectionModelChange={this.onRowSelectionModelChange}
                {...(this.props.InnerProps ?? {})}
                initialState={{ columns: { columnVisibilityModel: option.GridColumnVisibilityModel } }}
              />
            </WrapTable>
          </Box>
        </TableTemplateContext.Provider>
      )
    }
  }
}

export type TTemplateTableType<TModel extends GridValidRowModel> = ReturnType<typeof CreateTableTemplate<TModel>>

const WrapTable = styled(({ children, ...props }: BoxProps) => (
  <Box {...props}>
    <Box>{children}</Box>
  </Box>
))({
  flex: 1,
  position: 'relative',
  '> div': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex'
  }
})
