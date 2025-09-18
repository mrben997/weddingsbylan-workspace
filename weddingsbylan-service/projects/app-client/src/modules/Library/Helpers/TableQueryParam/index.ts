import { ITableTemplateState } from '../../Table'
import QueryParam from '../query-param'
import { DecodeBase64, EncodeBase64, TryParseJson } from '../utilities'

interface ITableQueryParam {
  table?: string
}
class TableQueryParamBase {
  setParam = <TModel>(tableInfo: Partial<ITableTemplateState<TModel>>, defaultValue: ITableTemplateState<TModel>) => {
    // console.log({ tableInfo, defaultValue, quals: this.equals(tableInfo, defaultValue) })

    try {
      if (!this.equals(tableInfo, defaultValue)) {
        const data = this.extractData(tableInfo)
        const tqp: ITableQueryParam = { table: EncodeBase64(JSON.stringify(data)) }
        QueryParam.Patch(tqp)
      } else {
        QueryParam.Deletes<ITableQueryParam>('table')
      }
    } catch (error) {
      console.log(error)
    }
  }

  getParam = <TModel>(defaultValue: ITableTemplateState<TModel>): ITableTemplateState<TModel> => {
    const temp = QueryParam.GetAll() as ITableQueryParam
    if (!temp?.table) return defaultValue
    const data = TryParseJson<ITableTemplateState<TModel>>(DecodeBase64(temp.table ?? ''))
    if (Object.keys(data).length < 1) return defaultValue
    return data as ITableTemplateState<TModel>
  }

  private equals = <TModel>(tableInfo: Partial<ITableTemplateState<TModel>>, tableInfoOld: Partial<ITableTemplateState<TModel>>) => {
    return JSON.stringify(this.extractData(tableInfo)) === JSON.stringify(this.extractData(tableInfoOld))
  }

  private extractData = <TModel>(tableInfo: Partial<ITableTemplateState<TModel>>): Partial<ITableTemplateState<TModel>> => {
    const { FilterModel, GridSortModel, PageInfo } = tableInfo
    const items = FilterModel?.items.filter((x) => !!x.value) ?? []
    const obj: Partial<ITableTemplateState<TModel>> = {
      GridSortModel,
      PageInfo: { data: [], pageSize: PageInfo?.pageSize ?? 0, page: PageInfo?.page ?? 0, rowTotal: 0 }
    }
    if (items.length > 0) {
      obj.FilterModel = { ...FilterModel, items: FilterModel?.items.filter((x) => !!x.value) ?? [] }
    } else {
      delete obj.FilterModel
    }
    return obj
  }
}
const TableQueryParam = new TableQueryParamBase()
export default TableQueryParam
