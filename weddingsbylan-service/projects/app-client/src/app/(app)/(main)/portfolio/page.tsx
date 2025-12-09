'use server'
import { FC } from 'react'
import PortfolioView from '@/views/portfolio'
import { newsService } from '@/services/news.servce'
import { IPortfolioItem, IPortfolioSlide } from '@/views/portfolio/configs'
import { INews } from '@/admin-react-app/model'
import { GetImageUrl } from '@/shared/helper'
import { settingSService } from '@/services/setting.service'
import { IPageProps } from '@/app/types'
import { IPortfolioSlideForm } from '@/admin-react-app/pages/settings/setting.form.types'
import { unstable_noStore as noStore } from 'next/cache'

const PortfolioPage: FC<IPageProps> = async (props) => {
  noStore() // Disable caching for edit mode detection
  const p = await props.params
  const pageData = await settingSService.getSettingdata('vn', ['Global', 'Portfolio'], ['Setting', 'PortfolioSlide'])

  const dataSetting = pageData?.getSingleData('Setting')
  const dataPortfolioSlide = pageData?.getData('PortfolioSlide')
  const data = await newsService.Filter({})
  console.log('Porfolio data', data)
  // console.log('PortfolioPage slide:', dataPortfolioSlide)

  return <PortfolioView portfolioItems={mapData(data ?? [])} portfolioSlides={mapSlideData(dataPortfolioSlide || [])} />
}

export default PortfolioPage

const mapData = (data: INews[]): IPortfolioItem[] => {
  return data.map<IPortfolioItem>((item) => ({
    src: GetImageUrl('News', item.ImageUrl ?? '') ?? '',
    alt: item.Name,
    title: item.Name,
    description: item.Content ?? '',
    category: 'wedding', // TODO map category
    href: `/portfolio/${item.Id}`
  }))
}

const mapSlideData = (data?: IPortfolioSlideForm | IPortfolioSlideForm[]): IPortfolioSlide[] => {
  const list = data && Array.isArray(data) ? data : []
  return list.map<IPortfolioSlide>((item) => ({
    title: item.Title ?? '',
    img: GetImageUrl('Settings', item.ImageUrl ?? '') ?? ''
  }))
}
