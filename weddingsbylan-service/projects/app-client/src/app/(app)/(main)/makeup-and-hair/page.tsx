'use server'
import '@/shared/styled/makeup-and-hair.scss'
import React, { FC } from 'react'
import { IPageProps } from '@/app/types'
import { settingSService } from '@/services/setting.service'
import MakeupAndHairView, { INote, IPlan } from '@/views/makeup-and-hair'
import { GetImageUrl } from '@/shared/helper'
import { serviceService } from '@/services/Service.servce'
import { EServiceSettingArea, IServiceDTO, IServiceSetting } from '@/admin-react-app/pages/services/types'
import { tryParseObject } from '@/modules/Library/Helpers'

const getServices = async (signal?: AbortSignal): Promise<{ notes?: INote[]; services?: IPlan[] }> => {
  const data = await serviceService.Filter({ where: { Locale: 'vn' } }, signal)
  const items: IServiceDTO[] = (data ?? []).map((x) => {
    const setting = tryParseObject<IServiceSetting>(x.Content, { version: '0.0.1', data: {} })
    return { ...x, Area: setting.data?.area, Type: setting.data?.type }
  })
  const notes = items.filter((x) => x.Type === 'note' && x.Area === EServiceSettingArea.makeupAndHair)
  const services = items.filter((x) => x.Type === 'package' && x.Area === EServiceSettingArea.makeupAndHair)
  const obj = {
    notes: notes.map<INote>((x) => ({ id: x.Id, title: x.Name ?? '', text: x.Description ?? '' })),
    services: services.map<IPlan>((x) => ({ title: x.Name ?? '', price: '$39', per: 'per month', features: x.Description ?? '' }))
  }
  return obj
}

const Page: FC<IPageProps> = async (props) => {
  const p = await props.params
  const pageData = await settingSService.getSettingdata('vn', ['Global'], ['Setting', 'About', 'AboutImage', 'Footer'])

  const dataSetting = pageData?.getSingleData('Setting')
  const dataAbout = pageData?.getSingleData('About')
  const dataAboutImage = pageData?.getSingleData('AboutImage')
  const dataFetch = await getServices()

  return (
    <MakeupAndHairView
      data={{
        setting: dataSetting,
        aboutImage: dataAboutImage
      }}
      notes={dataFetch.notes}
      services={dataFetch.services}
      configs={{
        title: dataAbout?.Title ?? '',
        description: dataAbout?.Content ?? '',
        image: GetImageUrl('Settings', dataAboutImage?.ImageUrl) ?? '',
        alt: 'Makeup & Hair',
        url: '/makeup-and-hair'
      }}
    />
  )
}

export default Page
