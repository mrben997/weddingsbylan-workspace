import { SvgIcon } from '@mui/material'
import * as Icon from '@mui/icons-material'
import { ComponentType, FC, PropsWithChildren } from 'react'
import { ReduxNews } from '@/admin-react-app/pages/news'
import { ReduxService } from '@/admin-react-app/pages/services/redux.map'
import { ReduxRecruitment } from '@/admin-react-app/pages/recruitments/redux.map'
import Setting from '../pages/settings'
import TextCkEditor from '@/modules/Library/Forms/Inputs/CreateTextCkEditor/CkEditor'
import Dashboard from '../pages/dashboard'
import Security from '../pages/Security'
import { ILanguage } from '@/locales/types'
import { getTranslation } from '@/locales/helper'
import { getLocale } from '../ultilities/helper'
export enum RouteKey {
  Dashboard = '/',
  News = 'news',
  Service = 'service',
  Recruitment = 'recruitment',
  Setting = 'setting',
  Security = 'secutity',
  Login = 'Login'
}

export interface IRoute<TMapKey> {
  IsMenu?: boolean
  Name: string
  Icon: typeof SvgIcon
  Element?: ComponentType<any>
  Key: TMapKey
}
export const ElementDefault: FC<PropsWithChildren> = (p) => p.children
export const ConfigRoute = (): IRoute<RouteKey>[] => {
  const language: ILanguage = getTranslation(getLocale())
  return [
    {
      Name: language.MenuDashboard,
      Icon: Icon.GridView,
      Key: RouteKey.Dashboard,
      Element: Dashboard
    },
    {
      Name: language.MenuNews,
      Icon: Icon.Feed,
      Key: RouteKey.News,
      Element: ReduxNews
    },
    {
      Name: language.MenuSevices,
      Icon: Icon.HomeRepairService,
      Key: RouteKey.Service,
      Element: ReduxService
    },
    {
      Name: language.MenuRecruitments,
      Icon: Icon.ContactPage,
      Key: RouteKey.Recruitment,
      Element: ReduxRecruitment
    },
    {
      Name: language.MenuSettings,
      Icon: Icon.Settings,
      Key: RouteKey.Setting,
      Element: Setting
    },
    {
      Name: language.MenuSecurity,
      Icon: Icon.Security,
      Key: RouteKey.Security,
      Element: Security
    }
    // {
    //     Name: "test",
    //     Icon: Icon.Security,
    //     Key: "Test",
    //     Element: TestComponent
    // }
  ]
}
