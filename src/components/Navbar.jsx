import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

// ── 導航結構 ──────────────────────────────────────────────
// page: 點擊後切換的頁面（對應 App.jsx 的 pages 鍵值）
// children: 下拉子選單（若有）
const navLinks = [
  { page: 'hero',    label: '首頁' },
  {
    page: 'about',   label: '關於彈彈',
    children: [
      { page: 'about', label: '魔術師介紹',   anchor: 'intro' },
      { page: 'about', label: '合作過的品牌', anchor: 'brands' },
    ],
  },
  {
    page: 'services', label: '服務項目',
    children: [
      { page: 'services', label: '全場景互動秀',   anchor: 'full-scene' },
      { page: 'services', label: '舞台幻術互動秀', anchor: 'stage' },
      { page: 'services', label: '魔術顧問',       anchor: 'consultant' },
      { page: 'services', label: '近距離魔術',     anchor: 'close-up' },
      { page: 'services', label: '魔術教學',       anchor: 'workshop' },
    ],
  },
  {
    page: 'highlights', label: '花絮 & 足跡',
    children: [
      { page: 'highlights', label: '花絮', anchor: 'reels' },
      { page: 'highlights', label: '足跡', anchor: 'footprint' },
    ],
  },
  { page: 'creations', label: '合作創作' },
  { page: 'contact',   label: '聯繫彈彈' },
]

// ── 桌面版單一導航項目 ────────────────────────────────────
function NavItem({ link, activePage, setActivePage }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const hasChildren = link.children?.length > 0
  const isActive = activePage === link.page ||
    link.children?.some(c => c.page === activePage)

  // 點擊外部關閉
  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const go = (page, anchor) => {
    setActivePage(page)
    setOpen(false)
    if (anchor) {
      setTimeout(() => {
        const main = document.querySelector('main')
        const el   = document.getElementById(anchor)
        if (main && el) main.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => hasChildren ? setOpen(o => !o) : go(link.page)}
        className={`flex items-center gap-1 font-cinzel text-xs tracking-[0.2em] transition-colors uppercase relative pb-1
          ${isActive ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/55 hover:text-[#1a1a1a]'}`}
      >
        {link.label}
        {hasChildren && (
          <ChevronDown size={11}
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        )}
        {isActive && !hasChildren && (
          <motion.span layoutId="tab-underline"
            className="absolute bottom-0 left-0 right-0 h-px bg-[#1a1a1a]" />
        )}
      </button>

      <AnimatePresence>
        {open && hasChildren && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 mt-2 min-w-[9rem] bg-white border border-black/10 shadow-md z-50 py-1"
          >
            {link.children.map((child, i) => (
              <button key={i}
                onClick={() => go(child.page, child.anchor)}
                className="w-full text-left px-4 py-2.5 font-cinzel text-[10px] tracking-[0.18em] text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:bg-black/4 transition-colors whitespace-nowrap">
                {child.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Navbar 主元件 ─────────────────────────────────────────
export default function Navbar({ activePage, setActivePage }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(null) // 展開中的行動子選單 index

  useEffect(() => {
    const main = document.querySelector('main')
    if (!main) return
    const fn = () => setScrolled(main.scrollTop > 60)
    main.addEventListener('scroll', fn)
    return () => main.removeEventListener('scroll', fn)
  }, [])

  const go = (page, anchor) => {
    setActivePage(page)
    setMenuOpen(false)
    setMobileOpen(null)
    if (anchor) {
      setTimeout(() => {
        const main = document.querySelector('main')
        const el   = document.getElementById(anchor)
        if (main && el) main.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
      }, 100)
    }
  }

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
          <button onClick={() => go('hero')} className="flex items-center gap-3 group">
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

          {/* 桌面版導航 */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(link => (
              <NavItem key={link.page + link.label} link={link}
                activePage={activePage} setActivePage={setActivePage} />
            ))}
            <a href="mailto:dreamarsene@gmail.com"
              className="font-cinzel ml-2 px-6 py-2.5 text-xs tracking-[0.22em] border border-black/35 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 uppercase">
              Booking
            </a>
          </div>

          {/* 行動版漢堡 */}
          <button className="md:hidden text-[#1a1a1a]/55 hover:text-[#1a1a1a] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* 行動版全螢幕選單 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }} transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 glass-nav flex flex-col items-center justify-center gap-2 overflow-y-auto py-12">

            {navLinks.map((link, i) => (
              <div key={i} className="w-full max-w-xs">
                <button
                  onClick={() => link.children ? setMobileOpen(mobileOpen === i ? null : i) : go(link.page)}
                  className={`w-full flex items-center justify-center gap-2 py-3 font-cinzel text-base tracking-[0.38em] transition-colors uppercase
                    ${activePage === link.page ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'}`}>
                  {link.label}
                  {link.children && (
                    <ChevronDown size={13}
                      className={`transition-transform duration-200 ${mobileOpen === i ? 'rotate-180' : ''}`} />
                  )}
                </button>

                <AnimatePresence>
                  {mobileOpen === i && link.children && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden">
                      {link.children.map((child, j) => (
                        <button key={j}
                          onClick={() => go(child.page, child.anchor)}
                          className="w-full py-2.5 font-cinzel text-xs tracking-[0.28em] text-[#1a1a1a]/45 hover:text-[#1a1a1a] transition-colors uppercase">
                          {child.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
