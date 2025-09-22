'use server'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@/shared/styled/home.scss'
import { Initial } from './initial'
import { settingSService } from '@/services/setting.service'
import { FC } from 'react'
import HomePhotography from './_home/photography'
import { ImagePath } from '@/shared/config'
import HomeService from './_home/service'
import HomeBanner from './_home/banner'
import { IPageProps } from '@/app/types'
import Footer from '@/views/global/footer'
import HomePortfolio from '@/views/home/portfolio'

const Home: FC<IPageProps> = async (props) => {
  const p = await props.params
  const locale = p.locale ?? 'vn'
  const pageData = await settingSService.getSettingdata(
    locale ?? 'vn',
    ['Global', 'Home'],
    [
      'Setting',
      'Banner',
      'HomePhotography',
      'HomePhotographyImage',
      'HomeMakeupAndHair',
      'HomeMakeupAndHairImage',
      'HomePortfolio',
      'HomePortfolioImage',
      'HomePortfolioItems',
      'Footer'
    ]
  )

  const obj = {
    photographyImg: pageData?.getData('HomePhotographyImage'),
    makeupAndHairImg: pageData?.getData('HomeMakeupAndHairImage'),
    portfolioImg: pageData?.getData('HomePortfolioImage')
  }
  const photographyImg = obj.photographyImg ? obj.photographyImg[0] : undefined
  const makeupAndHairImg = obj.makeupAndHairImg ? obj.makeupAndHairImg[0] : undefined
  const portfolioImg = obj.portfolioImg ? obj.portfolioImg[0] : undefined

  return (
    <>
      <section className='home-page-area'>
        <Initial />
        <div className='swiper vertical-swiper'>
          <div className='parallax-bg'></div>
          <div className='swiper-wrapper'>
            {/* page 1 */}
            <div className='swiper-slide carousel-area' data-logo-class='theme-dark'>
              <HomeBanner data={pageData?.getData('Banner')} />
            </div>
            {/* about */}
            <div className='swiper-slide' data-parallax-bg={`${ImagePath}/${photographyImg?.ImageUrl}`} data-parallax-minor='.section'>
              <HomePhotography data={pageData?.getData('HomePhotography')} />
            </div>
            {/* service */}
            <div className='swiper-slide' data-parallax-bg={`${ImagePath}/${makeupAndHairImg?.ImageUrl}`} data-parallax-minor='.section'>
              <HomeService data={pageData?.getData('HomeMakeupAndHair')} />
            </div>
            {/* portfolio */}
            <div className='swiper-slide' data-parallax-bg={`${ImagePath}/${portfolioImg?.ImageUrl}`} data-parallax-minor='.section'>
              <HomePortfolio portfolioItems={pageData?.getData('HomePortfolioItems')} portfolioData={pageData?.getData('HomePortfolio')} />
            </div>
            {/* footer */}
            {/* <div className="swiper-slide" data-parallax-bg="/images/footer-0.png" data-parallax-minor=".section"> */}
            <div className='swiper-slide' data-logo-class='theme-dark'>
              <Footer footerData={pageData?.getData('Footer')} settingData={pageData?.getData('Setting')} />
            </div>
          </div>
          {/* vertical swiper pagination */}
          {/* <div id="vertical-swiper-pagination" className="vertical-swiper-pagination"></div> */}
        </div>
      </section>
    </>
  )
}

export default Home
