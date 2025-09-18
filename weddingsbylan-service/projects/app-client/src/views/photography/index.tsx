import '@/shared/styled/photography.scss'
import React, { FC } from 'react'
import { IPageProps } from '@/app/types'
import { ImagePath } from '@/shared/config'
import { settingSService } from '@/services/setting.service'
import { getEditModeKey } from '@/shared/components/edit.mode'
import Footer from '@/shared/layout/footer'
import Header from '@/shared/layout/header'

interface IPhotographyPageProps {}

const PhotographyPage: FC<IPhotographyPageProps> = (props) => {
  return (
    <div className='photography-page'>
      {/* Hero Banner Section */}
      <section className='hero-banner section-bg parallax-section' data-bg='/images/photography-hero.jpg'>
        <div className='parallax-overlay'></div>
        <div className='section-content'>
          <div className='app-container'>
            <div className='hero-content'>
              <h1 className='hero-title'>OUR SERVICES</h1>
              <p className='hero-description'>
                Lorem ipsum dolor sit amet, nec in mollis tractatos, eos vidit etiam expetendis at. His aliquip definitiones eu, ea iriure salutatus nam
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className='services-section'>
        <div className='app-container'>
          <div className='services-grid'>
            <div className='service-item'>
              <div className='service-icon'>
                <svg width='60' height='60' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
                  <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <h3 className='service-title'>FULLY ENGAGED</h3>
              <p className='service-description'>
                Lorem ipsum dolor sit amet, te vero erat has, ad partem vivendo sensibus qui. At vim labore evertitur, ne vis invenire antiopam suscipiantur.
              </p>
            </div>

            <div className='service-item'>
              <div className='service-icon'>
                <svg width='60' height='60' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
                  <circle cx='12' cy='12' r='10' />
                  <path d='M12 6v6l4 2' />
                </svg>
              </div>
              <h3 className='service-title'>CONNECTING WORLDS</h3>
              <p className='service-description'>
                Lorem ipsum dolor sit amet, te vero erat has, ad partem vivendo sensibus qui. At vim labore evertitur, ne vis invenire antiopam suscipiantur.
              </p>
            </div>

            <div className='service-item'>
              <div className='service-icon'>
                <svg width='60' height='60' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
                  <path d='M20 6L9 17l-5-5' />
                </svg>
              </div>
              <h3 className='service-title'>RESPONSIVE LAYOUTS</h3>
              <p className='service-description'>
                Lorem ipsum dolor sit amet, te vero erat has, ad partem vivendo sensibus qui. At vim labore evertitur, ne vis invenire antiopam suscipiantur.
              </p>
            </div>

            <div className='service-item'>
              <div className='service-icon'>
                <svg width='60' height='60' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
                  <path d='M12 19l9-7-9-7-9 7 9 7z' />
                  <path d='M5 12l7-7 7 7' />
                </svg>
              </div>
              <h3 className='service-title'>YOUR KICKSTART</h3>
              <p className='service-description'>
                Lorem ipsum dolor sit amet, te vero erat has, ad partem vivendo sensibus qui. At vim labore evertitur, ne vis invenire antiopam suscipiantur.
              </p>
            </div>

            <div className='service-item'>
              <div className='service-icon'>
                <svg width='60' height='60' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
                  <path d='M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' />
                  <polyline points='9,22 9,12 15,12 15,22' />
                </svg>
              </div>
              <h3 className='service-title'>SUPORT WORLDWIDE</h3>
              <p className='service-description'>
                Lorem ipsum dolor sit amet, te vero erat has, ad partem vivendo sensibus qui. At vim labore evertitur, ne vis invenire antiopam suscipiantur.
              </p>
            </div>

            <div className='service-item'>
              <div className='service-icon'>
                <svg width='60' height='60' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
                  <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' />
                </svg>
              </div>
              <h3 className='service-title'>FAVOURITE THEME</h3>
              <p className='service-description'>
                Lorem ipsum dolor sit amet, te vero erat has, ad partem vivendo sensibus qui. At vim labore evertitur, ne vis invenire antiopam suscipiantur.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PhotographyPage
