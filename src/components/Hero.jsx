import { motion } from 'framer-motion'
import Frame from './Frame'
import cfg from '../config/hero.config'

const { stagger, upDuration, fadeDuration, upY } = cfg.animation

const ctr = { hidden: {}, show: { transition: { staggerChildren: stagger } } }
const up  = { hidden: { opacity: 0, y: upY },  show: { opacity: 1, y: 0,  transition: { duration: upDuration,   ease: [0.16,1,0.3,1] } } }
const fd  = { hidden: { opacity: 0 },           show: { opacity: 1,        transition: { duration: fadeDuration } } }

export default function Hero({ setActivePage }) {
  const { text, buttons, leftPadding, fontSize, image } = cfg

  // 將 \n 轉為 <br />
  const titleLines = text.title.split('\n')

  return (
    <section id="hero" className="relative w-full min-h-[calc(100vh-5rem)] overflow-hidden bg-white">

      <motion.div variants={ctr} initial="hidden" animate="show"
        className="relative z-10 min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row items-center">

        {/* ═══ LEFT: Slogan ═══ */}
        <div
          className={`flex-1 flex flex-col justify-center ${leftPadding.vertical} text-center lg:text-left order-2 lg:order-1`}
          style={{ paddingLeft: leftPadding.left, paddingRight: leftPadding.right }}
        >
          {/* 頂部小標 */}
          <motion.span variants={up}
            className="font-cinzel text-[10px] tracking-[0.38em] text-[#1a1a1a]/40 uppercase mb-6 block">
            {text.label}
          </motion.span>

          {/* 主標題 */}
          <motion.h1 variants={up}
            className="font-cinzel font-bold text-[#1a1a1a] leading-tight mb-4"
            style={{ fontSize: fontSize.title }}>
            {titleLines.map((line, i) => (
              <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
            ))}
          </motion.h1>

          {/* 副標題 */}
          <motion.p variants={up}
            className="font-cormorant text-[#1a1a1a]/50 italic mb-10"
            style={{ fontSize: fontSize.subtitle }}>
            {text.subtitle}
          </motion.p>

          {/* 按鈕 */}
          <motion.div variants={up}
            className="flex flex-wrap justify-center lg:justify-start gap-4 mb-14">
            <button onClick={() => setActivePage(buttons.primary.page)}
              className="font-cinzel px-10 py-3.5 text-[11px] tracking-[0.38em] uppercase bg-[#1a1a1a] text-white font-semibold rounded-full hover:bg-[#374151] transition-all duration-300">
              {buttons.primary.label}
            </button>
            <button onClick={() => setActivePage(buttons.secondary.page)}
              className="font-cinzel px-10 py-3.5 text-[11px] tracking-[0.38em] uppercase border border-black/30 text-[#1a1a1a]/70 rounded-full hover:bg-black/5 hover:border-black hover:text-[#1a1a1a] transition-all duration-300">
              {buttons.secondary.label}
            </button>
          </motion.div>
        </div>

        {/* ═══ RIGHT: Image ═══ */}
        <motion.div variants={fd}
          className={`w-full ${image.frameWidth} shrink-0 order-1 lg:order-2`}
          style={{ transform: `translateX(${image.frameTranslateX})` }}>
          <Frame
            src={`${import.meta.env.BASE_URL}images/web/${image.file}`}
            alt={text.subtitle}
            width="100%"
            height={image.frameHeight}
            offsetX={image.offsetX}
            offsetY={image.offsetY}
          >
            {image.fadeLeft && (
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent pointer-events-none" />
            )}
          </Frame>
        </motion.div>

      </motion.div>

    </section>
  )
}
