'use server'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@/shared/styled/home.scss'
import { Initial } from './initial'
import { settingSService } from '@/services/setting.service'
import { FC } from 'react'
import HomeAbout from './_home/about'
import HomeFooter from './_home/footer'
import { ImagePath } from '@/shared/config'
import HomeService from './_home/service'
import HomeBanner from './_home/banner'
import { IPageProps } from '@/app/types'

const Home: FC<IPageProps> = async (props) => {
  const p = await props.params
  const locale = p.locale ?? 'vn'
  const pageData = await settingSService.getSettingdata(
    locale ?? 'vn',
    ['Global', 'Home'],
    ['Setting', 'Banner', 'About', 'AboutImage', 'Service', 'ServiceImage', 'Footer']
  )

  const obj = {
    aboutImage: pageData?.getData('AboutImage'),
    serviceImage: pageData?.getData('ServiceImage')
  }
  const aboutImage = obj.aboutImage ? obj.aboutImage[0] : undefined
  const serviceImage = obj.serviceImage ? obj.serviceImage[0] : undefined

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
            <div className='swiper-slide' data-parallax-bg={`${ImagePath}/${aboutImage?.ImageUrl}`} data-parallax-minor='.section'>
              <HomeAbout data={pageData?.getData('About')} />
            </div>
            {/* service */}
            <div className='swiper-slide' data-parallax-bg={`${ImagePath}/${serviceImage?.ImageUrl}`} data-parallax-minor='.section'>
              <HomeService data={pageData?.getData('Service')} />
            </div>
            {/* footer */}
            {/* <div className="swiper-slide" data-parallax-bg="/images/footer-0.png" data-parallax-minor=".section"> */}
            <div className='swiper-slide' data-logo-class='theme-dark'>
              <HomeFooter data={pageData?.getData('Footer')} />
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
