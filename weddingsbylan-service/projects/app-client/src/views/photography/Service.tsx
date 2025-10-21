import React from 'react'
import './service.scss'

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

interface IServiceProps {
  data?: IPlan[]
}

const Service: React.FC<IServiceProps> = ({ data = plans }) => {
  return (
    <div className='service'>
      {data?.map((plan, index) => {
        return (
          <div key={index} className='card-wrapper'>
            <div className={`card ${plan.variant ?? ''}`}>
              {plan.ribbon && <span className={`ribbon ${plan.ribbon.type}`}>{plan.ribbon.text}</span>}
              <ul>
                <li className='title'>
                  <h3>{plan.title}</h3>
                </li>
                <li className='price'>
                  <div className='value'>{plan.price}</div>
                  <div className='per'>{plan.per}</div>
                </li>
                <li className='features'>
                  <div dangerouslySetInnerHTML={{ __html: plan.features }}></div>
                </li>
                <li className='button'>
                  <a href='#' className='btn'>
                    READ MORE
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Service
