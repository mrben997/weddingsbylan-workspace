import { FormatFileSize } from "../../Helpers"

declare type ModelBase = { [key: string]: any }

export enum SingleRuleValidate {
  Required = 'Required',
  Regex = 'Regex',
  RequiredValue = 'RequiredValue',
  Array = 'Array',
  Number = 'Number',
  Email = 'Email',
  PhoneNumber = 'PhoneNumber',
  Url = 'Url',
  File = 'File',
  FileRequired = 'FileRequired',
  Custom = 'Custom'
}

const MessageDefault = {
  Required: 'The {0} is required',
  Regex: 'The {0} is not match {1}',
  RequiredValue: 'the {0} is not equal {1}',
  Array: 'The {0} is not valid',
  Number: '{0} must be a number',
  Email: 'The {0} is not valid',
  PhoneNumber: 'The {0} is not valid',
  Url: 'The {0} is not valid',
  File: 'File size must be less than {1}',
  FileRequired: 'The {0} is required',
  Custom: 'Error Custom'
}
export interface RuleOptions {
  File: {
    maxSize: number
    // toal size of files
    all?: boolean
  }
}

export const MapRuleOptions = <TK extends keyof RuleOptions>(key: TK, options?: RuleOptions[TK]) => options

export interface IRuleOption<TModel = any> {
  rule: SingleRuleValidate
  message?: string
  Value?: RegExp | ((value: any, model: TModel) => boolean) | number | Array<any> | boolean
  options?: any
}

interface IConfigValue<TModel = any> {
  Rules: IRuleOption<TModel>[]
}

export interface IModelError {
  message: string
  error: boolean
}

export type IFormValidatorConfig<TModel> = {
  [key in keyof Extract<TModel, ModelBase>]?: IConfigValue<TModel>
}

export type PartialError<TModel> = {
  [key in keyof TModel]?: IRuleOption<TModel>[]
}

export default class FormValidator<TModel> {
  constructor(configs: IFormValidatorConfig<TModel>) {
    this.configs = configs
  }
  configs: IFormValidatorConfig<TModel>

  AddRules = (key: keyof TModel, ...rule: IRuleOption<TModel>[]) => {
    let fieldConfig = this.configs[key]
    if (!fieldConfig) {
      fieldConfig = { Rules: [] }
      this.configs[key] = fieldConfig
    }
    fieldConfig.Rules.push(...rule)
    return this
  }

  Required = (RuleOption: IRuleOption, value: any) => {
    return value === null || value === undefined || value === ''
  }
  Regex = (RuleOption: IRuleOption, value: string, Regex: RegExp) => {
    if (!value) return false
    return !(RuleOption.Value as RegExp).test(value)
  }
  RequiredValue = (RuleOption: IRuleOption, value: any) => {
    if (!value) return false
    return value !== RuleOption.Value
  }
  Custom = (RuleOption: IRuleOption, value: any, model: any) => {
    if (typeof RuleOption.Value === 'function') {
      return RuleOption.Value(value, model)
    }
    return true
  }
  Array = (RuleOption: IRuleOption, value: any) => {
    if (!value) return false
    if (typeof RuleOption.Value === 'number') {
      return Array.isArray(value) ? value.length <= RuleOption.Value : true
    }
    return true
  }
  Number = (RuleOption: IRuleOption, value: any) => {
    if (!value) return false
    return isNaN(Number(value))
  }
  Email = (RuleOption: IRuleOption, value: any) => {
    if (!value) return false
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return !regex.test(value)
  }
  PhoneNumber = (RuleOption: IRuleOption, value: any) => {
    if (!value) return false
    const phoneRegex = /^(\+?\d{1,4}[\s-]?)?((\(\d{1,4}\))|\d{1,4})[\s-]?\d{1,4}[\s-]?\d{1,9}$/
    return !phoneRegex.test((value ?? '').trim())
  }
  Url = (RuleOption: IRuleOption, value: any) => {
    if (!value) return false
    try {
      new URL(value)
      return false
    } catch (err) {
      return true
    }
  }
  File = (RuleOption: IRuleOption, value: any) => {
    if (!value) return false
    const options = MapRuleOptions('File', RuleOption.options)
    const files: File[] = Array.isArray(value) ? value : [value]
    if (!options) return false
    if (options.all === true) {
      const size = files.reduce((a, b) => {
        a += b.size
        return a
      }, 0)
      return size > options.maxSize
    } else {
      return files.some((x) => x.size > options.maxSize)
    }
  }
  FileRequired = (RuleOption: IRuleOption, value: any) => {
    const files: File[] = Array.isArray(value) ? value : [value]
    return files.some((x) => x.size <= 0)
  }
  RenderMessage = (RuleOption: IRuleOption, key: string) => {
    if (!RuleOption.message) {
      RuleOption.message = MessageDefault[RuleOption.rule].replace('{0}', key)
      switch (RuleOption.rule) {
        case SingleRuleValidate.Regex: {
          RuleOption.message = RuleOption.message.replace('{1}', (RuleOption.Value as RegExp).source)
          break
        }
        case SingleRuleValidate.RequiredValue: {
          RuleOption.message = RuleOption.message.replace('{1}', RuleOption.Value?.toString() ?? '')
          break
        }
        case SingleRuleValidate.File: {
          const options = MapRuleOptions('File', RuleOption.options)
          if (options?.all === true) {
            RuleOption.message = `Total file size must be less than ${FormatFileSize((options?.maxSize ?? 0) / 1024)}`
          } else {
            RuleOption.message = RuleOption.message.replace('{1}', FormatFileSize((options?.maxSize ?? 0) / 1024))
          }
          break
        }
        default:
          break
      }
    }
    return RuleOption
  }
  run = (model: TModel) => {
    const keys = Object.keys(this.configs)
    const data: PartialError<TModel> = {}
    keys.forEach((key) => {
      const config = this.configs[key]
      if (!config) return
      const tmp = this.Executed(config, (model as any)[key], model)
      if (tmp.length < 1) return
      ;(data as any)[key] = tmp.map((x) => this.RenderMessage(x, key))
    })
    return data
  }
  Executed = (Config: IConfigValue, valueField: any, model: any) => {
    return Config.Rules.filter((Value) => {
      const action = (this as any)[Value.rule.toString()]
      return action && action(Value, valueField, model)
    })
  }
}

export const CreateFormValidator = <TModel>() => {
  return new FormValidator<Partial<TModel>>({})
}
