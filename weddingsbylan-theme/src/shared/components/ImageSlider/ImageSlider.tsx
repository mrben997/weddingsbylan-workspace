import React, { FC, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'

import './ImageSlider.scss'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

interface ImageSliderProps {
  images: Array<{
    src: string
    alt: string
    title?: string
    description?: string
  }>
  className?: string
  autoplay?: boolean
  navigation?: boolean
  pagination?: boolean
  loop?: boolean
  slidesPerView?: number | 'auto'
  spaceBetween?: number
  centeredSlides?: boolean
  effect?: 'slide' | 'coverflow'
}

const ImageSlider: FC<ImageSliderProps> = ({
  images,
  className = '',
  autoplay = true,
  navigation = true,
  pagination = true,
  loop = true,
  slidesPerView = 1,
  spaceBetween = 30,
  centeredSlides = false,
  effect = 'slide'
}) => {
  const swiperRef = useRef<any>(null)

  const swiperModules = [Navigation, Pagination]
  
  if (autoplay) swiperModules.push(Autoplay)
  if (effect === 'coverflow') swiperModules.push(EffectCoverflow)

  return (
    <div className={`image-slider ${className}`}>
      <Swiper
        ref={swiperRef}
        modules={swiperModules}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        centeredSlides={centeredSlides}
        loop={loop}
        autoplay={autoplay ? {
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        } : false}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        effect={effect}
        coverflowEffect={effect === 'coverflow' ? {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        } : undefined}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: slidesPerView === 'auto' ? 'auto' : Math.min(2, Number(slidesPerView)),
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: slidesPerView,
            spaceBetween: spaceBetween,
          },
        }}
        grabCursor={true}
        touchRatio={1}
        touchAngle={45}
        longSwipesRatio={0.5}
        longSwipesMs={300}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="slider-item">
              <div className="image-container">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  loading="lazy"
                />
              </div>
              {(image.title || image.description) && (
                <div className="slide-content">
                  {image.title && <h3 className="slide-title">{image.title}</h3>}
                  {image.description && <p className="slide-description">{image.description}</p>}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ImageSlider