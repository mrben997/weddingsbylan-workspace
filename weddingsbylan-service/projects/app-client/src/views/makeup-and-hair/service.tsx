import React, { FC, useEffect, useRef } from 'react'
import { IPlan } from './types'

interface IMakeupAndHairProps {
  data?: IPlan[]
  align?: 'left' | 'right' | 'center'
}

export const MakeupAndHairService: FC<IMakeupAndHairProps> = (props) => {
  const { data = [], align = 'center' } = props
  const gridRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let msnry: any
    let imagesLoaded: any
    let resizeObserver: ResizeObserver | null = null
    const gutter = 20

    ;(async () => {
      const Masonry = (await import('masonry-layout')).default
      imagesLoaded = (await import('imagesloaded')).default

      if (!gridRef.current) return

      msnry = new Masonry(gridRef.current, {
        itemSelector: '.card-wrapper',
        columnWidth: '.service-grid-sizer',
        percentPosition: true,
        gutter,
        originLeft: align !== 'right'
      })

      imagesLoaded(gridRef.current).on('done', () => msnry.layout())

      if ('ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(() => msnry.layout())
        resizeObserver.observe(gridRef.current)
      }
    })()

    return () => {
      if (msnry) msnry.destroy()
      if (resizeObserver && gridRef.current) resizeObserver.disconnect()
    }
  }, [align])

  return (
    <div ref={gridRef} className={`service service--${align} ${data.length === 2 ? 'service--two-items' : ''}`}>
      <div className='service-grid-sizer' />
      {data.map((plan, index) => (
        <div key={index} className='card-wrapper'>
          <div className={`card ${plan.variant ?? ''}`}>
            {plan.ribbon && <span className={`ribbon ${plan.ribbon.type}`}>{plan.ribbon.text}</span>}
            <ul>
              <li className='title'>
                <h3>{plan.title}</h3>
              </li>
              <li className='features'>
                <div dangerouslySetInnerHTML={{ __html: plan.features }} />
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
