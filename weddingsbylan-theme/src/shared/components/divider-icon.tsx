import React, { FC, SVGProps } from 'react'

const DividerIcon: FC<SVGProps<SVGSVGElement>> = () => (
  <svg width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
    <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' strokeWidth='1' />
    <polygon points='100,5 105,10 100,15 95,10' fill='currentColor' />
    <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' strokeWidth='1' />
  </svg>
)
export default DividerIcon
