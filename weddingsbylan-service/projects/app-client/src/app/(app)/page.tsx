'use server'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@/shared/styled/home.scss'
import { Initial } from '../../views/home/initial'
import { settingSService } from '@/services/setting.service'
import { FC } from 'react'
import HomePhotography from '../../views/home/photography'
import { ImagePath } from '@/shared/config'
import HomeService from '../../views/home/service'
import HomeBanner from '../../views/home/banner'
import { IPageProps } from '@/app/types'
import Footer from '@/views/global/footer'
import HomePortfolio from '@/views/home/portfolio'
import CustomSwiperSlide from '@/views/home/custom.swiper-slide'

const Home: FC<IPageProps> = async (props) => {
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
            <CustomSwiperSlide imageUrl={`${ImagePath}/${photographyImg?.ImageUrl}`}>
              <HomePhotography data={pageData?.getData('HomePhotography')} />
            </CustomSwiperSlide>
            {/* service */}
            <CustomSwiperSlide imageUrl={`${ImagePath}/${makeupAndHairImg?.ImageUrl}`}>
              <HomeService data={pageData?.getData('HomeMakeupAndHair')} />
            </CustomSwiperSlide>
            {/* portfolio */}
            <CustomSwiperSlide imageUrl={`${ImagePath}/${portfolioImg?.ImageUrl}`}>
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

export default Home
