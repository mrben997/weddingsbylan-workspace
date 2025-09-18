import { QueryParam } from '../../Helpers'

export type EMdStack = 'PopMdStack' | 'GoBack' | 'GoForward'

export const IsEMdStack = (value: any): value is EMdStack => {
  return value === 'PopMdStack' || value === 'GoBack' || value === 'GoForward'
}

export interface ILayoutQueryParam {
  md?: string | string[]
}

export const GetMRParam = () => {
  const md = QueryParam.Gets<ILayoutQueryParam>('md').md
  return Array.isArray(md) ? md : md ? [md] : []
}
