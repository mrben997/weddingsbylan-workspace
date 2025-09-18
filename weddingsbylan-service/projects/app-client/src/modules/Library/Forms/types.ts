import { PartialError } from './Validator'

export interface IFormBase<TModel> {
  data?: Partial<TModel>
  messageErrors: PartialError<TModel>
  onBlur: (keyName: keyof TModel) => void
  disabled?: boolean
}

export interface IFormInputBase<TModel, TOption = any> extends Partial<IFormBase<TModel>> {
  name?: keyof TModel
  label?: React.ReactNode
  placeholder?: string
  defaultValue?: any
  options?: TOption
}
