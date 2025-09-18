import { IFormModel } from './types'

export interface ISettingForm extends IFormModel {
  LogoUrl: string
  LogoDarkUrl: string
}

export interface INavItem {
  Title: string
  Url: string
}

export interface INavFormData extends IFormModel {
  Navs: INavItem[]
}

//#region Home Page
export interface IBannerForm extends IFormModel {
  SubTitle: string
  Title: string
  Content: string
  ImageUrl: string
  Href: string
}

export interface IAboutForm extends IFormModel {
  Title: string
  Content: string
  ImageUrl: string
  Href: string
}

export interface IServiceForm extends IFormModel {
  Title: string
  Content: string
  ImageUrl: string
  Href: string
}

export interface IFooterForm extends IFormModel {
  BgUrl: string
  LogoUrl: string
}
//#endregion Home Page

//#region Makeup & Hair Page
export interface IMahAboutForm extends IFormModel {
  Title: string
  SubTitle: string
  Content: string
  ImageUrl: string
}
//#endregion Makeup & Hair Page
