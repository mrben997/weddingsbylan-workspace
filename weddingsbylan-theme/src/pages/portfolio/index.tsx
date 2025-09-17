import React, { FC, useState, useMemo } from 'react'
import Header from '../../shared/components/Layout/Header'
import Footer from '../../shared/components/Layout/Footer'
import DividerIcon from '../../shared/components/divider-icon'
import ImageSlider from '../../shared/components/ImageSlider'
import TabFilter from '../../shared/components/TabFilter'
import { Link } from 'react-router-dom'
import './index.scss'

const PortfolioPage: FC = () => {
  const [activeTab, setActiveTab] = useState('ALL')

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
  const filteredImages = useMemo(() => {
    if (activeTab === 'ALL') {
      return portfolioImages
    }
    return portfolioImages.filter((image) => image.category === activeTab)
  }, [activeTab])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

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
        <ImageSlider
          images={portfolioImages}
          className='portfolio-slider'
          autoplay={true}
          navigation={true}
          pagination={true}
          loop={true}
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={false}
        />

        {/* Gallery Style Grid with Tabs */}
        <div className='gallery-section'>
          <h2 className='section-title typography-h2'>Gallery Highlights</h2>
          {/* Tab Filter */}
          <TabFilter tabs={categories} activeTab={activeTab} onTabChange={handleTabChange} className='portfolio-tabs' />
          {/* Filtered Image Grid */}
          <div className='gallery-grid'>
            {filteredImages.length === 0 ? (
              <div className='empty-gallery'>
                <div className='empty-message typography-h6'>No images found for this category.</div>
                <div className='empty-description typography-body1'>Please select another tab to view more images.</div>
              </div>
            ) : (
              filteredImages.map((image, idx) => (
                <Link to='/portfolio-detail' className='gallery-item' key={idx}>
                  <div className='gallery-img-container'>
                    <img src={image.src} alt={image.alt} loading='lazy' />
                  </div>
                  <div className='gallery-info'>
                    <div className='gallery-title typography-subtitle1'>{image.title}</div>
                    <div className='gallery-desc typography-body1'>{image.description}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PortfolioPage
