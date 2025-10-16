import React, { FC, useState, useEffect, useRef } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import Shuffle from 'shufflejs'
import { GrSearch } from 'react-icons/gr'

import Header from '../../shared/components/Layout/Header'
import Footer from '../../shared/components/Layout/Footer'
import DividerIcon from '../../shared/components/divider-icon'
import ImageSlider from '../../shared/components/ImageSlider'
import TabFilter from '../../shared/components/TabFilter'
import { Link } from 'react-router-dom'
import './index.scss'

const PortfolioPage: FC = () => {
  const [active, setActive] = useState('ALL')
  const [allLoaded, setAllLoaded] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const shuffle = useRef<Shuffle | null>(null)
  const swiperRef = useRef<any>(null)

  const images = [
    {
      title: 'Minimalistic Models',
      src: 'https://fleur.qodeinteractive.com/wp-content/uploads/2016/05/port1-gallery-4.jpg'
    },
    {
      title: 'Week In Paris',
      src: 'https://fleur.qodeinteractive.com/wp-content/uploads/2016/05/port1-gallery-3.jpg'
    },
    {
      title: 'Scrapbook',
      src: 'https://fleur.qodeinteractive.com/wp-content/uploads/2016/05/port1-gallery-2.jpg'
    }
  ]

  // Portfolio categories
  const categories = ['ALL', 'ARTISTIC', 'MODERN', 'PHOTOGRAPHY', 'PRINT']

  // Portfolio images data with categories
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

  // Filter images based on active tab
  useEffect(() => {
    if (!gridRef.current) return
    const grid = gridRef.current

    shuffle.current = new Shuffle(grid, {
      itemSelector: '.item',
      speed: 550
    })

    const imgs = Array.from(grid.querySelectorAll('img'))
    let loaded = 0
    const total = imgs.length

    const markLoaded = (img?: HTMLImageElement) => {
      if (img) img.classList.add('is-loaded')
      loaded++
      if (loaded === total) {
        requestAnimationFrame(() => {
          shuffle.current?.update()
          shuffle.current?.layout()
          setAllLoaded(true)
        })
      }
    }

    imgs.forEach((imgEl) => {
      const img = imgEl as HTMLImageElement
      if (img.complete && img.naturalWidth !== 0) markLoaded(img)
      else {
        img.addEventListener('load', () => markLoaded(img))
        img.addEventListener('error', () => markLoaded(img))
      }
    })

    return () => {
      shuffle.current?.destroy()
      shuffle.current = null
    }
  }, [])

  const handleFilter = (cat: string) => {
    setActive(cat)
    if (!shuffle.current) return

    if (cat === 'ALL') shuffle.current.filter()
    else shuffle.current.filter(cat)

    requestAnimationFrame(() => {
      shuffle.current?.update()
      shuffle.current?.layout()
    })
  }

  useEffect(() => {
    const handleResize = () => {
      if (shuffle.current) {
        requestAnimationFrame(() => {
          shuffle.current?.update()
          shuffle.current?.layout()
        })
      }
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
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

        {/* Main Portfolio Slider */}
        {/* <ImageSlider
          images={portfolioImages}
          className='portfolio-slider'
          autoplay={true}
          navigation={true}
          pagination={true}
          loop={true}
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={false}
        /> */}

        {/* Slider */}
        <div className='slider'>
          <Swiper
            modules={[Autoplay, EffectFade]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            effect='fade'
            fadeEffect={{ crossFade: true }}
            speed={1000}
            loop
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className='container'
          >
            {images.map((item, index) => (
              <SwiperSlide key={index}>
                <div className='slide'>
                  <a href={item.src} title={item.title}>
                    <img src={item.src} alt={item.title} />
                  </a>
                </div>
              </SwiperSlide>
            ))}
            <button className='button prev' onClick={() => swiperRef.current?.slidePrev()}>
              <FaAngleLeft size={28} />
            </button>
            <button className='button next' onClick={() => swiperRef.current?.slideNext()}>
              <FaAngleRight size={28} />
            </button>
          </Swiper>
        </div>

        {/* Gallery Style Grid with Tabs */}
        <div className='gallery-section'>
          <h2 className='section-title typography-h2'>Gallery Highlights</h2>
          {/* Tab Filter */}
          {/* Filtered Image Grid */}
          <div className='gallery'>
            <TabFilter tabs={categories} activeTab={active} onTabChange={handleFilter} />

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
