import React, { FC } from 'react'
import { ImagePath } from '@/shared/config'
import { getEditModeKey } from '@/shared/components/edit.mode'
import { IHomePhotographyForm } from '@/admin-react-app/pages/settings/setting.form.types'

// const defaultValue: Partial<IHomePhotographyForm> = {
//   Title: 'About Lan Le',
//   Content:
//     'Lan Le is a talented and passionate photographer who is dedicated to capturing the special moments of couples, families, and weddings. With an eye for detail and a creative flair, she is able to capture stunning and unique images that truly reflect the essence of her subjects. Her approach to photography is simple yet effective: she seeks to capture the natural beauty and authenticity of her couples, without any artificial posing or staging.'
// }

interface IHomePhotographyProps {
  data?: IHomePhotographyForm[] | null
}

const HomePhotography: FC<IHomePhotographyProps> = (props) => {
  const data = props.data ? props.data[0] : undefined
  return (
    <section className='section section-bg home-about-area' {...getEditModeKey('HomePhotographyImage')}>
      <div className='section-content right'>
        <div className='section-content-haft'>
          <div className='flex-column' {...getEditModeKey('HomePhotography')}>
            <h1 className='typography-h1'>{data?.Title || 'Title'}</h1>
            <svg className='section-divider' width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
              <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' strokeWidth='1' />
              <polygon points='100,5 105,10 100,15 95,10' fill='currentColor' />
              <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' strokeWidth='1' />
            </svg>
            <p className='typography-body1 mt--1'>{data?.Content || 'Content'}</p>
            <button className='app-btn app-btn-primary mt--2'>Read more</button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default HomePhotography
