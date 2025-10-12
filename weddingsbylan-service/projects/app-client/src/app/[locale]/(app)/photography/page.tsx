'use server'
import '@/shared/styled/photography.scss'
import React, { FC } from 'react'
import { IPageProps } from '@/app/types'
import { ImagePath } from '@/shared/config'
import { settingSService } from '@/services/setting.service'
import { getEditModeKey } from '@/shared/components/edit.mode'
import PhotographyPage from '@/views/photography'
import PhotographyViewBase from '@/app/_shared/photography'
import { GetImageUrl } from '@/shared/helper'
import { INote } from '@/app/_shared/photography/Notes'
import { IPlan } from '@/app/_shared/photography/Service'
import { serviceService } from '@/services/Service.servce'

const getServices = async (signal?: AbortSignal): Promise<{ notes?: INote[]; service?: IPlan[] }> => {
  const data = await serviceService.Filter({ where: { Locale: 'vn' } }, signal)
  console.log('data', data)

  const obj = {}
  return obj
}

const Page: FC<IPageProps> = async (props) => {
  const p = await props.params
  const locale = p.locale ?? 'vn'
  const pageData = await settingSService.getSettingdata(locale ?? 'vn', ['Global', 'MakeupAndHair'], ['Setting', 'MahAbout', 'MahAboutImage', 'Footer'])

  const dataSetting = pageData?.getSingleData('Setting')
  const dataMahAbout = pageData?.getSingleData('MahAbout')
  const dataMahAboutImage = pageData?.getSingleData('MahAboutImage')
  const dataFetch = await getServices()

  return (
    <PhotographyViewBase
      configs={{
        title: dataMahAbout?.Title ?? '',
        description: dataMahAbout?.Content ?? '',
        image: GetImageUrl('Settings', dataMahAboutImage?.ImageUrl) ?? '',
        alt: 'Makeup & Hair',
        url: '/makeup-and-hair'
      }}
    />
  )
}

export default Page
