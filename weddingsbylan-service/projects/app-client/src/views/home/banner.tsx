import React, { FC } from 'react'
import { ImagePath } from '@/shared/config'
import { getEditModeKey } from '@/shared/components/edit.mode'
import { IBannerForm } from '@/admin-react-app/pages/settings/setting.form.types'

interface IHomeBannerProps {
  data?: IBannerForm[] | null
}

const HomeBanner: FC<IHomeBannerProps> = (props) => {
  const data = Array.isArray(props.data) ? props.data : props.data ? [props.data] : []
  return (
    <section className='section' {...getEditModeKey('Banner')}>
      <div className='inner-carousel'>
        <div className='swiper horizontal-carousel'>
          <div className='swiper-wrapper'>
            {data.map((item, index) => (
              <div className='swiper-slide' key={index}>
                <div className='carousel-item left' style={{ backgroundImage: `url('${ImagePath}/${item.ImageUrl}')` }}>
                  <div className='carousel-item-content'>
                    <h1 className='typography-caption'>{item.SubTitle}</h1>
                    <h2 className='typography-h1 mt--1'>{item.Title}</h2>
                    <svg className='section-divider' width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
                      <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' strokeWidth='1' />
                      <polygon points='100,5 105,10 100,15 95,10' fill='currentColor' />
                      <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' strokeWidth='1' />
                    </svg>
                    <p className='typography-body1 mt--1'>{item.Content}</p>
                  </div>
                  <div className='carousel-item-overlay'></div>
                </div>
              </div>
            ))}
          </div>
          {/* Add navigation buttons */}
          <div className='swiper-button-prev'></div>
          <div className='swiper-button-next'></div>
          {/* Add pagination */}
          {/* <div className="swiper-pagination"></div> */}
        </div>
      </div>
    </section>
  )
}

export default HomeBanner
