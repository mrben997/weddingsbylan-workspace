import { ESettingArea, ESettingAreaBase } from '@/admin-react-app/model'
import { TLayoutItemForm } from './layout.block.item'
import * as FormTypes from './setting.form.types'
export interface IFormTemplateBase {
  FormKey: string
  Area: ESettingAreaBase
}
export interface IFormModel extends IFormTemplateBase {
  Id: string | number
  IsNew?: boolean
}

export type TRenderFormAction<T extends IFormModel = IFormModel> = (data: Partial<T>) => TLayoutItemForm<T>[]

export interface ISettingItemConfig<T extends IFormModel = IFormModel> {
  DefineKey: IFormTemplateBase
  title: string
  isSingle?: boolean
  renderForm: TRenderFormAction<T>
}
export { FormTypes }
export type TInnerType<T> = T extends ISettingItemConfig<infer U> ? U : never
export interface ISettingStruct {
  // Home
  Setting: ISettingItemConfig<FormTypes.ISettingForm>
  Banner: ISettingItemConfig<FormTypes.IBannerForm>
  About: ISettingItemConfig<FormTypes.IAboutForm>
  AboutImage: ISettingItemConfig<FormTypes.IAboutForm>
  Service: ISettingItemConfig<FormTypes.IServiceForm>
  ServiceImage: ISettingItemConfig<FormTypes.IServiceForm>
  Footer: ISettingItemConfig<FormTypes.IFooterForm>
  // Makeup & Hair
  MahAbout: ISettingItemConfig<FormTypes.IMahAboutForm>
  MahAboutImage: ISettingItemConfig<FormTypes.IMahAboutForm>
}

export type TColor = 'inherit' | 'action' | 'disabled' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
