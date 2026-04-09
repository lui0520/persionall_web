import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="relative w-full h-[42vh] min-h-[320px] flex items-center justify-center overflow-hidden">

      {/* 背景：hero_06 霧化 */}
      <img
        src={`${import.meta.env.BASE_URL}images/web/hero/hero_06.jpg`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ filter: 'blur(3px) brightness(0.55) saturate(0.5)', transform: 'scale(1.04)' }}
      />
      {/* 白色半透明遮罩，讓文字更清晰 */}
      <div className="absolute inset-0 bg-white/30" />

      {/* 文字 */}
      <div className="relative z-10 text-center px-6">
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          className="font-cinzel text-[10px] tracking-[0.45em] text-white/70 uppercase block mb-4">
          About
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16,1,0.3,1] }}
          className="font-cinzel font-bold text-white leading-tight mb-5"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)', letterSpacing: '0.06em' }}>
          關於彈彈
        </motion.h2>
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-10 bg-white/35" />
          <span className="text-white/35 text-xs">✦</span>
          <div className="h-px w-10 bg-white/35" />
        </div>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="font-cormorant text-white/80 italic"
          style={{ fontSize: 'clamp(1rem, 2.2vw, 1.35rem)' }}>
          最具親和力的幽默創作魔術師，用魔術讓每一個不可能成真。
        </motion.p>
      </div>

    </section>
  )
}
