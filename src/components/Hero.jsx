import { motion } from 'framer-motion'

const ctr = { hidden: {}, show: { transition: { staggerChildren: 0.13 } } }
const up  = { hidden: { opacity: 0, y: 44 }, show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: [0.16,1,0.3,1] } } }
const fd  = { hidden: { opacity: 0 },         show: { opacity: 1,  transition: { duration: 1.2 } } }

const stats = [
  { num: '17+',  label: '年魔術資歷' },
  { num: '5000+',label: '人公演規模' },
  { num: '3',    label: '大洲足跡'   },
  { num: '10+',  label: '國際電視節目' },
]

export default function Hero({ setActivePage }) {
  return (
    <section id="hero" className="relative w-full min-h-[calc(100vh-5rem)] overflow-hidden">

      {/* ── Background (hero_06 very dark) ── */}
      <div className="absolute inset-0">
        <img src="/images/web/hero_06.jpg" alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.14) saturate(0.5)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 75% 65% at 55% 40%, rgba(201,169,75,0.07) 0%, rgba(8,8,8,0.5) 55%, rgba(8,8,8,0.97) 100%)' }} />
      </div>

      <motion.div variants={ctr} initial="hidden" animate="show"
        className="relative z-10 section-wrap min-h-[calc(100vh-5rem)] flex flex-col justify-center pt-12 pb-16">

        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20 w-full">

          {/* ═══ LEFT: Photos ═══ */}
          <motion.div variants={up} className="shrink-0 flex flex-col items-center gap-3 w-full lg:w-auto">

            {/* hero_05 — main feature image with gold frame */}
            <div className="relative">
              {/* Outer glow border */}
              <div className="absolute -inset-[3px] border border-[#c9a94b]/40" />
              <div className="absolute -inset-[7px] border border-[#c9a94b]/15" />
              {/* Image */}
              <div className="relative overflow-hidden" style={{ width: 'clamp(260px, 38vw, 420px)', aspectRatio: '4/3' }}>
                <img src="/images/web/hero_05.jpg" alt="舞台演出"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.92) contrast(1.08) saturate(1.05)' }} />
                {/* Dark vignette bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/55 via-transparent to-transparent" />
              </div>
              {/* Gold corner accents */}
              <span className="frame-corner tl" />
              <span className="frame-corner tr" />
              <span className="frame-corner bl" />
              <span className="frame-corner br" />
              {/* Stage label */}
              <div className="absolute bottom-3 left-4">
                <span className="font-cinzel text-[9px] tracking-[0.4em] text-[#c9a94b] uppercase opacity-80">
                  Live Performance
                </span>
              </div>
            </div>

            {/* hero_01 — portrait below, smaller */}
            <div className="relative">
              <div className="absolute -inset-[2px] border border-[#c9a94b]/30" />
              <div className="overflow-hidden" style={{ width: 'clamp(260px, 38vw, 420px)', height: '90px' }}>
                <img src="/images/web/hero_01.jpg" alt="彈彈"
                  className="w-full object-cover object-[center_15%]"
                  style={{ filter: 'brightness(0.85) contrast(1.06)' }} />
              </div>
              <span className="frame-corner tl" />
              <span className="frame-corner tr" />
              <span className="frame-corner bl" />
              <span className="frame-corner br" />
            </div>
          </motion.div>

          {/* ═══ RIGHT: Typography ═══ */}
          <div className="flex-1 min-w-0 text-center lg:text-left">

            <motion.span variants={up} className="section-label block mb-5">
              Magician · Director · Creator
            </motion.span>

            <motion.h1 variants={up} className="shimmer-text leading-none mb-5"
              style={{ fontSize: 'clamp(5rem, 13vw, 10rem)', letterSpacing: '0.05em' }}>
              彈彈
            </motion.h1>

            <motion.div variants={fd}
              className="flex items-center gap-3 justify-center lg:justify-start mb-7">
              <div className="h-px w-8 bg-[#c9a94b]/50" />
              <span className="text-[#c9a94b]/50 text-sm">✦</span>
              <div className="h-px w-8 bg-[#c9a94b]/50" />
            </motion.div>

            <motion.blockquote variants={up}
              className="font-cormorant text-white/75 leading-relaxed italic mb-2"
              style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)' }}>
              人生這場魔術，要留一點彈性
            </motion.blockquote>
            <motion.p variants={up}
              className="font-cinzel text-white/30 text-[10px] tracking-[0.32em] uppercase mb-11">
              In Life's Magic Play, Keep It Flexible Each Day.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={up}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <button onClick={() => setActivePage('experience')}
                className="font-cinzel px-9 py-3.5 text-[11px] tracking-[0.38em] uppercase bg-[#c9a94b] text-black font-semibold hover:bg-[#e8c96d] transition-all duration-300 hover:shadow-[0_0_28px_rgba(201,169,75,0.45)]">
                查看經歷
              </button>
              <button onClick={() => setActivePage('contact')}
                className="font-cinzel px-9 py-3.5 text-[11px] tracking-[0.38em] uppercase border border-[#c9a94b]/45 text-[#c9a94b]/80 hover:bg-[#c9a94b]/10 hover:border-[#c9a94b] hover:text-[#c9a94b] transition-all duration-300">
                合作洽談
              </button>
            </motion.div>

            {/* Stats bar */}
            <motion.div variants={fd}
              className="grid grid-cols-2 sm:grid-cols-4 border border-[#c9a94b]/20">
              {stats.map((s, i) => (
                <div key={i}
                  className="py-5 px-4 text-center border-r border-[#c9a94b]/15 last:border-r-0 hover:bg-[#c9a94b]/6 transition-colors">
                  <div className="font-cinzel text-2xl font-bold text-gold-gradient mb-1">{s.num}</div>
                  <div className="font-cinzel text-[9px] tracking-[0.25em] text-white/55 uppercase">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </motion.div>

    </section>
  )
}
