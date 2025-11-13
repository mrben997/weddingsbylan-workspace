import React, { FC, useState, useEffect, useRef, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import Shuffle from 'shufflejs'
import { GrSearch } from 'react-icons/gr'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'

import 'swiper/css'
import 'swiper/css/effect-fade'
import Header from '../../shared/components/Layout/Header'
import Footer from '../../shared/components/Layout/Footer'
import DividerIcon from '../../shared/components/divider-icon'
import TabFilter from '../../shared/components/TabFilter'
import { Link } from 'react-router-dom'
import './index.scss'

const slides = [
  {
    title: 'THE RIGHT ONE FOR YOU',
    subtitle: 'Find your perfect dress in our large collection',
    img: 'https://fleur.qodeinteractive.com/wp-content/uploads/2017/01/home-shop-sidebar-backround.jpg'
  },
  {
    title: 'NEVER STOP DREAMING.',
    img: 'https://fleur.qodeinteractive.com/wp-content/uploads/2017/01/bridal-shop-slide-2-background.jpg'
  },
  {
    title: 'FOR YOUR PERFECT DAY',
    img: 'https://fleur.qodeinteractive.com/wp-content/uploads/2017/01/home-shop-sidebar-slide-2-backround.jpg'
  }
]

const categories = ['ALL', 'ARTISTIC', 'MODERN', 'PHOTOGRAPHY', 'PRINT']

const portfolioImages = [
  {
    src: '/images/portfolio-0.jpg',
    alt: 'Portfolio Image 1',
    title: 'Wedding Photography',
    description: 'Capturing beautiful moments on your special day',
    category: 'PHOTOGRAPHY'
  },
  {
    src: '/images/portfolio-1.jpg',
    alt: 'Portfolio Image 2',
    title: 'Couple Portrait',
    description: 'Romantic and elegant couple photography',
    category: 'ARTISTIC'
  },
  {
    src: '/images/slide-0.jpg',
    alt: 'Portfolio Image 3',
    title: 'Wedding Ceremony',
    description: 'Professional ceremony photography',
    category: 'PHOTOGRAPHY'
  },
  {
    src: '/images/slide-1.jpg',
    alt: 'Portfolio Image 4',
    title: 'Reception Moments',
    description: 'Joy and celebration captured perfectly',
    category: 'MODERN'
  },
  {
    src: '/images/slide-2.jpg',
    alt: 'Portfolio Image 5',
    title: 'Detail Shots',
    description: 'Beautiful wedding details and decorations',
    category: 'ARTISTIC'
  },
  {
    src: '/images/gallery-0.jpg',
    alt: 'Portfolio Image 6',
    title: 'Bridal Portrait',
    description: 'Elegant bridal photography sessions',
    category: 'PHOTOGRAPHY'
  },
  {
    src: '/images/gallery-1.jpg',
    alt: 'Portfolio Image 7',
    title: 'Wedding Party',
    description: 'Fun and creative group photography',
    category: 'MODERN'
  },
  {
    src: '/images/gallery-2.jpg',
    alt: 'Portfolio Image 8',
    title: 'Venue Shots',
    description: 'Stunning venue and location photography',
    category: 'PRINT'
  }
]

const PortfolioPage: FC = () => {
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
      <Header logoTheme='theme-light' />

      <div className='portfolio-content'>
        <div className='portfolio-header'>
          <h1 className='typography-h1'>Our Portfolio</h1>
          <DividerIcon />
          <p className='typography-body1'>Explore our collection of beautiful wedding moments captured through our lens.</p>
        </div>

        {/* Slider */}
        <div className='slider'>
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
              {portfolioImages.map((img, i) => (
                <div key={i} className='item' data-groups={JSON.stringify([img.category])}>
                  <Link to='/portfolio-detail' className='thumb'>
                    <img src={img.src} alt={img.alt} loading='lazy' />
                    <div className='gallery-overlay'>
                      <span className='gallery-icon'>
                        <GrSearch />
                      </span>
                    </div>
                  </Link>
                  <h4 className='title'>
                    <Link to='/portfolio-detail' className='title-link'>
                      {img.title}
                    </Link>
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PortfolioPage
