'use server'
import { FC } from 'react'
import PortfolioView from '@/views/portfolio'
import Footer from '@/views/global/footer'

const PortfolioPage: FC = async () => {
  return (
    <>
      <PortfolioView />
      <Footer />
    </>
  )
}

export default PortfolioPage
