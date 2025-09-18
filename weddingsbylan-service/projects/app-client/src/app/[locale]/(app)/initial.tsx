'use client'
import { useEffect } from 'react'
import Swiper from 'swiper/bundle'
import type { Swiper as SwiperType } from 'swiper'

interface AppThisActions {
  menuInitialize: () => void
  initVerticalSwiper: () => SwiperType | undefined
  initHorizontalSwiper: () => SwiperType | undefined
}

interface AppThis extends AppThisActions {
  initialized: boolean
  preloadParallaxMinor: (swiper: SwiperType) => void
  restoreParallaxMinor: (swiper: SwiperType) => void
  updateParallax: (swiper: SwiperType) => void
  updateLogoClass: (swiper: SwiperType) => void
  updateNavigationNumbers: (swiper: SwiperType) => void
  initial: () => void
}

const appThis: AppThis = {
  initialized: false,

  // Preload parallax background for slides
  preloadParallaxMinor: (swiper: SwiperType): void => {
    try {
      swiper.slides.forEach((slide: HTMLElement) => {
        const bgUrl = slide.dataset.parallaxBg
        const minorSelector = slide.dataset.parallaxMinor

        if (!bgUrl || !minorSelector) return

        const target = slide.querySelector(minorSelector) as HTMLElement
        if (target) {
          target.style.backgroundImage = `url(${bgUrl})`
          target.style.backgroundSize = 'cover'
          target.style.backgroundPosition = 'center'
          target.style.backgroundRepeat = 'no-repeat'
        }
      })
    } catch (error) {
      console.error('Error in preloadParallaxMinor:', error)
    }
  },

  // Restore parallax background for non-active slides
  restoreParallaxMinor: (swiper: SwiperType): void => {
    try {
      swiper.slides.forEach((slide: HTMLElement, index: number) => {
        if (index === swiper.activeIndex) return

        const bgUrl = slide.dataset.parallaxBg
        const minorSelector = slide.dataset.parallaxMinor

        if (!bgUrl || !minorSelector) return

        const target = slide.querySelector(minorSelector) as HTMLElement
        if (target) {
          target.style.backgroundImage = `url(${bgUrl})`
        }
      })
    } catch (error) {
      console.error('Error in restoreParallaxMinor:', error)
    }
  },

  // Update parallax background for the active slide
  updateParallax: (swiper: SwiperType): void => {
    try {
      const activeSlide = swiper.slides[swiper.activeIndex] as HTMLElement
      const parallaxBg = document.querySelector('.parallax-bg') as HTMLElement

      if (!activeSlide || !parallaxBg) {
        throw new Error('Active slide or parallax background element not found')
      }

      const bgUrl = activeSlide.dataset?.parallaxBg
      const minorSelector = activeSlide.dataset?.parallaxMinor

      // Set main background image
      parallaxBg.style.backgroundImage = bgUrl ? `url(${bgUrl})` : ''

      // Hide background image in minor element of active slide
      if (minorSelector) {
        const minorEl = activeSlide.querySelector(minorSelector) as HTMLElement
        if (minorEl) {
          minorEl.style.backgroundImage = 'none'
        }
      }
    } catch (error) {
      console.error('Error in updateParallax:', error)
    }
  },

  // Update logo class based on active slide
  updateLogoClass: (swiper: SwiperType): void => {
    try {
      const activeSlide = swiper.slides[swiper.activeIndex] as HTMLElement
      const logoElement = document.querySelector('.logo-area') as HTMLElement

      if (!logoElement) {
        console.warn('Logo element not found')
        return
      }

      // Remove all theme classes first
      logoElement.classList.remove('theme-dark', 'theme-light')

      // Add new class if data-logo-class exists on active slide
      const logoClass = activeSlide?.dataset?.logoClass
      if (logoClass) {
        logoElement.classList.add(logoClass)
        console.log(`Added logo class: ${logoClass}`)
      }
      // Không cần else case để add default class nữa
    } catch (error) {
      console.error('Error in updateLogoClass:', error)
    }
  },

  // Initialize vertical Swiper
  initVerticalSwiper: (): SwiperType | undefined => {
    try {
      return new Swiper('.vertical-swiper', {
        direction: 'vertical',
        mousewheel: {
          enabled: true,
          sensitivity: 1, // Giảm độ nhạy
          releaseOnEdges: true, // Cho phép scroll qua edge
          forceToAxis: true, // Chỉ scroll theo trục dọc
          thresholdDelta: 20, // Cần lực scroll tối thiểu
          thresholdTime: 150 // Thời gian tối thiểu giữa các lần scroll
        },
        slidesPerView: 1,
        speed: 800,
        effect: 'slide',
        parallax: false,
        cssMode: false,
        loop: true,
        spaceBetween: 0,
        // Thêm resistance để tránh bounce back
        resistance: true,
        resistanceRatio: 0.85,
        // Thêm threshold để scroll dứt khoát hơn
        threshold: 30,
        touchRatio: 1,
        touchAngle: 45,
        on: {
          init: function (this: SwiperType) {
            appThis.preloadParallaxMinor(this)
            appThis.updateParallax(this)
            appThis.updateLogoClass(this)
          },
          slideChangeTransitionStart: function (this: SwiperType) {
            appThis.updateLogoClass(this)
          },
          slideChangeTransitionEnd: function (this: SwiperType) {
            appThis.updateParallax(this)
            appThis.restoreParallaxMinor(this)
          }
        }
      })
    } catch (error) {
      console.error('Error initializing vertical Swiper:', error)
      return undefined
    }
  },

  // Initialize horizontal Swiper
  initHorizontalSwiper: (): SwiperType | undefined => {
    try {
      const swiper = new Swiper('.horizontal-carousel', {
        direction: 'horizontal',
        slidesPerView: 1,
        speed: 600,
        loop: true,
        spaceBetween: 0,
        effect: 'slide',
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        on: {
          init: function (this: SwiperType) {
            console.log('Horizontal swiper initialized')
            // Small delay to ensure DOM is ready
            setTimeout(() => {
              appThis.updateNavigationNumbers(this)
            }, 100)
          },
          slideChange: function (this: SwiperType) {
            console.log('Slide changed')
            appThis.updateNavigationNumbers(this)
          }
        }
      })
      return swiper
    } catch (error) {
      console.error('Error initializing horizontal Swiper:', error)
      return undefined
    }
  },

  // Update navigation button numbers
  updateNavigationNumbers: (swiper: SwiperType): void => {
    try {
      const prevBtn = document.querySelector('.swiper-button-prev') as HTMLElement
      const nextBtn = document.querySelector('.swiper-button-next') as HTMLElement
      const currentIndex = swiper.activeIndex + 1 // Convert to 1-based index
      const totalSlides = swiper.slides.length

      console.log('Updating navigation numbers:', { currentIndex, totalSlides })

      if (prevBtn) {
        const prevNumber = currentIndex === 1 ? totalSlides : currentIndex - 1
        const prevText = `${prevNumber}/${totalSlides}`
        prevBtn.setAttribute('data-prev-number', prevText)

        // Create or update span element for the number
        let numberSpan = prevBtn.querySelector('.nav-number') as HTMLSpanElement
        if (!numberSpan) {
          numberSpan = document.createElement('span')
          numberSpan.className = 'nav-number'
          prevBtn.appendChild(numberSpan)
        }
        numberSpan.textContent = prevText

        console.log('Set prev number:', prevText)
      } else {
        console.warn('Previous button not found')
      }

      if (nextBtn) {
        const nextNumber = currentIndex === totalSlides ? 1 : currentIndex + 1
        const nextText = `${nextNumber}/${totalSlides}`
        nextBtn.setAttribute('data-next-number', nextText)

        // Create or update span element for the number
        let numberSpan = nextBtn.querySelector('.nav-number') as HTMLSpanElement
        if (!numberSpan) {
          numberSpan = document.createElement('span')
          numberSpan.className = 'nav-number'
          nextBtn.appendChild(numberSpan)
        }
        numberSpan.textContent = nextText

        console.log('Set next number:', nextText)
      } else {
        console.warn('Next button not found')
      }
    } catch (error) {
      console.error('Error updating navigation numbers:', error)
    }
  },

  menuInitialize: (): void => {
    if (appThis.initialized) return
    try {
      const menuArea = document.querySelector('.app-menu-area') as HTMLElement
      if (!menuArea) return
      const menuBtn = menuArea.querySelector('.app-menu-btn') as HTMLElement
      if (!menuBtn) return
      const memuTogger = menuArea.querySelector('.app-menu-togger') as HTMLElement
      if (!memuTogger) return

      menuBtn.addEventListener('click', () => {
        menuArea.classList.toggle('active')
      })

      // Close menu on outside click
      document.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (!menuBtn.contains(target) && !memuTogger.contains(target)) {
          menuArea.classList.remove('active')
        }
      })
    } catch (error) {
      console.error('Error initializing menu:', error)
    }
  },

  initial: (): void => {
    if (appThis.initialized) return
    appThis.initVerticalSwiper()
    appThis.initHorizontalSwiper()
    appThis.menuInitialize()
    appThis.initialized = true
  }
}

// Run initialization after the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', () => {
//   try {
//     projectManager.initial()
//   } catch (error) {
//     console.error('Error during initialization:', error)
//   }
// })

export const Initial = (): JSX.Element => {
  useEffect(() => {
    appThis.initial()

    // Cleanup function
    return () => {
      // Clean up Swiper instances if needed
    }
  }, [])

  return <></>
}
