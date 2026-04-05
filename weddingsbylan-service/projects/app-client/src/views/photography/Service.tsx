import React, { FC, useEffect, useRef } from 'react'
import './service.scss'

const serviceClasses = {
  root: 'Service-root',
  grid: 'Service-grid',
  gridItem: 'Service-grid-item',
  sizer: 'Service-grid-sizer'
}

export interface IPlan {
  title: string
  price: string
  per: string
  features: string
  ribbon?: { text: string; type: 'popular' | 'new' }
  variant?: 'expert' | 'supreme'
}

const plans: IPlan[] = [
  { title: 'BUSINESS', price: '$39', per: 'per month', features: '10 projects, 100 users' },
  {
    title: 'EXPERT',
    price: '$59',
    per: 'per month',
    features: '20 projects, 200 users',
    ribbon: { text: 'POPULAR', type: 'popular' },
    variant: 'expert'
  },
  {
    title: 'SUPREME',
    price: '$79',
    per: 'per month',
    features: '15 projects, 150 users',
    ribbon: { text: 'NEW', type: 'new' },
    variant: 'supreme'
  }
]

interface IServiceItemProps {
  value: IPlan
}

const ServiceItem: FC<IServiceItemProps> = ({ value }) => {
  return (
    <div className={`card ${value.variant ?? ''}`}>
      {value.ribbon && <span className={`ribbon ${value.ribbon.type}`}>{value.ribbon.text}</span>}
      <ul>
        <li className='title'>
          <h3>{value.title}</h3>
        </li>
        {/* <li className='price'>
          <div className='value'>{value.price}</div>
          <div className='per'>{value.per}</div>
        </li> */}
        <li className='features'>
          <div dangerouslySetInnerHTML={{ __html: value.features }}></div>
        </li>
        {/* <li className='button'>
          <a href='#' className='btn'>
            READ MORE
          </a>
        </li> */}
      </ul>
    </div>
  )
}

interface IServiceProps {
  data?: IPlan[]
}

const Service: React.FC<IServiceProps> = ({ data = plans }) => {
  const gridRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let msnry: any
    let imagesLoaded: any
    let resizeObserver: ResizeObserver | null = null

    ;(async () => {
      const Masonry = (await import('masonry-layout')).default
      imagesLoaded = (await import('imagesloaded')).default

      if (!gridRef.current) return

      // init masonry
      msnry = new Masonry(gridRef.current, {
        itemSelector: `.${serviceClasses.gridItem}`,
        columnWidth: `.${serviceClasses.sizer}`,
        percentPosition: true,
        gutter: 20
      })

      // relayout after all images have loaded
      imagesLoaded(gridRef.current).on('done', () => msnry.layout())

      // optional: observe resize to trigger layout
      if ('ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(() => msnry.layout())
        resizeObserver.observe(gridRef.current)
      }
    })()

    return () => {
      if (msnry) msnry.destroy()
      if (resizeObserver && gridRef.current) resizeObserver.disconnect()
    }
  }, [])

  return (
    <div className={serviceClasses.root}>
      <div className='service'>
        {/* {data?.map((plan, index) => (
        <div key={index} className='card-wrapper'>
          <ServiceItem value={plan} />
        </div>
      ))} */}
      </div>
      <div ref={gridRef} className={serviceClasses.grid}>
        <div className={serviceClasses.sizer} />
        {data.map((item, index) => (
          <div key={index} className={serviceClasses.gridItem}>
            <ServiceItem value={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Service
