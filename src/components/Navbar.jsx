import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { page: 'about',       label: 'About' },
  { page: 'experience',  label: 'Experience' },
  { page: 'performance', label: 'Performance' },
  { page: 'creations',   label: 'Creations' },
  { page: 'shows',       label: 'Shows' },
  { page: 'teaching',    label: 'Teaching' },
  { page: 'contact',     label: 'Contact' },
]

export default function Navbar({ activePage, setActivePage }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const main = document.querySelector('main')
    if (!main) return
    const fn = () => setScrolled(main.scrollTop > 60)
    main.addEventListener('scroll', fn)
    return () => main.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="section-wrap flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => setActivePage('hero')} className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 shrink-0 border border-black/20 group-hover:border-black/50 transition-colors overflow-hidden">
              <img src={`${import.meta.env.BASE_URL}images/web/hero_01.jpg`} alt="彈彈"
                className="w-full h-full object-cover object-top" />
            </div>
            <div className="leading-none">
              <span className="font-cinzel text-base font-bold text-gold-gradient tracking-widest block">彈彈</span>
              <span className="font-cinzel text-[10px] tracking-[0.28em] text-[#1a1a1a]/40 group-hover:text-[#1a1a1a]/60 transition-colors uppercase block mt-0.5">
                Arsene Hsiao
              </span>
            </div>
          </button>

          {/* Desktop tabs */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button key={link.page} onClick={() => setActivePage(link.page)}
                className={`font-cinzel text-xs tracking-[0.2em] transition-colors uppercase relative pb-1
                  ${activePage === link.page
                    ? 'text-[#1a1a1a]'
                    : 'text-[#1a1a1a]/55 hover:text-[#1a1a1a]'
                  }`}>
                {link.label}
                {activePage === link.page && (
                  <motion.span layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#1a1a1a]" />
                )}
              </button>
            ))}
            <a href="mailto:dreamarsene@gmail.com"
              className="font-cinzel ml-2 px-6 py-2.5 text-xs tracking-[0.22em] border border-black/35 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 uppercase">
              Booking
            </a>
          </div>

          {/* Mobile */}
          <button className="md:hidden text-[#1a1a1a]/55 hover:text-[#1a1a1a] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }} transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 glass-nav flex flex-col items-center justify-center gap-8">
            {navLinks.map(link => (
              <button key={link.page}
                onClick={() => { setActivePage(link.page); setMenuOpen(false) }}
                className={`font-cinzel text-base tracking-[0.38em] transition-colors uppercase
                  ${activePage === link.page ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'}`}>
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
