export enum ELogic {
  And,
  Or
}

export enum EOperator {
  GreaterThan,
  LessThan,
  GreaterThanOrEqual,
  LessThanOrEqual,
  NotEqual,
  Equal,
  Contains
}

export enum EOrder {
  Ascending,
  Descending
}

interface FieldFilter<TModel> {
  Logic?: ELogic
  Operator?: EOperator
  FieldName: keyof TModel
  Value: string
}
interface ScopeFilter<TModel> {
  Logic?: ELogic
  Scopes: PropFilter<TModel>[]
}
export type PropFilter<TModel> = FieldFilter<TModel> | ScopeFilter<TModel>

export interface PropOrderBy<TModel> {
  Type: EOrder
  FieldName: keyof TModel
}

export interface IModelFilter<TModel> {
  Page?: number
  Amount?: number
  PropFilters?: PropFilter<TModel>[]
  PropOrders?: PropOrderBy<TModel>[]
}

export interface IPagingModel<TModel> {
  Amount: number
  Page: number
  Total: number
  Data: TModel[]
}
