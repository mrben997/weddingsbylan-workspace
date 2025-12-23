import './footer.scss'
import React, { FC } from 'react'
import { ISearchParams } from '@/app/types'
import { IFooterForm, ISettingForm, ISocialLinksForm } from '@/admin-react-app/pages/settings/setting.form.types'
import { getEditModeKey } from '@/shared/components/edit.mode'
import { ImagePath } from '@/shared/config'
import Link from 'next/link'

interface IFooterProps extends ISearchParams {
  footerData?: IFooterForm[] | null
  settingData?: ISettingForm[] | null
  socialLinksData?: ISocialLinksForm[] | null
}

const Footer: FC<IFooterProps> = async (props) => {
  const footerData = props.footerData ? props.footerData[0] : undefined
  const settingData = props.settingData ? props.settingData[0] : undefined
  const socialLinksData = props.socialLinksData ? props.socialLinksData[0] : undefined

  return (
    <section className='section section-column footer-area theme-dark' style={{ backgroundImage: `url('${ImagePath}/${footerData?.BgUrl}')` }}>
      <div className='section-content' {...getEditModeKey('Footer')}>
        <div className='footer-content flex-center-center'>
          <div className='logo-area large theme-dark'>
            {/* <img src="/images/logo.png" alt="weddingsbylan-logo" /> */}
            <div className='img-bg' style={{ backgroundImage: `url('${ImagePath}/${settingData?.LogoUrl}')` }}></div>
          </div>
          <svg className='section-divider' width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
            <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' strokeWidth='1' />
            <polygon points='100,5 105,10 100,15 95,10' fill='currentColor' />
            <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' strokeWidth='1' />
          </svg>
          <ul className='footer-navs mt--3'>
            <li className='footer-nav-item'>
              <a className='typography-h6' href='/'>
                Home
              </a>
            </li>
            <li className='footer-nav-item'>
              <a className='typography-h6' href='/photography'>
                Photography
              </a>
            </li>
            <li className='footer-nav-item'>
              <a className='typography-h6' href='/makeup-and-hair'>
                Makeup &amp; Hair
              </a>
            </li>
            <li className='footer-nav-item'>
              <a className='typography-h6' href='/portfolio'>
                Portfolio
              </a>
            </li>
            <li className='footer-nav-item'>
              <a className='typography-h6' href='/contact-us'>
                Contacts Us
              </a>
            </li>
          </ul>
          <div className='social-area mt--2' {...getEditModeKey('SocialLinks')}>
            <ul className='social-list'>
              {socialLinksData?.FacebookUrl && (
                <li className='social-item'>
                  <a href={socialLinksData.FacebookUrl} target='_blank' rel='noopener noreferrer'>
                    {mapIcons.facebook}
                  </a>
                </li>
              )}
              {socialLinksData?.InstagramUrl && (
                <li className='social-item'>
                  <a href={socialLinksData.InstagramUrl} target='_blank' rel='noopener noreferrer'>
                    {mapIcons.instagram}
                  </a>
                </li>
              )}
              {socialLinksData?.PinterestUrl && (
                <li className='social-item'>
                  <a href={socialLinksData.PinterestUrl} target='_blank' rel='noopener noreferrer'>
                    {mapIcons.pinterest}
                  </a>
                </li>
              )}
              {socialLinksData?.TikTokUrl && (
                <li className='social-item'>
                  <a href={socialLinksData.TikTokUrl} target='_blank' rel='noopener noreferrer'>
                    {mapIcons.tiktok}
                  </a>
                </li>
              )}
              {socialLinksData?.YoutubeUrl && (
                <li className='social-item'>
                  <a href={socialLinksData.YoutubeUrl} target='_blank' rel='noopener noreferrer'>
                    {mapIcons.youtube}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className='copyright-area'>
          <p className='typography-body2'>copyright by weddingsbylan</p>
        </div>
      </div>
    </section>
  )
}

export default Footer

const mapIcons: Record<string, JSX.Element> = {
  facebook: (
    <svg className='svg-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512' fill='currentColor'>
      <path d='M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z' />
    </svg>
  ),
  instagram: (
    <svg className='svg-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' fill='currentColor'>
      <path d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z' />
    </svg>
  ),
  pinterest: (
    <svg className='svg-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 496 512' fill='currentColor'>
      <path d='M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z' />
    </svg>
  ),
  tiktok: (
    <svg className='svg-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' fill='currentColor'>
      <path d='M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z' />
    </svg>
  ),
  youtube: (
    <svg className='svg-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' fill='currentColor'>
      <path d='M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z' />
    </svg>
  ),
  twitter: (
    <svg className='svg-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='currentColor'>
      <path d='M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z' />
    </svg>
  )
}
