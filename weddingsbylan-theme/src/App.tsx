import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './shared/components/Layout/Layout'
import Home from './pages/home'
import Photography from './pages/photography'
import ContactUsPage from './pages/contact-us'
import PortfolioPage from './pages/portfolio'
import MakeupAndHairPage from './pages/makeup-and-hair'
import PortfolioDetailPage from './pages/portfolio-detail'

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/photography' element={<Photography />} />
        <Route path='/makeup-and-hair' element={<MakeupAndHairPage />} />
        <Route path='/portfolio' element={<PortfolioPage />} />
        <Route path='/portfolio-detail' element={<PortfolioDetailPage />} />
        <Route path='/contact-us' element={<ContactUsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
