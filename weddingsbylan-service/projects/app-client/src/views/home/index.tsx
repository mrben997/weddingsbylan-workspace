'use server'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './home.scss'
import { FC } from 'react'
import { IPageProps } from '@/app/types'
import Footer from '@/views/global/footer'
import { ImagePath } from '@/shared/config'
import { settingSService } from '@/services/setting.service'
import { Initial } from './initial'
import HomeService from './service'
import HomeBanner from './banner'
import HomePortfolio from './portfolio'
import HomePhotography from './photography'
import CustomSwiperSlide from './custom.swiper-slide'

const HomeView: FC<IPageProps> = async (props) => {
  const p = await props.params
  const locale = p.locale ?? 'vn'
  const pageData = await settingSService.getSettingdata(
    locale ?? 'vn',
    ['Global', 'Home'],
    [
      'Setting',
      'SocialLinks',
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
            <CustomSwiperSlide className='carousel-area' logoClass='theme-dark'>
              <HomeBanner data={pageData?.getData('Banner')} />
            </CustomSwiperSlide>
            {/* about */}
            <CustomSwiperSlide
              imageUrl={photographyImg?.ImageUrl ? `${ImagePath}/${photographyImg.ImageUrl}` : undefined}
              imageMobileUrl={photographyImg?.ImageMobileUrl ? `${ImagePath}/${photographyImg.ImageMobileUrl}` : undefined}
            >
              <HomePhotography data={pageData?.getData('HomePhotography')} />
            </CustomSwiperSlide>
            {/* service */}
            <CustomSwiperSlide
              imageUrl={makeupAndHairImg?.ImageUrl ? `${ImagePath}/${makeupAndHairImg.ImageUrl}` : undefined}
              imageMobileUrl={makeupAndHairImg?.ImageMobileUrl ? `${ImagePath}/${makeupAndHairImg.ImageMobileUrl}` : undefined}
            >
              <HomeService data={pageData?.getData('HomeMakeupAndHair')} />
            </CustomSwiperSlide>
            {/* portfolio */}
            <CustomSwiperSlide
              imageUrl={portfolioImg?.ImageUrl ? `${ImagePath}/${portfolioImg.ImageUrl}` : undefined}
              imageMobileUrl={portfolioImg?.ImageMobileUrl ? `${ImagePath}/${portfolioImg.ImageMobileUrl}` : undefined}
            >
              <HomePortfolio portfolioItems={pageData?.getData('HomePortfolioItems')} portfolioData={pageData?.getData('HomePortfolio')} />
            </CustomSwiperSlide>
            {/* footer */}
            <CustomSwiperSlide logoClass='theme-dark'>
              <Footer footerData={pageData?.getData('Footer')} settingData={pageData?.getData('Setting')} socialLinksData={pageData?.getData('SocialLinks')} />
            </CustomSwiperSlide>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeView
