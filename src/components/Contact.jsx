import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'

const FbIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const IgIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)
const YtIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
)

const links = [
  { Icon: FbIcon, label: 'Facebook',  value: 'ArseneHsiao',           href: 'https://www.facebook.com/ArseneHsiao/' },
  { Icon: IgIcon, label: 'Instagram', value: '@arsenehsiao',           href: 'https://www.instagram.com/arsenehsiao/' },
  { Icon: YtIcon, label: 'YouTube',   value: 'Arsene Hsiao',           href: 'https://goo.gl/glwn23' },
  { Icon: Mail,   label: 'Email',     value: 'dreamarsene@gmail.com',  href: 'mailto:dreamarsene@gmail.com' },
  { Icon: Phone,  label: 'Tel',       value: '+886 972-735-886',       href: 'tel:+886972735886' },
]

export default function Contact() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-24 md:py-32 w-full">
      <div className="section-wrap">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="section-label mb-5">Get In Touch</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title text-gold-gradient mt-4">聯絡洽談</motion.h2>
          <div className="gold-divider" />
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-cormorant text-[#1a1a1a]/60 text-xl italic mt-8 max-w-lg mx-auto leading-relaxed">
            無論是演出邀約、電視節目顧問、企業活動客製化，<br />
            或任何形式的合作，歡迎聯繫洽談。
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-start max-w-4xl mx-auto">

          {/* Contact list */}
          <div className="flex-1 w-full space-y-px">
            {links.map((link, i) => (
              <motion.a key={i} href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.08 }}
                className="flex items-center gap-5 glass-card border-black/10 px-7 py-5 group hover:border-black/30 hover:bg-black/3 transition-all duration-300"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-black/15 group-hover:border-black group-hover:bg-black/5 transition-all duration-300">
                  <span className="text-[#374151]/60 group-hover:text-[#1a1a1a] transition-colors">
                    <link.Icon size={16} />
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-cinzel text-[9px] tracking-[0.32em] text-[#1a1a1a]/35 uppercase mb-0.5">{link.label}</div>
                  <div className="text-[#1a1a1a]/78 text-[15px] group-hover:text-[#1a1a1a] transition-colors">{link.value}</div>
                </div>
                <span className="text-[#1a1a1a]/25 group-hover:text-[#1a1a1a] transition-colors text-lg">→</span>
              </motion.a>
            ))}
          </div>

          {/* Quote card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="lg:w-72 shrink-0 glass-card border-black/10 p-8 text-center"
          >
            {/* Portrait */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute -inset-[2px] border border-black/25" />
              <span className="frame-corner tl" style={{ width: 10, height: 10 }} />
              <span className="frame-corner tr" style={{ width: 10, height: 10 }} />
              <span className="frame-corner bl" style={{ width: 10, height: 10 }} />
              <span className="frame-corner br" style={{ width: 10, height: 10 }} />
              <img src={`${import.meta.env.BASE_URL}images/web/hero_01.jpg`} alt="彈彈"
                className="w-full h-full object-cover object-top" />
            </div>

            <p className="font-cinzel text-[#1a1a1a] font-bold text-sm tracking-widest mb-1">彈彈</p>
            <p className="font-cinzel text-[#1a1a1a]/38 text-[9px] tracking-[0.28em] uppercase mb-7">Arsene Hsiao</p>

            <div className="w-8 h-px bg-black/20 mx-auto mb-6" />

            <p className="font-cormorant text-[#1a1a1a]/65 text-lg italic leading-loose mb-4">
              「彈走不順心，<br />彈來好運氣」
            </p>
            <p className="font-cinzel text-[#1a1a1a]/22 text-[8px] tracking-[0.28em] uppercase leading-loose">
              Flick Away The Gloom,<br />Bring In The Bloom.
            </p>
          </motion.div>

        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }}
          className="mt-24 pt-8 border-t border-black/8 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-black/15" />
            <span className="text-black/18 text-xs">✦</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-black/15" />
          </div>
          <p className="font-cinzel text-[#1a1a1a]/30 text-[9px] tracking-[0.38em] uppercase">
            © 2025 魔術師 彈彈 · Magician Arsene Hsiao · All Rights Reserved
          </p>
        </motion.div>

      </div>
    </section>
  )
}
