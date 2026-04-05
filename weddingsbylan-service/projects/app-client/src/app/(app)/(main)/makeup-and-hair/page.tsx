'use server'
import '@/shared/styled/makeup-and-hair.scss'
import React, { FC } from 'react'
import { IPageProps } from '@/app/types'
import { settingSService } from '@/services/setting.service'
import MakeupAndHairView from '@/views/makeup-and-hair'
import { GetImageUrl } from '@/shared/helper'
import { serviceService } from '@/services/Service.servce'
import { EServiceSettingArea, IServiceDTO, IServiceSetting } from '@/admin-react-app/pages/services/types'
import { tryParseObject } from '@/modules/Library/Helpers'
import { INote, IPlan } from '@/views/makeup-and-hair/types'

const getServices = async (signal?: AbortSignal): Promise<{ notes?: INote[]; services?: IPlan[]; sections?: IPlan[] }> => {
  const data = await serviceService.Filter({ where: { Locale: 'vn' } }, signal)
  const items: IServiceDTO[] = (data ?? []).map((x) => {
    const setting = tryParseObject<IServiceSetting>(x.Content, { version: '0.0.1', data: {} })
    return { ...x, Area: setting.data?.area, Type: setting.data?.type }
  })
  const notes = items.filter((x) => x.Type === 'note' && x.Area === EServiceSettingArea.makeupAndHair)
  const services = items.filter((x) => x.Type === 'package' && x.Area === EServiceSettingArea.makeupAndHair)
  const sections = items.filter((x) => x.Type === 'section' && x.Area === EServiceSettingArea.makeupAndHair)
  const obj = {
    notes: notes.map<INote>((x) => ({ id: x.Id, title: x.Name ?? '', text: x.Description ?? '' })),
    services: services.map<IPlan>((x) => ({ title: x.Name ?? '', features: x.Description ?? '' })),
    sections: sections.map<IPlan>((x) => ({ title: x.Name ?? '', features: x.Description ?? '' }))
  }
  return obj
}

const Page: FC<IPageProps> = async (props) => {
  const p = await props.params
  const pageData = await settingSService.getSettingdata('vn', ['Global', 'MakeupAndHair'], ['Setting', 'MakeupAndHairAbout', 'Footer'])

  const dataSetting = pageData?.getSingleData('Setting')
  const dataMakeupAndHairAbout = pageData?.getSingleData('MakeupAndHairAbout')
  const dataFetch = await getServices()

  return (
    <MakeupAndHairView
      data={{
        setting: dataSetting,
        makeupAndHairAbout: dataMakeupAndHairAbout
      }}
      notes={dataFetch.notes}
      services={dataFetch.services}
      sections={dataFetch.sections}
      configs={{
        title: dataMakeupAndHairAbout?.Title ?? '',
        description: dataMakeupAndHairAbout?.Content ?? '',
        image: GetImageUrl('Settings', dataMakeupAndHairAbout?.ImageUrl) ?? '',
        alt: 'Makeup & Hair',
        url: '/makeup-and-hair'
      }}
    />
  )
}

export default Page
