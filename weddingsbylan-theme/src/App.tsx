import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './shared/components/Layout/Layout'
import Home from './pages/home'
import Photography from './pages/photography'
import ContactUsPage from './pages/contact-us'
import PortfolioView from './pages/portfolio'
import MakeupAndHairPage from './pages/makeup-and-hair'
import PortfolioDetailView from './pages/portfolio-detail'

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/photography' element={<Photography />} />
        <Route path='/makeup-and-hair' element={<MakeupAndHairPage />} />
        <Route path='/portfolio' element={<PortfolioView />} />
        <Route path='/portfolio-detail' element={<PortfolioDetailView />} />
        <Route path='/contact-us' element={<ContactUsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
