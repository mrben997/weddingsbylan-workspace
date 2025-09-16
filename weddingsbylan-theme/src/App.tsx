import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './shared/components/Layout/Layout'
import Home from './pages/home'
import Photography from './pages/photography'
import ContactUsPage from './pages/contact-us'

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/photography' element={<Photography />} />
        <Route path='/contact-us' element={<ContactUsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
