'use client'
import { useMediaQuery } from '@mui/material'
import React, { FC, PropsWithChildren, useMemo } from 'react'

interface ICustomSwiperSlideProps extends PropsWithChildren {
  className?: string
  imageUrl?: string
  imageMobileUrl?: string
  logoClass?: string
}

const CustomSwiperSlide: FC<ICustomSwiperSlideProps> = (props) => {
  const isMobile = useMediaQuery('(max-width:768px)')

  const imageUrl = useMemo(() => {
    if (isMobile && props.imageMobileUrl) return props.imageMobileUrl
    return props.imageUrl
  }, [props.imageUrl, props.imageMobileUrl, isMobile])

  const mapProps: Record<string, any> = {}
  if (imageUrl) {
    mapProps['data-parallax-bg'] = imageUrl
    mapProps['data-parallax-minor'] = '.section'
  }
  if (props.logoClass) {
    mapProps['data-logo-class'] = props.logoClass
  }

  return (
    <div className={['swiper-slide', props.className].filter(Boolean).join(' ')} {...mapProps}>
      {props.children}
    </div>
  )
}

export default CustomSwiperSlide
