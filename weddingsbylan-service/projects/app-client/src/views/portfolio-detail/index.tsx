'use client'
import React, { FC, useEffect } from 'react'
import { defaultPortfolioItems, IPortfolioItem } from './configs'

import './index.scss'
import { getEditModeKey } from '@/shared/components/edit.mode'

interface IPortfolioDetailViewProps {
  items?: IPortfolioItem[]
}

const PortfolioDetailView: FC<IPortfolioDetailViewProps> = (props) => {
  const items = props.items || defaultPortfolioItems

  useEffect(() => {
    window?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className='portfolio-detail-area'>
      {/* <div className='portfolio-detail-header' style={{ backgroundImage: "url('/images/banner-1.jpg')" }}> */}
      {/* TODO font-size: 60px color: var(--color-primary) font-weight: 300 */}
      {/* <h1 className='typography-h1 detail-title'>PORTFOLIO PINTEREST</h1> */}
      {/* <svg className='detail-divider' width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
          <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' strokeWidth='1'></line>
          <polygon points='100,5 105,10 100,15 95,10' fill='currentColor'></polygon>
          <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' strokeWidth='1'></line>
        </svg> */}
      {/* TODO font-size: h4 color: var(--color-primary) font-weight: 300 */}
      {/* <div className='typography-body1 detail-subtitle'>let your business grow trough this stunning theme</div> */}
      {/* </div> */}

      <section className='banner'>
        <div
          className=' banner-bg'
          style={{ backgroundImage: `url('https://fleur.qodeinteractive.com/wp-content/uploads/2016/06/blog-standard-title-img-1.jpg')` }}
        />
        <div className='banner-content' {...getEditModeKey('PortfolioDetail')}>
          {/* TODO font-size: 60px color: var(--color-bg) font-weight: 300 */}
          <h1 className='typography-h1 title'>PORTFOLIO PINTEREST</h1>
          <svg className='detail-divider' width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
            <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' strokeWidth='1'></line>
            <polygon points='100,5 105,10 100,15 95,10' fill='currentColor'></polygon>
            <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' strokeWidth='1'></line>
          </svg>
          {/* TODO font-size: 25px color: var(--color-bg) */}
          <div className='typography-body1 subtitle'>Let your business grow trough this stunning theme</div>
        </div>
      </section>

      <div className='portfolio-gallery'>
        <div className='masonry-grid'>
          {items.map((img, idx) => (
            <div className='masonry-item' key={idx}>
              <img src={img.src} alt={img.alt} loading='lazy' />
              <div className='info-overlay'>
                <div className='info-content'>
                  <h3 className='title'>{img.title}</h3>
                  <span className='category'>{img.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PortfolioDetailView
