import { motion } from 'framer-motion'
import Frame from './Frame'

const ctr = { hidden: {}, show: { transition: { staggerChildren: 0.13 } } }
const up  = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: [0.16,1,0.3,1] } } }
const fd  = { hidden: { opacity: 0 },         show: { opacity: 1,  transition: { duration: 1.2 } } }


export default function Hero({ setActivePage }) {
  return (
    <section id="hero" className="relative w-full min-h-[calc(100vh-5rem)] overflow-hidden bg-white">

      <motion.div variants={ctr} initial="hidden" animate="show"
        className="relative z-10 min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row items-center">

        {/* ═══ LEFT: Slogan ═══ */}
        <div className="flex-1 flex flex-col justify-center px-16 md:px-24 lg:px-32 py-20 text-center lg:text-left order-2 lg:order-1">

          <motion.span variants={up}
            className="font-cinzel text-[10px] tracking-[0.38em] text-[#1a1a1a]/40 uppercase mb-6 block">
            Magician · Director · Creator
          </motion.span>

          <motion.h1 variants={up}
            className="font-cinzel font-bold text-[#1a1a1a] leading-tight mb-4"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}>
            人生就像魔術，<br />需要一點彈性
          </motion.h1>

          <motion.p variants={up}
            className="font-cormorant text-[#1a1a1a]/50 italic mb-10"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
            最具親和力的幽默創作魔術師
          </motion.p>

          {/* CTAs */}
          <motion.div variants={up}
            className="flex flex-wrap justify-center lg:justify-start gap-4 mb-14">
            <button onClick={() => setActivePage('experience')}
              className="font-cinzel px-10 py-3.5 text-[11px] tracking-[0.38em] uppercase bg-[#1a1a1a] text-white font-semibold rounded-full hover:bg-[#374151] transition-all duration-300">
              查看經歷
            </button>
            <button onClick={() => setActivePage('contact')}
              className="font-cinzel px-10 py-3.5 text-[11px] tracking-[0.38em] uppercase border border-black/30 text-[#1a1a1a]/70 rounded-full hover:bg-black/5 hover:border-black hover:text-[#1a1a1a] transition-all duration-300">
              合作洽談
            </button>
          </motion.div>

        </div>

        {/* ═══ RIGHT: Image ═══ */}
        <motion.div variants={fd}
          className="w-full lg:w-[48%] xl:w-[52%] shrink-0 order-1 lg:order-2">
          <Frame
            src={`${import.meta.env.BASE_URL}images/web/hero_05.jpg`}
            alt="彈彈"
            width="100%"
            height="clamp(340px, 100vh, 100vh)"
            offsetY={-5}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent pointer-events-none" />
          </Frame>
        </motion.div>

      </motion.div>

    </section>
  )
}
