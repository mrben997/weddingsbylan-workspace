'use client'
import React, { useState } from 'react'
import './index.scss'
import Slider from './Slider'
import Service, { IPlan } from './Service'
import Notes, { INote } from './Notes'
import { IPhotographyConfigs } from './types'
import { photographyConfigs } from './configs'

interface IPhotographyProps {
  configs?: IPhotographyConfigs
  notes?: INote[]
  service?: IPlan[]
}

const PhotographyViewBase: React.FC<IPhotographyProps> = (props) => {
  const { configs = photographyConfigs, notes, service } = props
  const [expanded, setExpanded] = useState(false)

  return (
    <div className='photography-wrapper'>
      <main className='photography-page'>
        <section className='banner-area'>
          {/* <div className='banner-bg' style={{ backgroundImage: 'url(images/banner-0.jpg)' }}></div>
          <h2 className='typography-h1 mb--3'>Photography</h2>
          <p className='typography-subtitle1'>Welcome to the photography page. Here you can find our latest works and projects.</p> */}
          <Slider />
        </section>

        {/* About */}
        <section className='about-section'>
          <div className='about-image' style={{ backgroundImage: `url(${configs.image})` }}></div>
          <div className='about-content'>
            <h2 className='typography-h2'>{configs.title}</h2>
            <p className={`typography-h6 ${expanded ? 'expanded' : 'collapsed'}`}>{configs.description}</p>
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
          {/* <div className='services-list'>
            <div className='service-card'>
              <h3 className='typography-h5 title mb--2'>Engagements, couples photoshoots</h3>
              <p className='service-price sub-title mb--1'>(STARTS AT $425)</p>
              <p className='typography-body1 text'>
                Creating memories together, the images will reflect your love for each other. 90 minutes session 1 location, 2 outfits 150 images. High
                resolution online gallery
              </p>
              <p className='typography-body1 text'>Non local shoots will add a travel fee outside of Gloucester County</p>
            </div>
            <div className='service-card'>
              <h3 className='typography-h5 title mb--2'>Weddings PACKAGE 1</h3>
              <p className='service-price sub-title mb--1'>(STARTS AT $2900)</p>
              <p className='typography-body1 text'>
                Let me capture your genuine laughs, emotions and tears of happiness into your timeless photos. 1 photographer, 8 hours. All images in high
                resolution online gallery 2 hour engagement engagement session.
              </p>
            </div>
            <div className='service-card'>
              <h3 className='typography-h5 title mb--2'>Weddings PACKAGE 2</h3>
              <p className='service-price sub-title mb--1'>(STARTS AT $3500)</p>
              <p className='typography-body1 text'>
                Your perfect day deserves perfect memories. 1 photographer, 10 hours coverage. All images in high resolution online gallery. 2 hour engagement
                session included. Premium editing and faster delivery.
              </p>
            </div>
            <div className='service-card'>
              <h3 className='typography-h5 title mb--2'>Portrait Sessions</h3>
              <p className='service-price sub-title mb--1'>(STARTS AT $325)</p>
              <p className='typography-body1 text'>
                Individual, family or group portraits that capture personality and connections. 60 minutes session, 1 location, 100+ images. High resolution
                online gallery with print release.
              </p>
            </div>
          </div> */}

          <Service data={service} />
        </section>

        <section className='note'>
          <Notes data={notes} />
        </section>
      </main>
    </div>
  )
}

export default PhotographyViewBase
