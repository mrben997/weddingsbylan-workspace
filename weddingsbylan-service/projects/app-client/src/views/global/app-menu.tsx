'use client'
import { FC, useState, useEffect, useRef } from 'react'

const AppMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

  const defaultNavs = [
    { Title: 'Home', Url: '/' },
    { Title: 'Photography', Url: '/photography' },
    { Title: 'Makeup & Hair', Url: '/makeup-and-hair' },
    { Title: 'Portfolio', Url: '/portfolio' },
    { Title: 'Contacts Us', Url: '/contact-us' }
  ]

  return (
    <div className={`app-menu-area ${isOpen ? 'active' : ''}`} ref={menuRef}>
      <button
        className='app-menu-btn fixed'
        aria-label='Toggle Menu'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className='app-menu-togger'>
        <ul className='app-menu-navs'>
          {defaultNavs.map((nav, index) => (
            <li
              className='app-menu-nav'
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              key={nav.Url}
            >
              <a href={nav.Url} className='typography-h5'>
                {nav.Title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AppMenu
