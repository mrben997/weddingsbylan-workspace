'use client'
import React, { FC, useMemo, useState } from 'react'
import '../../shared/styled/portfolio.scss'

export interface IPortfolioItem {
  id: number
  src: string
  title: string
  desc: string
  category: string
}

export interface IPortfolioProps {
  data: IPortfolioItem[]
}

const PortfolioView: FC<IPortfolioProps> = (props) => {
  const tabs = ['All', 'Weddings', 'Engagements', 'Portraits', 'Events']
  const [active, setActive] = useState('All')

  // only show items that match active tab (or all)
  const filtered = useMemo(() => (active === 'All' ? props.data : props.data.filter((i) => i.category === active)), [active, props.data])

  return (
    <div className='portfolio-view-area'>
      <h2 className='typography-h2'>Portfolio</h2>
      <p className='typography-body1 text-italic'>Daily moments turned into timeless portraits</p>

      <div className='tab-filter'>
        <div className='tab-list'>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-item ${tab === active ? 'active' : ''}`}
              type='button'
              onClick={() => {
                if (tab !== active) setActive(tab)
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className='gallery-view-grid'>
        {filtered.map((item) => (
          <a className='portfolio-view-item' key={item.id} href={`/portfolio/${item.id}`}>
            <img src={item.src} alt={item.title} loading='lazy' />
            <div className='portfolio-view-info'>
              <h3 className='typography-h6'>{item.title}</h3>
              <p className='typography-body2'>{item.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default PortfolioView
