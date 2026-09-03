'use server'
import React, { FC } from 'react'
import { IPageProps } from '@/app/types'
import HomeView from '@/views/home'

const Page: FC<IPageProps> = async (props) => {
  return <HomeView {...props} />
}

export default Page
