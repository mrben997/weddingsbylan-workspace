import { GridCallbackDetails, GridValidRowModel } from '@mui/x-data-grid'
import { ITableTemplateState, TFetchChange, TOnTableTemplateChange } from './TemplateTable'

interface IStateBase<TModel> {
  tableInfo: ITableTemplateState<TModel>
}

// ========= ========= ========= Table Template Redux Types ========= ========= =========
export namespace TableReduxType {
  export interface OnChangeParam<TModel> {
    key: keyof ITableTemplateState<TModel>
    value: any
    details: GridCallbackDetails
  }
  /**
   * Slide Type Redux
   */
  export interface Slice<TModel> extends IStateBase<TModel> {}

  /**
   * Thunk Type Redux
   */
  export interface ThunkParam<TModel> extends Partial<IStateBase<TModel>> {
    tableChange?: OnChangeParam<TModel>
  }
  export interface ThunkReponse<TModel> extends IStateBase<TModel> {}

  /**
   * Map State Redux
   */
  export interface State<TModel> extends IStateBase<TModel> {}

  /**
   * Map Dispatch Redux
   */
  export interface Dispatch<TModel extends GridValidRowModel> {
    onTableChange: TOnTableTemplateChange<TModel, TFetchChange<TModel>>
  }
}
