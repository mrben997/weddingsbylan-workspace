'use server'
import '@/shared/styled/makeup-and-hair.scss'
import React, { FC } from 'react'
import { IPageProps } from '@/app/types'
import { settingSService } from '@/services/setting.service'
import MakeupAndHairView from '@/views/makeup-and-hair'

const Page: FC<IPageProps> = async (props) => {
  const p = await props.params
  const pageData = await settingSService.getSettingdata('en', ['Global', 'MakeupAndHair'], ['Setting', 'About', 'AboutImage', 'Footer'])

  const dataSetting = pageData?.getSingleData('Setting')
  const dataAbout = pageData?.getSingleData('About')
  const dataAboutImage = pageData?.getSingleData('AboutImage')

  return <MakeupAndHairView />
}

export default Page
