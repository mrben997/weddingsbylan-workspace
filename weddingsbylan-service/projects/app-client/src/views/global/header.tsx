'use client'
import './header.scss'
import { ISearchParams } from '@/app/types'
import { ISettingForm } from '@/admin-react-app/pages/settings/setting.form.types'
import React, { FC, useEffect, useRef, useState } from 'react'
import { getEditModeKey } from '@/shared/components/edit.mode'
import { ImagePath } from '@/shared/config'

export interface IAppHeaderProps extends ISearchParams {
  data?: ISettingForm[] | null
  // locale: string
}

const AppHeader: FC<IAppHeaderProps> = (props) => {
  const data = props.data ? props.data[0] : undefined

  const [isActive, setIsActive] = useState(false)
  const menuAreaRef = useRef<HTMLDivElement | null>(null)
  const menuBtnRef = useRef<HTMLButtonElement | null>(null)
  const menuToggerRef = useRef<HTMLDivElement | null>(null)

  // Close when clicking outside
  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null
      if (!menuAreaRef.current) return
      if (menuAreaRef.current.contains(target)) return
      setIsActive(false)
    }

    document.addEventListener('click', handleDocClick)
    return () => document.removeEventListener('click', handleDocClick)
  }, [])

  // Optional: close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsActive(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className='header-area'>
      <div className='header-content'>
        <div className='header-section header-left'>
          <div className='logo-area theme-dark' {...getEditModeKey('Setting')}>
            <div className='img-bg' style={{ backgroundImage: `url('${ImagePath}/${data?.LogoUrl}')` }}></div>
          </div>
        </div>
        <div ref={menuAreaRef} className={`app-menu-area ${isActive ? 'active' : ''}`}>
          <button
            ref={menuBtnRef}
            onClick={(e) => {
              e.stopPropagation()
              setIsActive((s) => !s)
            }}
            className='app-menu-btn fixed'
            aria-label='Toggle Menu'
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div ref={menuToggerRef} className='app-menu-togger'>
            <ul className='app-menu-navs'>
              {defaultNavProps.Navs?.map((nav, index) => (
                <li className='app-menu-nav' style={{ transitionDelay: `${(index + 1) * 100}ms` }} key={nav.Url}>
                  <a href={nav.Url} className='typography-h5'>
                    {nav.Title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
export default AppHeader
