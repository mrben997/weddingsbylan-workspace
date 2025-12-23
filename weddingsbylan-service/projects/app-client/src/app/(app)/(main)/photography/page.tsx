'use server'
import React, { FC } from 'react'
import { IPageProps } from '@/app/types'
import { ImagePath } from '@/shared/config'
import { settingSService } from '@/services/setting.service'
import { getEditModeKey } from '@/shared/components/edit.mode'
import PhotographyPage from '@/views/photography'
import PhotographyViewBase from '@/views/photography'
import { GetImageUrl } from '@/shared/helper'
import { INote } from '@/views/photography/Notes'
import { IPlan } from '@/views/photography/Service'
import { serviceService } from '@/services/Service.servce'
import { IServiceDTO, IServiceSetting } from '@/admin-react-app/pages/services/types'
import { tryParseObject } from '@/modules/Library/Helpers'

const getServices = async (signal?: AbortSignal): Promise<{ notes?: INote[]; services?: IPlan[] }> => {
  const data = await serviceService.Filter({ where: { Locale: 'vn' } }, signal)
  const items: IServiceDTO[] = (data ?? []).map((x) => {
    const setting = tryParseObject<IServiceSetting>(x.Content, { version: '0.0.1', data: {} })
    return { ...x, Area: setting.data?.area, Type: setting.data?.type }
  })
  const notes = items.filter((x) => x.Type === 'note' && x.Area === 'photography')
  const services = items.filter((x) => x.Type === 'package' && x.Area === 'photography')
  const obj = {
    notes: notes.map<INote>((x) => ({ id: x.Id, title: x.Name ?? '', text: x.Description ?? '' })),
    services: services.map<IPlan>((x) => ({ title: x.Name ?? '', price: '$39', per: 'per month', features: x.Description ?? '' }))
  }
  return obj
}

const Page: FC<IPageProps> = async (props) => {
  const p = await props.params
  const locale = p.locale ?? 'vn'
  const pageData = await settingSService.getSettingdata(locale ?? 'vn', ['Global', 'Photography'], ['Setting', 'PhotographyAbout', 'Footer'])

  const dataSetting = pageData?.getSingleData('Setting')
  const dataPhotographyAbout = pageData?.getSingleData('PhotographyAbout')
  const dataFetch = await getServices()

  return (
    <PhotographyViewBase
      data={{
        setting: dataSetting,
        photographyAbout: dataPhotographyAbout
      }}
      notes={dataFetch.notes}
      services={dataFetch.services}
      configs={{
        title: dataPhotographyAbout?.Title ?? '',
        description: dataPhotographyAbout?.Content ?? '',
        image: GetImageUrl('Settings', dataPhotographyAbout?.ImageUrl) ?? '',
        alt: 'Photography',
        url: '/photography'
      }}
    />
  )
}

export default Page
