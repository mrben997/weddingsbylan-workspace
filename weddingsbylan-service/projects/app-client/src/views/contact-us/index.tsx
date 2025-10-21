import React, { FC } from 'react'
import './index.scss'

const configs = {
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdXU555oHs0BlnCtL4woinpA8u77nR2yrhl3ITeyK3UhWyO9w/viewform?embedded=true',
  mapUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d77159.73241344269!2d-75.064918643597!3d39.85053155162902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6cd95ddbef901%3A0xb2449216b83b4918!2s1048%20Coronet%20Ln%2C%20Somerdale%2C%20NJ%2008083%2C%20Hoa%20K%E1%BB%B3!5e0!3m2!1svi!2s!4v1697642505182!5m2!1svi!2s'
}

const ContactUsForm: FC = () => (
  <div className='app-container medium contact-us-form-area'>
    <iframe src={configs.formUrl} width='100%' height='1750' frameBorder={0} marginHeight={0} marginWidth={0}>
      Loading…
    </iframe>
  </div>
)

const ContactUsView: FC = () => {
  return (
    <div className='contact-us-area'>
      <div className='gg-map-area'>
        <iframe src={configs.mapUrl} title='Google Map' loading='lazy' referrerPolicy='no-referrer-when-downgrade' />
      </div>
      <ContactUsForm />
    </div>
  )
}

export default ContactUsView
