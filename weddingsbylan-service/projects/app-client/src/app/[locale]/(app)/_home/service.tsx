import { IServiceForm } from '@/admin-react-app/pages/settings/setting.form.types'
import { getEditModeKey } from '@/shared/components/edit.mode'
import React, { FC } from 'react'

const defaultValue: Partial<IServiceForm> = {
  Title: 'Our Services',
  Content:
    'At WeddingsByLan, we offer a range of services to help you create the perfect wedding day. From photography and makeup to hair styling and planning, we have everything you need to make your special day unforgettable. Our team of experienced professionals is dedicated to providing you with the highest quality service and support, ensuring that every detail is taken care of.'
}

interface IHomeServiceProps {
  data?: IServiceForm[] | null
}

const HomeService: FC<IHomeServiceProps> = (props) => {
  const data = props.data ? props.data[0] : undefined
  return (
    <section className='section section-bg' {...getEditModeKey('HomeMakeupAndHairImage')}>
      <div className='section-content left'>
        <div className='section-content-haft'>
          <div className='flex-column' {...getEditModeKey('HomeMakeupAndHair')}>
            <h5 className='typography-h1'>{data?.Title || defaultValue.Title}</h5>
            <svg className='section-divider' width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
              <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' strokeWidth='1' />
              <polygon points='100,5 105,10 100,15 95,10' fill='currentColor' />
              <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' strokeWidth='1' />
            </svg>
            <p className='typography-body1 mt--1'>{data?.Content || defaultValue.Content}</p>
            <button className='app-btn app-btn-primary mt--2'>Read more</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeService
