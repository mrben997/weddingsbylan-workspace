'use server'
import { FC } from 'react'
import PortfolioView from '@/views/portfolio'
import Footer from '@/views/global/footer'
import { newsService } from '@/services/news.servce'
import { IPortfolioItem } from '@/views/portfolio/configs'
import { INews } from '@/admin-react-app/model'
import { GetImageUrl } from '@/shared/helper'

const PortfolioPage: FC = async () => {
  const data = await newsService.Filter({})
  console.log('Porfolio data', data)

  return (
    <>
      <PortfolioView portfolioItems={mapData(data ?? [])} />
      <Footer />
    </>
  )
}

export default PortfolioPage

const mapData = (data: INews[]): IPortfolioItem[] => {
  return data.map<IPortfolioItem>((item) => ({
    src: GetImageUrl('News', item.ImageUrl ?? '') ?? '',
    alt: item.Name,
    title: item.Name,
    description: item.Content ?? '',
    category: 'wedding' // TODO map category
  }))
}
