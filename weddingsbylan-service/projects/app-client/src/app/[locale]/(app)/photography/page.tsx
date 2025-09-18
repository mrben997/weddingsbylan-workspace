'use server'
import '@/shared/styled/photography.scss'
import React, { FC } from 'react'
import { IPageProps } from '@/app/types'
import { ImagePath } from '@/shared/config'
import { settingSService } from '@/services/setting.service'
import { getEditModeKey } from '@/shared/components/edit.mode'
import Footer from '@/shared/layout/footer'
import Header from '@/shared/layout/header'
import PhotographyPage from '@/views/photography'

const Page: FC<IPageProps> = async (props) => {
  const p = await props.params
  const locale = p.locale ?? 'vn'
  const pageData = await settingSService.getSettingdata(locale ?? 'vn', ['Global', 'MakeupAndHair'], ['Setting', 'MahAbout', 'MahAboutImage', 'Footer'])

  const dataSetting = pageData?.getSingleData('Setting')
  const dataMahAbout = pageData?.getSingleData('MahAbout')
  const dataMahAboutImage = pageData?.getSingleData('MahAboutImage')
  
  return (
    <PhotographyPage/>
  )
}

export default Page
