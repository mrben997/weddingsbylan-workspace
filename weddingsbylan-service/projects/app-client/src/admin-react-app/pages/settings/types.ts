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
  // Global
  Setting: ISettingItemConfig<FormTypes.ISettingForm>
  SocialLinks: ISettingItemConfig<FormTypes.ISocialLinksForm>
  // Home
  Banner: ISettingItemConfig<FormTypes.IBannerForm>
  HomePhotography: ISettingItemConfig<FormTypes.IHomePhotographyForm>
  HomePhotographyImage: ISettingItemConfig<FormTypes.IHomePhotographyForm>
  HomeMakeupAndHair: ISettingItemConfig<FormTypes.IHomeMakeupAndHairForm>
  HomeMakeupAndHairImage: ISettingItemConfig<FormTypes.IHomeMakeupAndHairForm>
  HomePortfolio: ISettingItemConfig<FormTypes.IHomePortfolioForm>
  HomePortfolioItems: ISettingItemConfig<FormTypes.IHomePortfolioForm>
  HomePortfolioImage: ISettingItemConfig<FormTypes.IHomePortfolioForm>
  Footer: ISettingItemConfig<FormTypes.IFooterForm>
  // Makeup & Hair
  MakeupAndHairAbout: ISettingItemConfig<FormTypes.IAboutForm>
  // Photography
  PhotographyAbout: ISettingItemConfig<FormTypes.IAboutForm>
  // Portfolio
  PortfolioSlide: ISettingItemConfig<FormTypes.IPortfolioSlideForm>
  PortfolioDetail: ISettingItemConfig<FormTypes.IPortfolioDetailForm>
  // Portfolio
  PortfolioInfo: ISettingItemConfig<FormTypes.IPortfolioInfoForm>
  // common
}

export type TColor = 'inherit' | 'action' | 'disabled' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
