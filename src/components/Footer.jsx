const navLinks = [
  { page: 'hero',       label: '首頁' },
  { page: 'about',      label: '關於彈彈' },
  { page: 'services',   label: '服務項目' },
  { page: 'highlights', label: '花絮 & 足跡' },
  { page: 'creations',  label: '合作創作' },
  { page: 'contact',    label: '聯繫彈彈' },
]

function go(page, setActivePage) {
  setActivePage(page)
  setTimeout(() => {
    const main = document.querySelector('main')
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' })
  }, 50)
}

export default function Footer({ setActivePage, activePage }) {
  return (
    <footer className="w-full border-t border-black/8 bg-white h-20 flex items-center">
      <div className="section-wrap w-full flex flex-col items-center gap-3">

        {/* 快捷導覽 */}
        <nav className="flex flex-wrap justify-center gap-x-7 gap-y-1">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => go(link.page, setActivePage)}
              className={`font-cinzel text-[10px] tracking-[0.22em] uppercase transition-colors
                ${activePage === link.page
                  ? 'text-[#1a1a1a]'
                  : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a]/80'}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* 版權 */}
        <p className="font-cinzel text-[9px] tracking-[0.22em] text-[#1a1a1a]/25 uppercase">
          © {new Date().getFullYear()} Arsene Hsiao
        </p>

      </div>
    </footer>
  )
}
