import { DeepMerge } from '../Helpers'
import { IFormInputBase } from './types'
import FormValidator, { IModelError, IRuleOption, PartialError } from './Validator'

export const getErrorMessage = function <TModel>(MessageErrors: PartialError<TModel> | undefined, key?: keyof TModel): IModelError {
  return MessageErrors && (MessageErrors as any)[key] ? { ...(MessageErrors as any)[key][0], error: true } : { error: false, message: '' }
}

type ModelBase = {
  [key: string]: any
}

export const ConvertFormDataToJson = function <TModel>(form: FormData): Partial<TModel> {
  const data = Array.from(form).reduce<Partial<TModel>>((a: any, b: any[]) => {
    if (!a[b[0]]) {
      a[b[0]] = b[1]
    } else if (Array.isArray(a[b[0]])) {
      a[b[0]].push(b[1])
    } else {
      a[b[0]] = [a[b[0]], b[1]]
    }
    return a
  }, {} as any) as any

  Object.keys(data).forEach((key) => {
    const value = data[key]
    if (typeof value === 'string' && (value.toString().toLocaleLowerCase() === 'true' || value.toString().toLocaleLowerCase() === 'false')) {
      data[key] = value.toString().toLocaleLowerCase() === 'true'
    }
  })
  return data
}

export const SingleValidate = function <TModel, TPartial = TModel>(
  key: keyof TModel,
  modelState: TPartial,
  MessageErrors: PartialError<TModel>,
  Validator: FormValidator<TPartial>
) {
  const messageErrors = Validator.run(modelState) as { [key: string]: any }
  if (messageErrors) {
    let errors = (MessageErrors || {}) as { [key: string]: any }
    const keys = Object.keys(modelState as any).filter((key) => !!(modelState as any)[key])
    keys.push(key as string)
    keys.forEach((key) => {
      if (messageErrors[key]) {
        errors[key] = messageErrors[key]
      } else {
        delete errors[key]
      }
    })
    return errors
  }
  return null
}

export const GetErrorFromResponse = function <TModel>(error: any, ModelRender: TModel) {
  const data = error.response?.data as any
  if (data) {
    const keys = Object.keys(ModelRender as any)
    const MessageErrors: PartialError<TModel> | undefined = {}
    keys.forEach((key) => {
      const messages = data[key]
      if (Array.isArray(messages) && messages.length > 0) {
        ; (MessageErrors as any)[key] = [{ message: messages[0] }]
      }
    })
    return MessageErrors
  }
}

export const ClearFieldEmpty = <TModel>(model: Extract<TModel, ModelBase>) => {
  Object.keys(model).forEach((key: keyof Extract<TModel, ModelBase>) => {
    if (!model[key]) delete model[key]
  })
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
const IsObject = (obj: any) => {
  return obj && typeof obj === 'object' && !Array.isArray(obj)
}

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] } | undefined

export const MergeObjects = <T>(...objects: DeepPartial<T>[]): T => {
  return objects.reduce((prev, obj) => {
    if (!obj) return prev
    Object.keys(obj).forEach((key) => {
      if (IsObject((prev as any)[key]) && IsObject((obj as any)[key])) {
        ; (prev as any)[key] = MergeObjects((prev as any)[key], (obj as any)[key])
      } else {
        ; (prev as any)[key] = (obj as any)[key]
      }
    })
    return prev
  }, {} as T) as any
}

export const MapFormInputBaseProps = <TModel, TProps extends IFormInputBase<TModel>>(params: TProps) => {
  const keys: (keyof IFormInputBase<TModel>)[] = ['label', 'data', 'messageErrors', 'onBlur', 'placeholder', 'disabled', 'defaultValue', 'options']
  return keys.reduce<IFormInputBase<TModel>>(
    (a, b) => {
      a[b] = params[b]
      return a
    },
    { name: params.name, messageErrors: {}, onBlur: () => { } }
  )
}

export const ValidateMerge = <TModel>(...validateor: (FormValidator<TModel> | undefined)[]): FormValidator<TModel> => {
  const configs = validateor.map((x) => x?.configs).filter((x) => !!x)

  let temp: any = Object.assign({}, ...configs)

  for (let index = 0; index < Object.keys(temp).length; index++) {
    const key = Object.keys(temp)[index]
    //merge configs
    temp[key] = DeepMerge({}, ...configs.map((x) => (x ? x[key] : { Rules: [] })))
    //merge rules
    temp[key].Rules = configs
      .map((x) => (x ? x[key] : { Rules: [] }))
      .reduce<IRuleOption<TModel>[]>((a, b) => {
        a.push(...(b?.Rules ?? []))
        return a
      }, [])
  }
  return new FormValidator(temp)
}
