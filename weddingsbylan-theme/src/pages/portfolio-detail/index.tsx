import React, { FC } from 'react'
import './index.scss'
import Header from '../../shared/components/Layout/Header'
import Footer from '../../shared/components/Layout/Footer'

const detailImages = [
  { src: '/images/portfolio-0.jpg', alt: 'Portfolio 1' },
  { src: '/images/portfolio-1.jpg', alt: 'Portfolio 2' },
  { src: '/images/slide-0.jpg', alt: 'Portfolio 3' },
  { src: '/images/slide-1.jpg', alt: 'Portfolio 4' },
  { src: '/images/slide-2.jpg', alt: 'Portfolio 5' },
  { src: '/images/gallery-0.jpg', alt: 'Portfolio 6' },
  { src: '/images/gallery-1.jpg', alt: 'Portfolio 7' },
  { src: '/images/gallery-2.jpg', alt: 'Portfolio 8' }
]

const PortfolioDetailPage: FC = () => {
  return (
    <div className='portfolio-detail-area'>
      <Header logoTheme='theme-light' />
      <div className='portfolio-detail-header' style={{ backgroundImage: "url('/images/banner-1.jpg')" }}>
        <h1 className='typography-h1'>PORTFOLIO PINTEREST</h1>
        <div className='typography-body1'>let your business grow trough this stunning theme</div>
      </div>
      <div className='portfolio-gallery'>
        <div className='masonry-grid'>
          {detailImages.map((img, idx) => (
            <div className='masonry-item' key={idx}>
              <img src={img.src} alt={img.alt} loading='lazy' />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PortfolioDetailPage
