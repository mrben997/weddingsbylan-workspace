import React, { FC, useEffect } from 'react'
import './index.scss'
import Header from '../../shared/components/Layout/Header'
import Footer from '../../shared/components/Layout/Footer'

const detailImages = [
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

const PortfolioDetailPage: FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  return (
    <div className='portfolio-detail-area'>
      <Header logoTheme='theme-light' />
      <div className='portfolio-detail-header' style={{ backgroundImage: "url('/images/banner-1.jpg')" }}>
        {/* TODO font-size: 60px color: var(--color-primary) font-weight: 300 */}
        <h1 className='typography-h1 detail-title'>PORTFOLIO PINTEREST</h1>
        <svg className='detail-divider' width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
          <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' stroke-width='1'></line>
          <polygon points='100,5 105,10 100,15 95,10' fill='currentColor'></polygon>
          <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' stroke-width='1'></line>
        </svg>
        {/* TODO font-size: h4 color: var(--color-primary) font-weight: 300 */}
        <div className='typography-body1 detail-subtitle'>let your business grow trough this stunning theme</div>
      </div>
      <div className='portfolio-gallery'>
        <div className='masonry-grid'>
          {detailImages.map((img, idx) => (
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
      <Footer />
    </div>
  )
}

export default PortfolioDetailPage
