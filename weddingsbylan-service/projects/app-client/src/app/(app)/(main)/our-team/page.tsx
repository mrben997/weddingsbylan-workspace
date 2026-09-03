'use server'
import React, { FC } from 'react'
import { IPageProps } from '@/app/types'
import { settingSService } from '@/services/setting.service'
import OurTeamView from '@/views/our-team'

const Page: FC<IPageProps> = async (props) => {
  const p = await props.params
  const locale = p.locale ?? 'vn'

  const pageData = await settingSService.getSettingdata(
    locale,
    ['OurTeam'],
    ['OurTeamInfo', 'OurTeamMembers']
  )

  const info = pageData?.getSingleData('OurTeamInfo') ?? null
  const members = pageData?.getData('OurTeamMembers') ?? null

  return <OurTeamView info={info} members={members} />
}

export default Page
