import React, { FC, useEffect } from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import Header from '../../shared/components/Layout/Header'
import Footer from '../../shared/components/Layout/Footer'
import { defaultPortfolioItems, IPortfolioItem } from './configs'

import './index.scss'

interface IOurTeamViewProps {
  items?: IPortfolioItem[]
}

const OurTeamView: FC<IOurTeamViewProps> = (props) => {
  const items = props.items || defaultPortfolioItems

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className='our-team-area'>
      <Header logoTheme='theme-light' />

      <section className='banner'>
        <div className=' banner-content'>
          {/* TODO font-size: 40px color: var(--color-primary) font-weight: 400 */}
          <h1 className='typography-h2 title'>OUR AMAZING TEAM</h1>
          <svg className='detail-divider' width='120' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
            <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' stroke-width='1'></line>
            <polygon points='100,5 105,10 100,15 95,10' fill='currentColor'></polygon>
            <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' stroke-width='1'></line>
          </svg>
          {/* TODO font-size: 18px color */}
          <div className='typography-body1 subtitle'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sollicitudin, tellus vitae condimentum egestas, libero dolor auctor tellusconsequat
            ipsutis sem niuis sed odio sit amet.
          </div>
        </div>
      </section>

      <div className='our-team'>
        <div className='masonry-grid'>
          {items.map((img, idx) => (
            <div className='masonry-item' key={idx}>
              <div className='item-content'>
                <img src={img.src} alt={img.alt} loading='lazy' />
                <div className='info-overlay'>
                  <div className='info-content'>
                    <h3 className='name'>{img.name}</h3>
                    <span className='position'>{img.position}</span>
                    <div className='link'>
                      <a href='/our-team' className='facebook'>
                        <FaFacebookF />
                      </a>
                      <a href='/our-team' className='twitter'>
                        <FaTwitter />
                      </a>
                      <a href='/our-team' className='linkedin'>
                        <FaLinkedinIn />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default OurTeamView
