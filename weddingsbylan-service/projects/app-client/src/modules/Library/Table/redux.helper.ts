import { GridValidRowModel } from '@mui/x-data-grid'
import { DeepMerge } from '../Helpers'
import { IPagingModel } from './ModelFilter'
import { TableReduxType } from './redux.types'
import { ITableTemplateState } from './TemplateTable'

export const MapTableInfo = <TModel extends GridValidRowModel>(
  state: ITableTemplateState<TModel>,
  tableChange?: TableReduxType.OnChangeParam<TModel>
) => {
  const tts: ITableTemplateState<TModel> = Object.assign({}, state)
  if (!!tableChange) {
    const { key, value, details } = tableChange
    tts[key] = value
    tts.details = details
  }
  return tts
}

export const MapTableData = <TModel extends GridValidRowModel>(state: ITableTemplateState<TModel>, tableData: Partial<IPagingModel<TModel>>) => {
  const { Data = [], Page = 0, Amount = 25, Total = 100 } = tableData

  const temp: Partial<ITableTemplateState<TModel>> = {
    isLoading: false,
    PageInfo: { data: Data, page: Page, pageSize: Amount, rowTotal: Total }
  }

  const obj: ITableTemplateState<TModel> = Object.assign({}, state, temp)
  return obj
}

export const TableInitialSliceRedux = <TModel>(state?: Partial<ITableTemplateState<TModel>>) => {
  return DeepMerge<ITableTemplateState<TModel>>({ isLoading: true, PageInfo: { data: [], page: 0, pageSize: 25 } }, state)
}
