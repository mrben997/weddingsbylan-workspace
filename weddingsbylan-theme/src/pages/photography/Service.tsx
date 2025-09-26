import React from 'react'
import './service.scss'

interface Plan {
  title: string
  price: string
  per: string
  features: string[]
  ribbon?: { text: string; type: 'popular' | 'new' }
  variant?: 'expert' | 'supreme'
}

const plans: Plan[] = [
  {
    title: 'BUSINESS',
    price: '$39',
    per: 'per month',
    features: ['10 projects', '100 users']
  },
  {
    title: 'EXPERT',
    price: '$59',
    per: 'per month',
    features: ['20 projects', '200 users'],
    ribbon: { text: 'POPULAR', type: 'popular' },
    variant: 'expert'
  },
  {
    title: 'SUPREME',
    price: '$79',
    per: 'per month',
    features: ['15 projects', '150 users'],
    ribbon: { text: 'NEW', type: 'new' },
    variant: 'supreme'
  }
]

const Service = () => {
  return (
    <div className='service'>
      {plans.map((plan, index) => (
        <div key={index} className='service__card-container'>
          <div className={`service__card ${plan.variant ? `service__card--${plan.variant}` : ''}`}>
            {plan.ribbon && <span className={`service__ribbon service__ribbon--${plan.ribbon.type}`}>{plan.ribbon.text}</span>}
            <ul>
              <li className='service__card-title'>
                <h3>{plan.title}</h3>
              </li>
              <li className='service__card-price'>
                <div className='service__price-value'>{plan.price}</div>
                <div className='service__price-per'>{plan.per}</div>
              </li>
              <li className='service__card-features'>
                {plan.features.map((feature, i) => (
                  <div key={i}>{feature}</div>
                ))}
              </li>
              <li className='service__card-button'>
                <a href='#' className='service__btn'>
                  READ MORE
                </a>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Service
