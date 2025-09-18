// import { PartialError } from '../../Forms/FormValidator'

// export interface IFormInputBase<TModel, TOther = any> {
//   name: keyof TModel
//   label?: React.ReactNode
//   Model?: TModel
//   MessageError?: PartialError<TModel>
//   onBlur?: (keyName: keyof TModel) => void
//   onSubmit?: React.FormEventHandler<HTMLFormElement>
//   placeholder?: string
//   disabled?: boolean
//   defaultValue?: any
//   other?: TOther
// }

// export const MapFormInputBaseProps = <TModel, TProps extends IFormInputBase<TModel>>(params: TProps) => {
//   const keys: (keyof IFormInputBase<TModel>)[] = [
//     'label',
//     'Model',
//     'MessageError',
//     'onBlur',
//     'onSubmit',
//     'placeholder',
//     'disabled',
//     'defaultValue',
//     'other'
//   ]
//   return keys.reduce<IFormInputBase<TModel>>(
//     (a, b) => {
//       a[b] = params[b]
//       return a
//     },
//     { name: params.name }
//   )
// }

export {}
