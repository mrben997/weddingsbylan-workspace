'use server'
import '@/shared/styled/makeup-and-hair.scss'
import React, { FC } from 'react'
import { IPageProps } from '@/app/types'
import { ImagePath } from '@/shared/config'
import { settingSService } from '@/services/setting.service'
import { getEditModeKey } from '@/shared/components/edit.mode'

const Page: FC<IPageProps> = async (props) => {
  const p = await props.params
  const locale = p.locale ?? 'vn'
  const pageData = await settingSService.getSettingdata(locale ?? 'vn', ['Global', 'MakeupAndHair'], ['Setting', 'MahAbout', 'MahAboutImage', 'Footer'])

  const dataSetting = pageData?.getSingleData('Setting')
  const dataMahAbout = pageData?.getSingleData('MahAbout')
  const dataMahAboutImage = pageData?.getSingleData('MahAboutImage')

  return (
    <>
      <div className='makeup-and-hair-area'>
        <div className='hero-section flex-row items-center app-container'>
          <div className='image-container flex-1' {...getEditModeKey('MahAboutImage')}>
            <img src={`${ImagePath}/${dataMahAboutImage?.ImageUrl}`} alt='Professional makeup artist Lan Le with makeup brushes' className='hero-image' />
          </div>
          <div className='content-container flex-1 p--4' {...getEditModeKey('MahAbout')}>
            <div className='logo-area theme-dark'>
              {/* <img src="images/logo.png" alt="weddingsbylan-logo" /> */}
              <div className='img-bg' style={{ backgroundImage: `url('${ImagePath}/${dataSetting?.LogoUrl}')` }}></div>
            </div>
            <div className='about-section'>
              <h2 className='typography-h2 text-main mb--3'>{dataMahAbout?.Title || 'About title'}</h2>
              <p className='typography-body1 text-muted'>{dataMahAbout?.SubTitle || 'About subtitle'}</p>
              <p className='typography-body1 text-muted'>{dataMahAbout?.Content || 'About content'}</p>
            </div>
          </div>
        </div>

        <div className='services-section'>
          <div className='services-container app-container'>
            <div className='services-header text-center mb--5'>
              <div className='brand-logo-small mb--2'>
                <h3 className='typography-h3 text-primary'>Lan</h3>
              </div>
              <h2 className='typography-h1 text-main'>SERVICES</h2>
              <p className='typography-caption text-muted'>CHOOSE YOURS</p>
            </div>

            <div className='services-grid'>
              <div className='service-card'>
                <h3 className='typography-h4 text-main text-center mb--3'>Bridal by Lan Le</h3>
                <div className='service-list'>
                  <div className='service-item flex-center-between'>
                    <span className='typography-body1 text-main'>Prewedding</span>
                    <span className='typography-body1 text-primary price'>$300</span>
                  </div>
                  <div className='service-item flex-center-between'>
                    <span className='typography-body1 text-main'>Wedding</span>
                    <span className='typography-body1 text-primary price'>$350</span>
                  </div>
                  <div className='service-item flex-center-between'>
                    <span className='typography-body1 text-main'>Touchup</span>
                    <span className='typography-body1 text-primary price'>$200</span>
                  </div>
                  <div className='service-item flex-center-between'>
                    <span className='typography-body1 text-main'>Makeup</span>
                    <span className='typography-body1 text-primary price'>$175</span>
                  </div>
                  <div className='service-item flex-center-between'>
                    <span className='typography-body1 text-main'>Hair</span>
                    <span className='typography-body1 text-primary price'>$175</span>
                  </div>
                  <div className='service-note text-center p--2'>
                    <span className='typography-caption text-muted'>(starting rate)</span>
                  </div>
                  <div className='service-item flex-center-between'>
                    <span className='typography-body1 text-main'>Additional Hours (on-site)</span>
                    <span className='typography-body1 text-primary price'>$75/hr</span>
                  </div>
                </div>
              </div>

              <div className='service-card'>
                <h3 className='typography-h4 text-main text-center mb--3'>Bridesmaid & Family</h3>
                <div className='service-list'>
                  <div className='service-item flex-center-between'>
                    <span className='typography-body1 text-main'>Makeup only</span>
                    <span className='typography-body1 text-primary price'>$115</span>
                  </div>
                  <div className='service-item flex-center-between'>
                    <span className='typography-body1 text-main'>Hair only</span>
                    <span className='typography-body1 text-primary price'>$115</span>
                  </div>
                  <div className='service-note text-center p--2'>
                    <span className='typography-caption text-muted'>(starting rate)</span>
                  </div>
                  <div className='service-item flex-center-between'>
                    <span className='typography-body1 text-main'>Touchup Makeup & Hair</span>
                    <span className='typography-body1 text-primary price'>$150</span>
                  </div>
                  <div className='service-item flex-center-between'>
                    <span className='typography-body1 text-main'>Additional Hours (on-site)</span>
                    <span className='typography-body1 text-primary price'>$75/hr</span>
                  </div>
                </div>
              </div>

              <div className='service-card'>
                <h3 className='typography-h4 text-main text-center mb--3'>Additional Services</h3>
                <div className='service-list'>
                  <div className='service-item flex-center-between'>
                    <span className='typography-body1 text-main'>Faux lashes & application</span>
                    <span className='typography-body1 text-primary price'>$20</span>
                  </div>
                  <div className='service-item flex-center-between'>
                    <span className='typography-body1 text-main'>Lashes application (clients')</span>
                    <span className='typography-body1 text-primary price'>$15</span>
                  </div>
                  <div className='service-item flex-center-between'>
                    <span className='typography-body1 text-main'>Individual lashes & application</span>
                    <span className='typography-body1 text-primary price'>$25</span>
                  </div>
                  <div className='service-item flex-center-between'>
                    <span className='typography-body1 text-main'>Hair extension rental & application</span>
                    <span className='typography-body1 text-primary price'>$150</span>
                  </div>
                  <div className='service-item flex-center-between'>
                    <span className='typography-body1 text-main'>Hair extension application (clients')</span>
                    <span className='typography-body1 text-primary price'>$45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
