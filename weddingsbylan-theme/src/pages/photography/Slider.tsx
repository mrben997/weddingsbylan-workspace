import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'

import './Slider.scss'

const slides = [
  {
    img: 'https://fleur.qodeinteractive.com/wp-content/uploads/2017/01/h1-slide-1-background.jpg',
    title: 'STYLE & GRACE',
    subtitle: 'Make your beautiful website with Fleur',
    button: 'Purchase'
  },
  {
    img: 'https://fleur.qodeinteractive.com/wp-content/uploads/2017/01/h1-slide-4-background.jpg',
    title: 'THIS IS BEAUTY',
    subtitle: 'Designed with love & care, Fleur is all you ever wanted',
    desc: 'Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor elit. Duis sed odio sit amet nibh',
    button: 'Purchase'
  },
  {
    img: 'https://fleur.qodeinteractive.com/wp-content/uploads/2017/01/h1-slide-3-background.jpg',
    title: 'MODERN ELEGANCE',
    subtitle: 'Perfect layouts for your portfolio and shop',
    button: 'Purchase'
  }
]

const Slider = () => {
  const swiperRef = useRef<any>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className='slider'>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect='fade'
        fadeEffect={{ crossFade: false }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={800}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className='slider__container'
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className='slider__slide' style={{ backgroundImage: `url(${slide.img})` }}>
              <div className='slider__content'>
                <h2 className={`slider__title ${index === 0 || index === 2 ? 'slider__title--no-margin' : ''}`}>{slide.title}</h2>

                {(index === 0 || index === 2) && (
                  <svg className='slider__divider' width='100' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
                    <line x1='0' y1='10' x2='85' y2='10' stroke='#fff' strokeWidth='1' />
                    <polygon points='100,5 105,10 100,15 95,10' fill='#fff' />
                    <line x1='115' y1='10' x2='200' y2='10' stroke='#fff' strokeWidth='1' />
                  </svg>
                )}

                <span className='slider__subtitle'>{slide.subtitle}</span>
                {index === 1 && <span className='slider__desc'>{slide.desc}</span>}
                <a href='#' className='slider__btn'>
                  {slide.button}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom arrows */}
      <div className='slider__nav slider__nav--left' onClick={() => swiperRef.current?.slidePrev()}>
        <span className='slider__nav-arrow'>
          <FaArrowLeftLong />
        </span>
        <span className='slider__nav-count'>
          <span className='slider__nav-count-top'>{((activeIndex - 1 + slides.length) % slides.length) + 1}</span>
          <span className='slider__nav-count-divider'>/</span>
          <span className='slider__nav-count-bottom'>{slides.length}</span>
        </span>
      </div>

      <div className='slider__nav slider__nav--right' onClick={() => swiperRef.current?.slideNext()}>
        <span className='slider__nav-arrow'>
          <FaArrowRightLong />
        </span>
        <span className='slider__nav-count'>
          <span className='slider__nav-count-top'>{((activeIndex + 1) % slides.length) + 1}</span>
          <span className='slider__nav-count-divider'>/</span>
          <span className='slider__nav-count-bottom'>{slides.length}</span>
        </span>
      </div>
    </div>
  )
}

export default Slider
