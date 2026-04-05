import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import ParticleCanvas from './components/ParticleCanvas'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Performance from './components/Performance'
import Creations from './components/Creations'
import ShowList from './components/ShowList'
import Teaching from './components/Teaching'
import Contact from './components/Contact'

const pages = {
  hero:        Hero,
  about:       About,
  experience:  Experience,
  performance: Performance,
  creations:   Creations,
  shows:       ShowList,
  teaching:    Teaching,
  contact:     Contact,
}

export default function App() {
  const [activePage, setActivePage] = useState('hero')
  const ActivePage = pages[activePage]

  return (
    <div className="relative bg-white min-h-screen overflow-x-hidden">
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
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
