import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Mousewheel } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import Header from '../../shared/components/Layout/Header'
import Footer from '../../shared/components/Layout/Footer'
import './index.scss'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/parallax'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Slide data với parallax backgrounds
const slides = [
  {
    logoClass: 'theme-dark',
    type: 'carousel'
  },
  {
    logoClass: 'theme-light',
    type: 'content',
    parallaxBg: 'images/about-0.jpg',
    parallaxMinor: '.section'
  },
  {
    logoClass: 'theme-light',
    type: 'content',
    parallaxBg: 'images/service-0.jpg',
    parallaxMinor: '.section'
  },
  {
    logoClass: 'theme-light',
    type: 'content',
    parallaxBg: 'images/portfolio-0.jpg',
    parallaxMinor: '.section'
  },
  {
    logoClass: 'theme-dark',
    type: 'footer'
  }
]

const Home: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [horizontalSlideIndex, setHorizontalSlideIndex] = useState(0)
  const [totalHorizontalSlides, setTotalHorizontalSlides] = useState(3)
  const [currentLogoTheme, setCurrentLogoTheme] = useState('theme-dark')
  const verticalSwiperRef = useRef<SwiperType | null>(null)
  const horizontalSwiperRef = useRef<SwiperType | null>(null)
  const parallaxBgRef = useRef<HTMLDivElement>(null)

  // Preload parallax backgrounds for non-active slides
  const preloadParallaxMinor = (swiper: SwiperType) => {
    try {
      swiper.slides.forEach((slide, index) => {
        const slideData = slides[index]
        if (!slideData?.parallaxBg || !slideData?.parallaxMinor) return

        const target = slide.querySelector(slideData.parallaxMinor)
        if (target) {
          const targetEl = target as HTMLElement
          targetEl.style.backgroundImage = `url(${slideData.parallaxBg})`
          targetEl.style.backgroundSize = 'cover'
          targetEl.style.backgroundPosition = 'center'
          targetEl.style.backgroundRepeat = 'no-repeat'
        }
      })
    } catch (error) {
      console.error('Error in preloadParallaxMinor:', error)
    }
  }

  // Restore parallax backgrounds for non-active slides
  const restoreParallaxMinor = (swiper: SwiperType) => {
    try {
      swiper.slides.forEach((slide, index) => {
        if (index === swiper.activeIndex) return

        const slideData = slides[index]
        if (!slideData?.parallaxBg || !slideData?.parallaxMinor) return

        const target = slide.querySelector(slideData.parallaxMinor)
        if (target) {
          const targetEl = target as HTMLElement
          targetEl.style.backgroundImage = `url(${slideData.parallaxBg})`
        }
      })
    } catch (error) {
      console.error('Error in restoreParallaxMinor:', error)
    }
  }

  // Update parallax background for active slide
  const updateParallax = (swiper: SwiperType) => {
    try {
      const activeIndex = swiper.activeIndex
      const slideData = slides[activeIndex]

      if (!parallaxBgRef.current) return

      // Set main background image
      if (slideData?.parallaxBg) {
        parallaxBgRef.current.style.backgroundImage = `url(${slideData.parallaxBg})`

        // Hide background in minor element of active slide
        if (slideData.parallaxMinor) {
          const activeSlide = swiper.slides[activeIndex]
          const minorEl = activeSlide.querySelector(slideData.parallaxMinor)
          if (minorEl) {
            const minorElement = minorEl as HTMLElement
            minorElement.style.backgroundImage = 'none'
          }
        }
      } else {
        parallaxBgRef.current.style.backgroundImage = ''
      }
    } catch (error) {
      console.error('Error in updateParallax:', error)
    }
  }

  // Update logo class based on active slide
  const updateLogoClass = (activeIndex: number) => {
    try {
      // Add new class from slide data
      const slideData = slides[activeIndex]
      if (slideData?.logoClass) {
        setCurrentLogoTheme(slideData.logoClass)
      }
    } catch (error) {
      console.error('Error in updateLogoClass:', error)
    }
  }

  // Update navigation numbers for horizontal carousel
  const updateNavigationNumbers = (swiper: SwiperType) => {
    try {
      const prevBtn = document.querySelector('.swiper-button-prev')
      const nextBtn = document.querySelector('.swiper-button-next')
      const currentIndex = swiper.activeIndex + 1
      const totalSlides = swiper.slides.length

      if (prevBtn) {
        const prevNumber = currentIndex === 1 ? totalSlides : currentIndex - 1
        const prevText = `${prevNumber}/${totalSlides}`

        let numberSpan = prevBtn.querySelector('.nav-number')
        if (!numberSpan) {
          numberSpan = document.createElement('span')
          numberSpan.className = 'nav-number'
          prevBtn.appendChild(numberSpan)
        }
        numberSpan.textContent = prevText
      }

      if (nextBtn) {
        const nextNumber = currentIndex === totalSlides ? 1 : currentIndex + 1
        const nextText = `${nextNumber}/${totalSlides}`

        let numberSpan = nextBtn.querySelector('.nav-number')
        if (!numberSpan) {
          numberSpan = document.createElement('span')
          numberSpan.className = 'nav-number'
          nextBtn.appendChild(numberSpan)
        }
        numberSpan.textContent = nextText
      }
    } catch (error) {
      console.error('Error updating navigation numbers:', error)
    }
  }

  // Handle vertical swiper initialization
  const handleVerticalSwiperInit = (swiper: SwiperType) => {
    verticalSwiperRef.current = swiper
    preloadParallaxMinor(swiper)
    updateParallax(swiper)
  }

  // Handle vertical slide change
  const handleVerticalSlideChange = (swiper: SwiperType) => {
    setActiveSlideIndex(swiper.activeIndex)
    updateParallax(swiper)
    restoreParallaxMinor(swiper)
  }

  // Handle horizontal swiper initialization
  const handleHorizontalSwiperInit = (swiper: SwiperType) => {
    horizontalSwiperRef.current = swiper
    setTotalHorizontalSlides(swiper.slides.length)
    setTimeout(() => {
      updateNavigationNumbers(swiper)
    }, 100)
  }

  // Handle horizontal slide change
  const handleHorizontalSlideChange = (swiper: SwiperType) => {
    setHorizontalSlideIndex(swiper.activeIndex)
    updateNavigationNumbers(swiper)
  }

  // Set initial logo theme
  // useEffect(() => {
  //   const initialSlide = slides[0]
  //   if (initialSlide?.logoClass) {
  //     setCurrentLogoTheme(initialSlide.logoClass)
  //   }
  // }, [])

  return (
    <div className='home-page'>
      <Header logoTheme={currentLogoTheme} />

      {/* Main content */}
      <div className='swiper vertical-swiper'>
        <div className='parallax-bg' ref={parallaxBgRef}></div>
        <Swiper
          direction='vertical'
          mousewheel={{
            enabled: true,
            sensitivity: 1,
            releaseOnEdges: true,
            forceToAxis: true,
            thresholdDelta: 20,
            thresholdTime: 150
          }}
          slidesPerView={1}
          speed={800}
          effect='slide'
          parallax={false}
          cssMode={false}
          loop={true}
          spaceBetween={0}
          resistance={true}
          resistanceRatio={0.85}
          threshold={30}
          touchRatio={1}
          touchAngle={45}
          modules={[Mousewheel, Pagination, Navigation]}
          onInit={handleVerticalSwiperInit}
          onSlideChangeTransitionStart={(swiper) => updateLogoClass(swiper.realIndex)}
          onSlideChangeTransitionEnd={handleVerticalSlideChange}
          className='vertical-swiper'
        >
          {/* Carousel Section */}
          <SwiperSlide className='carousel-area'>
            <section className='section'>
              <div className='inner-carousel'>
                <Swiper
                  direction='horizontal'
                  slidesPerView={1}
                  speed={600}
                  loop={true}
                  spaceBetween={0}
                  effect='slide'
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                  }}
                  modules={[Navigation]}
                  onInit={handleHorizontalSwiperInit}
                  onSlideChange={handleHorizontalSlideChange}
                  className='horizontal-carousel'
                >
                  <SwiperSlide>
                    <div className='carousel-item left' style={{ backgroundImage: 'url(images/slide-0.jpg)' }}>
                      <div className='carousel-item-content'>
                        <h1 className='typography-caption'>Photography</h1>
                        <h2 className='typography-h1 mt--1'>Capturing the moments that really matter</h2>
                        <svg className='section-divider' width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
                          <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' strokeWidth='1' />
                          <polygon points='100,5 105,10 100,15 95,10' fill='currentColor' />
                          <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' strokeWidth='1' />
                        </svg>
                        <p className='typography-body1 mt--1'>
                          Our approach to documenting life's greatest memories is authentic and intentional. We believe that best photos are created the way you
                          fall in love - naturally. Let us take you on this journey and guide you through every step of the way.
                        </p>
                      </div>
                      <div className='carousel-item-overlay'></div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className='carousel-item left' style={{ backgroundImage: 'url(images/slide-1.jpg)' }}>
                      <div className='carousel-item-content'>
                        <h1 className='typography-caption'>Makeup & Hair</h1>
                        <h2 className='typography-h1 mt--1'>Enhancing your natural beauty</h2>
                        <svg className='section-divider' width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
                          <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' strokeWidth='1' />
                          <polygon points='100,5 105,10 100,15 95,10' fill='currentColor' />
                          <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' strokeWidth='1' />
                        </svg>
                        <p className='typography-body1 mt--1'>
                          Our team of skilled makeup artists and hairstylists are dedicated to making you look and feel your best on your special day. We use
                          only the highest quality products and techniques to ensure a flawless finish.
                        </p>
                      </div>
                      <div className='carousel-item-overlay'></div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className='carousel-item left' style={{ backgroundImage: 'url(images/slide-2.jpg)' }}>
                      <div className='carousel-item-content'>
                        <h1 className='typography-caption'>Portfolio</h1>
                        <h2 className='typography-h1 mt--1'>A collection of our best work</h2>
                        <svg className='section-divider' width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
                          <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' strokeWidth='1' />
                          <polygon points='100,5 105,10 100,15 95,10' fill='currentColor' />
                          <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' strokeWidth='1' />
                        </svg>
                        <p className='typography-body1 mt--1'>
                          Browse through our extensive portfolio showcasing years of experience and countless beautiful moments we've had the privilege to
                          capture.
                        </p>
                      </div>
                      <div className='carousel-item-overlay'></div>
                    </div>
                  </SwiperSlide>

                  {/* Navigation buttons */}
                  <div className='swiper-button-prev'></div>
                  <div className='swiper-button-next'></div>
                </Swiper>
              </div>
            </section>
          </SwiperSlide>

          {/* About/Photography Section */}
          <SwiperSlide>
            <section className='section section-bg'>
              <div className='section-content right'>
                <div className='section-content-haft'>
                  <h1 className='typography-h2'>Photography</h1>
                  <svg className='section-divider' width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
                    <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' strokeWidth='1' />
                    <polygon points='100,5 105,10 100,15 95,10' fill='currentColor' />
                    <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' strokeWidth='1' />
                  </svg>
                  <p className='typography-body1 mt--1'>
                    Our approach to documenting life's greatest memories is authentic and intentional. We believe that best photos are created the way you fall
                    in love - naturally. Let us take you on this journey and guide you through every step of the way.
                  </p>
                  <button className='app-btn app-btn-primary mt--2'>Read more</button>
                </div>
              </div>
            </section>
          </SwiperSlide>

          {/* Service/Makeup Section */}
          <SwiperSlide>
            <section className='section section-bg'>
              <div className='section-content left'>
                <div className='section-content-haft'>
                  <h1 className='typography-h2'>Makeup and Hair</h1>
                  <svg className='section-divider' width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
                    <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' strokeWidth='1' />
                    <polygon points='100,5 105,10 100,15 95,10' fill='currentColor' />
                    <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' strokeWidth='1' />
                  </svg>
                  <p className='typography-body1 mt--1'>
                    Get your glam done by me. Event makeup and hair my specialty. Bringing the best of your natural beauty.
                  </p>
                  <button className='app-btn app-btn-primary mt--2'>Read more</button>
                </div>
              </div>
            </section>
          </SwiperSlide>

          {/* Service/Portfolio Section */}
          <SwiperSlide>
            <section className='section section-bg'>
              <div className='section-content'>
                <div className='section-content-center'>
                  <h1 className='typography-h2'>Portfolio</h1>
                  <svg className='section-divider' width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
                    <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' strokeWidth='1' />
                    <polygon points='100,5 105,10 100,15 95,10' fill='currentColor' />
                    <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' strokeWidth='1' />
                  </svg>
                  <p className='typography-body1 mt--1 mb--1'>
                    Browse through our extensive portfolio showcasing years of experience and countless beautiful moments we've had the privilege to capture.
                  </p>
                  <div className='app-container medium section-portfolio-area'>
                    {[{ url: '/images/gallery-0.jpg' }, { url: '/images/gallery-1.jpg' }, { url: '/images/gallery-2.jpg' }].map((x, i) => (
                      <div key={i.toString()} className='item'>
                        <img src={x.url} alt='album' />
                      </div>
                    ))}
                  </div>
                  <button className='app-btn app-btn-primary mt--2'>Read more</button>
                </div>
              </div>
            </section>
          </SwiperSlide>

          {/* Footer Section */}
          <SwiperSlide>
            <Footer />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Home
