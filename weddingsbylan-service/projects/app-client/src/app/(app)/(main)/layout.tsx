import { settingSService } from '@/services/setting.service'
import Footer from '@/views/global/footer'
import React from 'react'

interface ILayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default async function MainLayout({ children, params }: ILayoutProps) {
  const { locale } = params
  const dataHomePage = await settingSService.getSettingdata(locale, ['Home', 'Global'], ['Setting', 'Footer'])

  return (
    <>
      {children}
      <Footer footerData={dataHomePage?.getData('Footer')} settingData={dataHomePage?.getData('Setting')} />
    </>
  )
}
