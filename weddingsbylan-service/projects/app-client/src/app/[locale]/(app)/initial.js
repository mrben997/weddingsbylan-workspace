'use client'
import { useEffect } from 'react'
import Swiper from 'swiper/bundle'

const appThis = {
  initialized: false,

  // Preload parallax background for slides
  preloadParallaxMinor: (swiper) => {
    try {
      swiper.slides.forEach((slide) => {
        const bgUrl = slide.dataset.parallaxBg
        const minorSelector = slide.dataset.parallaxMinor

        if (!bgUrl || !minorSelector) return

        const target = slide.querySelector(minorSelector)
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
  restoreParallaxMinor: (swiper) => {
    try {
      swiper.slides.forEach((slide, index) => {
        if (index === swiper.activeIndex) return

        const bgUrl = slide.dataset.parallaxBg
        const minorSelector = slide.dataset.parallaxMinor

        if (!bgUrl || !minorSelector) return

        const target = slide.querySelector(minorSelector)
        if (target) {
          target.style.backgroundImage = `url(${bgUrl})`
        }
      })
    } catch (error) {
      console.error('Error in restoreParallaxMinor:', error)
    }
  },

  // Update parallax background for the active slide
  updateParallax: (swiper) => {
    try {
      const activeSlide = swiper.slides[swiper.activeIndex]
      const parallaxBg = document.querySelector('.parallax-bg')

      if (!activeSlide || !parallaxBg) {
        throw new Error('Active slide or parallax background element not found')
      }

      const bgUrl = activeSlide.dataset?.parallaxBg
      const minorSelector = activeSlide.dataset?.parallaxMinor

      // Set main background image
      parallaxBg.style.backgroundImage = bgUrl ? `url(${bgUrl})` : ''

      // Hide background image in minor element of active slide
      if (minorSelector) {
        const minorEl = activeSlide.querySelector(minorSelector)
        if (minorEl) {
          minorEl.style.backgroundImage = 'none'
        }
      }
    } catch (error) {
      console.error('Error in updateParallax:', error)
    }
  },

  // Update logo class based on active slide
  updateLogoClass: (swiper) => {
    try {
      const activeSlide = swiper.slides[swiper.activeIndex]
      const logoElement = document.querySelector('.logo-area')

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
  initVerticalSwiper: () => {
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
          init: function () {
            appThis.preloadParallaxMinor(this)
            appThis.updateParallax(this)
            appThis.updateLogoClass(this)
          },
          slideChangeTransitionStart: function () {
            appThis.updateLogoClass(this)
          },
          slideChangeTransitionEnd: function () {
            appThis.updateParallax(this)
            appThis.restoreParallaxMinor(this)
          }
        }
      })
    } catch (error) {
      console.error('Error initializing vertical Swiper:', error)
    }
  },

  // Initialize horizontal Swiper
  initHorizontalSwiper: () => {
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
          init: function () {
            console.log('Horizontal swiper initialized')
            // Small delay to ensure DOM is ready
            setTimeout(() => {
              appThis.updateNavigationNumbers(this)
            }, 100)
          },
          slideChange: function () {
            console.log('Slide changed')
            appThis.updateNavigationNumbers(this)
          }
        }
      })
      return swiper
    } catch (error) {
      console.error('Error initializing horizontal Swiper:', error)
    }
  },

  // Update navigation button numbers
  updateNavigationNumbers: (swiper) => {
    try {
      const prevBtn = document.querySelector('.swiper-button-prev')
      const nextBtn = document.querySelector('.swiper-button-next')
      const currentIndex = swiper.activeIndex + 1 // Convert to 1-based index
      const totalSlides = swiper.slides.length

      console.log('Updating navigation numbers:', { currentIndex, totalSlides })

      if (prevBtn) {
        const prevNumber = currentIndex === 1 ? totalSlides : currentIndex - 1
        const prevText = `${prevNumber}/${totalSlides}`
        prevBtn.setAttribute('data-prev-number', prevText)

        // Create or update span element for the number
        let numberSpan = prevBtn.querySelector('.nav-number')
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
        let numberSpan = nextBtn.querySelector('.nav-number')
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

  menuInitialize: () => {
    if (appThis.initialized) return
    try {
      const menuArea = document.querySelector('.app-menu-area')
      if (!menuArea) return
      const menuBtn = menuArea.querySelector('.app-menu-btn')
      if (!menuBtn) return
      const memuTogger = menuArea.querySelector('.app-menu-togger')
      if (!memuTogger) return
      menuBtn.addEventListener('click', () => {
        menuArea.classList.toggle('active')
      })
      // Close menu on outside click
      document.addEventListener('click', (event) => {
        if (!menuBtn.contains(event.target) && !memuTogger.contains(event.target)) {
          menuArea.classList.remove('active')
        }
      })
    } catch (error) {
      console.error('Error initializing menu:', error)
    }
  },

  initial: () => {
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

export const Initial = () => {
  useEffect(() => {
    appThis.initial()

    // Cleanup function
    return () => {
      // Clean up Swiper instances if needed
    }
  }, [])

  return <></>
}
