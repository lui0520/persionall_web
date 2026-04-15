import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import ParticleCanvas from './components/ParticleCanvas'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import HighlightsPage from './pages/HighlightsPage'
import Creations from './components/Creations'
import Contact from './components/Contact'
import Footer from './components/Footer'
import IntroAnimation from './components/IntroAnimation'

const pages = {
  hero:       Hero,
  about:      AboutPage,      // 關於彈彈（含 魔術師介紹 / 合作品牌）
  services:   ServicesPage,   // 服務項目（含所有服務子項）
  highlights: HighlightsPage, // 花絮 & 足跡（含 花絮 / 足跡）
  creations:  Creations,      // 合作創作
  contact:    Contact,        // 聯繫彈彈
}

export default function App() {
  const [activePage, setActivePage] = useState('hero')
  const [showIntro, setShowIntro] = useState(true)
  const ActivePage = pages[activePage]

  return (
    <div className="relative bg-white min-h-screen overflow-x-hidden">
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      <ParticleCanvas />
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="fixed top-20 left-0 right-0 bottom-0 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <ActivePage setActivePage={setActivePage} />
            <Footer setActivePage={setActivePage} activePage={activePage} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
