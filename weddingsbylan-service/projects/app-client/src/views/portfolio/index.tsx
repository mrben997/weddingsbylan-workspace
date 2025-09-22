'use client'
import React, { useMemo, useState } from 'react'
import '../../shared/styled/portfolio.scss'

const PortfolioView = () => {
  const tabs = ['All', 'Weddings', 'Engagements', 'Portraits', 'Events']
  const [active, setActive] = useState('All')
  const items = useMemo(
    () =>
      [...Array(12)].map((_, idx) => ({
        id: idx,
        src: `/images/portfolio-${idx % 6}.jpg`,
        title: `Wedding Shoot ${idx + 1}`,
        desc: 'Capturing the essence of love and joy.',
        category: tabs[(idx % (tabs.length - 1)) + 1],
      })),
    [],
  )

  // only show items that match active tab (or all)
  const filtered = useMemo(() => (active === 'All' ? items : items.filter((i) => i.category === active)), [active, items])

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
              onClick={() => { if (tab !== active) setActive(tab) }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className='gallery-view-grid'>
        {filtered.map((item) => (
          <div className='portfolio-view-item' key={item.id}>
            <img src={item.src} alt={item.title} loading='lazy' />
            <div className='portfolio-view-info'>
              <h3 className='typography-h6'>{item.title}</h3>
              <p className='typography-body2'>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PortfolioView
