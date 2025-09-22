import { IHomePortfolioForm } from '@/admin-react-app/pages/settings/setting.form.types'
import { getEditModeKey } from '@/shared/components/edit.mode'
import { ImagePath } from '@/shared/config'
import { FC } from 'react'

interface IHomePortfolioProps {
  portfolioData?: IHomePortfolioForm[] | null
  portfolioItems?: IHomePortfolioForm[]
}

const HomePortfolio: FC<IHomePortfolioProps> = ({ portfolioItems, portfolioData }) => {
  const data = portfolioData ? portfolioData[0] : undefined
  return (
    <section className='section section-bg' {...getEditModeKey('HomePortfolioImage')}>
      <div className='section-content center'>
        <div {...getEditModeKey('HomePortfolio')}>
          <h1 className='typography-h2'>{data?.Title || 'Default Title'}</h1>
          <svg className='section-divider' width='200' height='20' viewBox='0 0 200 20' xmlns='http://www.w3.org/2000/svg'>
            <line x1='0' y1='10' x2='85' y2='10' stroke='currentColor' strokeWidth='1' />
            <polygon points='100,5 105,10 100,15 95,10' fill='currentColor' />
            <line x1='115' y1='10' x2='200' y2='10' stroke='currentColor' strokeWidth='1' />
          </svg>
          <p className='typography-body1 mt--1 mb--1'>{data?.Description || 'Default Description'}</p>
        </div>
        <div className='app-container medium section-portfolio-area' {...getEditModeKey('HomePortfolioItems')}>
          {portfolioItems?.map((item, i) => (
            <div key={i.toString()} className='item'>
              <img src={`${ImagePath}/${item.ImageUrl}`} alt='album' />
            </div>
          ))}
        </div>
        <button className='app-btn app-btn-primary mt--2'>Read more</button>
      </div>
    </section>
  )
}

export default HomePortfolio
