'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import './index.scss'

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

const plans = [
  { title: 'BUSINESS', price: '$39', per: 'per month', features: ['10 projects', '100 users'] },
  {
    title: 'EXPERT',
    price: '$59',
    per: 'per month',
    features: ['20 projects', '200 users'],
    ribbon: { text: 'POPULAR', type: 'popular' },
    variant: 'expert'
  },
  {
    title: 'SUPREME',
    price: '$79',
    per: 'per month',
    features: ['15 projects', '150 users'],
    ribbon: { text: 'NEW', type: 'new' },
    variant: 'supreme'
  }
]

const notes = [
  { id: 1, title: 'Introduction', text: 'Nullam ac justo efficitur, tristique ligula a, pellentesque ipsum.' },
  { id: 2, title: 'Preparation', text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.' },
  { id: 3, title: 'Execution', text: 'Praesent laoreet sapien sit amet massa ornare, in pretium ex elementum.' },
  { id: 4, title: 'Summary', text: 'Curabitur nec arcu nec nulla scelerisque condimentum.' }
]

const MakeupAndHairView: React.FC = () => {
  const swiperRef = useRef<any>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.2 }
    )

    refs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      refs.current.forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  return (
    <div className='photography-wrapper'>
      <main className='photography-page'>
        <section className='banner-area'>
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
              className='container'
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className='slide' style={{ backgroundImage: `url(${slide.img})` }}>
                    <div className='content'>
                      {/* TODO font-size: 79px color: var(--color-bg) font-weight: 300 */}
                      <h2 className={`typography-h1 title ${index === 0 || index === 2 ? 'title--no-margin' : ''}`}>{slide.title}</h2>
                      {(index === 0 || index === 2) && (
                        <svg className='divider' width='100' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
                          <line x1='0' y1='10' x2='85' y2='10' stroke='#fff' strokeWidth='1' />
                          <polygon points='100,5 105,10 100,15 95,10' fill='#fff' />
                          <line x1='115' y1='10' x2='200' y2='10' stroke='#fff' strokeWidth='1' />
                        </svg>
                      )}
                      {/* TODO color: font-size: 25px var(--color-bg))*/}
                      <span className='typography-subtitle subtitle'>{slide.subtitle}</span>
                      {/* TODO font-size: 18px color: var(--color-bg)*/}
                      {index === 1 && <span className='typography-h5 desc'>{slide.desc}</span>}
                      {/* TODO color: var(--color-bg) text-transform: uppercase*/}
                      <a href='#' className='typography-subtitle2 btn'>
                        {slide.button}
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom arrows */}
            <div className='nav left' onClick={() => swiperRef.current?.slidePrev()}>
              <span className='arrow'>
                <FaArrowLeftLong />
              </span>
              {/* TODO color: var(--color-bg)*/}
              <span className='typography-h6 count'>
                <span className='count-top'>{((activeIndex - 1 + slides.length) % slides.length) + 1}</span>
                <span className='count-divider'>/</span>
                <span className='count-bottom'>{slides.length}</span>
              </span>
            </div>

            <div className='nav right' onClick={() => swiperRef.current?.slideNext()}>
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
        </section>

        {/* About */}
        <section className='about-section'>
          <div className='about-image' style={{ backgroundImage: 'url(images/about-1.jpg)' }}></div>
          <div className='about-content'>
            <h2 className='typography-h2'>About Lan Le</h2>
            <p className={`typography-h6 ${expanded ? 'expanded' : 'collapsed'}`}>
              Lan graduated from Empire Beauty School with distinguished recognition in 2000. Due to her natural curiosity and passion for all that is beauty,
              she began her professional career learning from in-house artists at salons, spas, and beauty clinics all throughout Philadelphia. With over 20
              years of experience, Lan now boasts a vast skill set in both professional hair and makeup. Lan values the needs of her clients and her priority is
              to always make them the happiest on their special day. She makes sure that her work is done in an efficient and timely manner, reducing any
              unnecessary stress for her beautiful brides on their memorable day!
            </p>
            <span className='read-more' onClick={() => setExpanded(!expanded)}>
              {expanded ? 'Read less' : 'Read more'}
            </span>
          </div>
        </section>

        {/* Services */}
        <section className='services-section mb--5'>
          <div className='services-title mb--3'>
            <img src='images/logo.png' alt='Lan logo' className='services-logo' />
            <h2 className='typography-h2'>SERVICES</h2>
            <span className='typography-subtitle1'>CHOOSE YOURS</span>
          </div>

          <div className='service'>
            {plans.map((plan, index) => (
              <div key={index} className='card-wrapper'>
                <div className={`card ${plan.variant ?? ''}`}>
                  {plan.ribbon && <span className={`ribbon ${plan.ribbon.type}`}>{plan.ribbon.text}</span>}
                  <ul>
                    <li className='title'>
                      <h3>{plan.title}</h3>
                    </li>
                    <li className='price'>
                      <div className='value'>{plan.price}</div>
                      <div className='per'>{plan.per}</div>
                    </li>
                    <li className='features'>
                      {plan.features.map((feature, i) => (
                        <div key={i}>{feature}</div>
                      ))}
                    </li>
                    <li className='button'>
                      <a href='#' className='btn'>
                        READ MORE
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='note-section'>
          <h2 className='typography-h2 title'>Guidelines & Tips</h2>
          <h3 className='typography-subtitle1 subtitle'>Quick help to get you started</h3>

          <div className='list'>
            {notes.map((note, index) => (
              <div
                key={note.id}
                className={`item ${index % 2 === 0 ? 'left' : 'right'}`}
                ref={(el) => {
                  refs.current[index] = el
                }}
              >
                <div className='card'>
                  <h3 className='typography-h5'>{note.title}</h3>
                  <p>
                    <em className='typography-h6'>{note.text}</em>
                  </p>
                </div>

                <div className='divider'>
                  <svg width='16' height='80' viewBox='0 0 16 80' xmlns='http://www.w3.org/2000/svg'>
                    <line x1='8' y1='0' x2='8' y2='35' stroke='#4a3e5a' strokeWidth='1' />
                    <circle cx='8' cy='40' r='3' fill='#4a3e5a' />
                    <line x1='8' y1='45' x2='8' y2='80' stroke='#4a3e5a' strokeWidth='1' />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default MakeupAndHairView
