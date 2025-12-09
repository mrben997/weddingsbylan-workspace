'use client'
import React, { FC, useState, useEffect, useRef, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import Shuffle from 'shufflejs'
import { GrSearch } from 'react-icons/gr'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'

import 'swiper/css'
import 'swiper/css/effect-fade'
import DividerIcon from '@/shared/components/divider-icon'
import TabFilter from '@/shared/components/tab-filter'
import type { IPortfolioItem, IPortfolioSlide } from './configs'
import { defaultCategories, defaultPortfolioItems, defaultPortfolioSlides } from './configs'

// Styles
import './slider.scss'
import './index.scss'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getEditModeKey } from '@/shared/components/edit.mode'

interface IPortfolioViewProps {
  categories?: string[]
  portfolioItems?: IPortfolioItem[]
  portfolioSlides?: IPortfolioSlide[]
}

export const PortfolioView: FC<IPortfolioViewProps> = (props) => {
  const slides = props.portfolioSlides && props.portfolioSlides.length > 0 ? props.portfolioSlides : defaultPortfolioSlides

  const categories = props.categories || defaultCategories
  const portfolioImages = props.portfolioItems || defaultPortfolioItems

  // get locale from the current route params (app router)
  const params = useParams() as { locale?: string }
  const locale = params?.locale || 'en'

  const [activeIndex, setActiveIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [allLoaded, setAllLoaded] = useState(false)

  const gridRef = useRef<HTMLDivElement>(null)
  const shuffleInstance = useRef<Shuffle | null>(null)
  const swiperInstance = useRef<any>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const grid = gridRef.current
    const shuffle = new Shuffle(grid, { itemSelector: '.item', speed: 550 })
    shuffleInstance.current = shuffle

    const images = Array.from(grid.querySelectorAll('img'))
    let loadedCount = 0

    const handleLoaded = (img?: HTMLImageElement) => {
      if (img) img.classList.add('is-loaded')
      loadedCount++
      if (loadedCount === images.length) {
        requestAnimationFrame(() => {
          shuffle.update()
          shuffle.layout()
          setAllLoaded(true)
        })
      }
    }

    images.forEach((imgEl) => {
      const img = imgEl as HTMLImageElement
      if (img.complete && img.naturalWidth > 0) handleLoaded(img)
      else {
        const onLoad = () => handleLoaded(img)
        const onError = () => handleLoaded(img)
        img.addEventListener('load', onLoad)
        img.addEventListener('error', onError)
      }
    })

    const updateLayout = () => {
      requestAnimationFrame(() => {
        shuffle.update()
        shuffle.layout()
      })
    }

    window.addEventListener('resize', updateLayout)
    window.addEventListener('orientationchange', updateLayout)

    return () => {
      window.removeEventListener('resize', updateLayout)
      window.removeEventListener('orientationchange', updateLayout)
      shuffle.destroy()
      shuffleInstance.current = null
    }
  }, [])

  const handleFilter = useCallback((category: string) => {
    setActiveCategory(category)
    const shuffle = shuffleInstance.current
    if (!shuffle) return
    shuffle.filter(category === 'ALL' ? () => true : category)
  }, [])

  return (
    <div className='portfolio-area'>
      <div className='portfolio-content'>
        <div className='portfolio-header'>
          <h1 className='typography-h1'>Our Portfolio</h1>
          <DividerIcon />
          <p className='typography-body1'>Explore our collection of beautiful wedding moments captured through our lens.</p>
        </div>

        {/* Slider */}
        <div className='slider' {...getEditModeKey('PortfolioSlide')}>
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect='fade'
            fadeEffect={{ crossFade: false }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            speed={800}
            loop
            onSwiper={(swiper) => (swiperInstance.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className='container'
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className={`slide ${index === 0 ? 'slide--left' : ''}`} style={{ backgroundImage: `url(${slide.img})` }}>
                  <div className='content'>
                    {/* TODO font-size: 40px color: var(--color-bg) */}
                    <h2 className='typography-h2 title'>{slide.title}</h2>
                    {/* TODO color: font-size: 25px var(--color-bg))*/}
                    <span className='subtitle'>{slide.subtitle}</span>
                    {/* TODO font-size: 18px color: var(--color-bg)*/}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom arrows */}
          <div className={`nav left ${activeIndex === 0 ? 'special' : ''}`} onClick={() => swiperInstance.current?.slidePrev()}>
            <span className='arrow'>
              <FaArrowLeftLong />
            </span>
            {/* TODO color: var(--color-bg)*/}
            <span className={`typography-h6 count ${activeIndex === 0 ? 'special' : ''}`}>
              <span className='count-top'>{((activeIndex - 1 + slides.length) % slides.length) + 1}</span>
              <span className='count-divider'>/</span>
              <span className='count-bottom'>{slides.length}</span>
            </span>
          </div>

          <div className={`nav right ${activeIndex === 0 ? 'special' : ''}`} onClick={() => swiperInstance.current?.slideNext()}>
            <span className='arrow'>
              <FaArrowRightLong />
            </span>
            <span className='typography-h6 count'>
              <span className='count-top'>{((activeIndex + 1) % slides.length) + 1}</span>
              <span className='count-divider'>/</span>
              <span className='count-bottom'>{slides.length}</span>
            </span>
          </div>
        </div>

        <div className='gallery-section'>
          <h2 className='section-title typography-h2'>Gallery Highlights</h2>
          <div className='gallery'>
            <TabFilter tabs={categories} activeTab={activeCategory} onTabChange={handleFilter} />

            <div className={`grid ${allLoaded ? 'is-ready' : ''}`} ref={gridRef}>
              {portfolioImages.map((item, i) => {
                return (
                  <div key={i} className='item' data-groups={JSON.stringify([item.category])}>
                    <Link href={item.href || '#'} className='thumb'>
                      <img src={item.src} alt={item.alt} loading='lazy' />
                      <div className='gallery-overlay'>
                        <span className='gallery-icon'>
                          <GrSearch />
                        </span>
                      </div>
                    </Link>
                    <h4 className='title'>
                      <Link href={item.href || '#'} className='title-link'>
                        {item.title}
                      </Link>
                    </h4>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioView
