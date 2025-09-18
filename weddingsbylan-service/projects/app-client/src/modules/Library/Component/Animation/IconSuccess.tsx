import { Box, styled } from '@mui/material'
import React, { FC } from 'react'

import './IconSuccess.css'

export const IconSuccess: FC = () => {
  return (
    <Wrap>
      <svg width='400' height='400'>
        <circle
          fill='none'
          stroke='#68E534'
          strokeWidth='20'
          cx='200'
          cy='200'
          r='190'
          strokeLinecap='round'
          transform='rotate(-90 200 200)'
          className='circle'
        />
        <polyline
          fill='none'
          stroke='#68E534'
          points='88,214 173,284 304,138'
          strokeWidth='24'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='tick'
        />
      </svg>
    </Wrap>
  )
}
export default IconSuccess

const Wrap = styled(Box)({
  marginBottom: '-36px',
  '& svg': { transform: 'scale(0.5)' },
  '& circle': {
    strokeDasharray: '1194',
    strokeDashoffset: '1194',
    animation: 'dc 1s ease-in-out',
    animationFillMode: 'forwards'
  },
  '& polyline': {
    strokeDasharray: '350',
    strokeDashoffset: '350',
    animation: 'dt 0.6s ease-out',
    animationFillMode: 'forwards',
    animationDelay: '0.95s'
  }
})
