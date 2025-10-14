'use server'
import { FC } from 'react'
import PortfolioView from '@/views/portfolio'
import Footer from '@/views/global/footer'
import { newsService } from '@/services/news.servce'
import { mapPortfolioItems } from './helper'

const PortfolioPage: FC = async () => {
  const res = await newsService.Filter({ })
  console.log('news res', res);
  
  return (
    <>
      <PortfolioView  data={mapPortfolioItems(res)} />
      <Footer />
    </>
  )
}

export default PortfolioPage
