import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Frame from './Frame'
import cfg from '../config/hero.config'

const { stagger, upDuration, fadeDuration, upY } = cfg.animation

const ctr = { hidden: {}, show: { transition: { staggerChildren: stagger } } }
const up  = { hidden: { opacity: 0, y: upY },  show: { opacity: 1, y: 0,  transition: { duration: upDuration,   ease: [0.16,1,0.3,1] } } }
const fd  = { hidden: { opacity: 0 },           show: { opacity: 1,        transition: { duration: fadeDuration } } }

const notableCases = [
  {
    year: '2016',
    title: '拉斯維加斯大型公演',
    desc: '擔任美國拉斯維加斯大型公演魔術總監，操盤逾5000人售票演出。',
    img: 'infinity_02.jpg',
  },
  {
    year: '2018',
    title: '央視 & TVB 節目顧問',
    desc: '受邀擔任中央電視台、TVB 節目魔術創意顧問，足跡延伸至港澳。',
    img: 'cctv2018_01.jpg',
  },
  {
    year: '2020',
    title: '多倫多 & 雪梨跨國演出',
    desc: '跨越加拿大、澳洲兩大城市演出，累積海外觀眾超過萬人。',
    img: 'agt_04.jpg',
  },
  {
    year: '2024',
    title: '知名藝人活動合作',
    desc: '與國際知名品牌及藝人長期合作，持續活躍於舞台與電視媒體。',
    img: 'jaychou_03.jpg',
  },
]

const ctaServices = [
  { icon: '✦', label: '小客廳魔術秀' },
  { icon: '◈', label: '舞台互動魔術表演' },
  { icon: '⬡', label: '魔術教學' },
  { icon: '◉', label: '客製化魔術' },
]

function GlobeStat() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <div ref={ref} className="py-20 md:py-28 bg-[#1a1a1a] overflow-hidden relative">
      {/* 裝飾線 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
      </div>

      <div className="section-wrap">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* 數字亮點 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            className="shrink-0 text-center lg:text-left"
          >
            <span className="font-cinzel text-[9px] tracking-[0.45em] text-white/30 uppercase block mb-4">
              Solo Travel Achievement
            </span>
            <div className="flex items-end gap-3 justify-center lg:justify-start">
              <span className="font-cinzel font-bold text-white leading-none"
                style={{ fontSize: 'clamp(5rem, 12vw, 9rem)' }}>
                29
              </span>
              <span className="font-cormorant text-white/50 italic mb-3"
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
                歲前
              </span>
            </div>
            <div className="h-px bg-white/10 my-5 max-w-xs mx-auto lg:mx-0" />
            <p className="font-cormorant text-white/70 italic leading-relaxed"
              style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)' }}>
              靠自己飛了半個地球
            </p>
          </motion.div>

          {/* 說明文字 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex-1"
          >
            <p className="text-white/55 leading-[2] text-[15px] md:text-[16px] mb-8">
              在成為職業魔術師之前，彈彈憑著一股對世界的好奇心，
              一個人踏上跨越亞洲、美洲、澳洲的旅程。
              那些獨自在異鄉的日子，磨練了他對人的敏銳觀察，
              也讓他深刻理解——無論語言文化如何不同，
              <strong className="text-white/80">奇蹟，是人類共同的語言。</strong>
            </p>

            {/* 數字小統計 */}
            <div className="flex flex-wrap gap-8">
              {[
                { num: '15+', label: '造訪國家' },
                { num: '6', label: '洲際足跡' },
                { num: '17年', label: '魔術生涯' },
              ].map(item => (
                <div key={item.label}>
                  <div className="font-cinzel font-bold text-white text-2xl">{item.num}</div>
                  <div className="font-cinzel text-[9px] tracking-[0.3em] text-white/35 uppercase mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

function NotableCases() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <div className="py-20 md:py-28 bg-white">
      <div className="section-wrap">

        <div ref={ref} className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="section-label mb-5">Notable Work</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-title mt-4">重要足跡</motion.h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {notableCases.map((c, i) => (
            <CaseCard key={i} item={c} i={i} inView={inView} />
          ))}
        </div>

      </div>
    </div>
  )
}

function CaseCard({ item, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16,1,0.3,1] }}
      className="group relative overflow-hidden bg-[#fafafa] border border-black/8 hover:border-black/20 transition-all duration-500"
    >
      {/* 圖片 */}
      <div className="overflow-hidden" style={{ height: 'clamp(160px, 20vw, 220px)' }}>
        <img
          src={`${import.meta.env.BASE_URL}images/web/${item.img}`}
          alt={item.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
      </div>

      {/* 內容 */}
      <div className="p-5">
        <span className="font-cinzel text-[9px] tracking-[0.35em] text-[#1a1a1a]/30 uppercase block mb-2">
          {item.year}
        </span>
        <h3 className="font-cinzel font-bold text-[#1a1a1a] text-[13px] tracking-wide mb-3 leading-snug">
          {item.title}
        </h3>
        <div className="w-5 h-px bg-black/15 mb-3" />
        <p className="text-[#1a1a1a]/55 text-[13px] leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

function CtaSection({ setActivePage }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="bg-[#7B1A1A]">

      {/* 主 CTA 區塊 */}
      <div className="section-wrap py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* 左：文字 + 按鈕 */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75 }}
            className="flex-1"
          >
            <h2 className="font-cormorant font-bold text-white leading-snug mb-6"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}>
              我想找魔術表演！<br />
              <span className="border-b-2 border-white/60 pb-1">哪一種魔術表演類型</span><br />
              最適合我的活動呢？
            </h2>
            <button
              onClick={() => setActivePage('contact')}
              className="font-cinzel text-[11px] tracking-[0.38em] uppercase px-8 py-3 bg-white/15 border border-white/40 text-white hover:bg-white hover:text-[#7B1A1A] transition-all duration-300"
            >
              Let's Talk
            </button>
          </motion.div>

          {/* 右：插圖人物 */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="shrink-0 flex items-end justify-center"
            style={{ width: 'clamp(200px, 28vw, 320px)' }}
          >
            <svg viewBox="0 0 320 360" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto opacity-90">
              {/* 身體 */}
              <ellipse cx="160" cy="310" rx="70" ry="18" fill="#5a1212" opacity="0.4"/>
              {/* 軀幹 */}
              <rect x="118" y="195" width="84" height="110" rx="12" fill="#9B2828"/>
              {/* 脖子 */}
              <rect x="148" y="175" width="24" height="28" rx="4" fill="#F4A27A"/>
              {/* 頭 */}
              <ellipse cx="160" cy="148" rx="46" ry="50" fill="#F4A27A"/>
              {/* 頭髮 */}
              <path d="M115 138 C115 100 205 100 205 138 L205 128 C205 88 115 88 115 128Z" fill="#4a2a1a"/>
              {/* 眼鏡框 */}
              <rect x="132" y="143" width="22" height="16" rx="3" fill="none" stroke="#4a2a1a" strokeWidth="2.5"/>
              <rect x="166" y="143" width="22" height="16" rx="3" fill="none" stroke="#4a2a1a" strokeWidth="2.5"/>
              <line x1="154" y1="151" x2="166" y2="151" stroke="#4a2a1a" strokeWidth="2"/>
              <line x1="110" y1="151" x2="132" y2="151" stroke="#4a2a1a" strokeWidth="2"/>
              <line x1="188" y1="151" x2="210" y2="151" stroke="#4a2a1a" strokeWidth="2"/>
              {/* 眼睛 */}
              <circle cx="143" cy="151" r="4" fill="#4a2a1a"/>
              <circle cx="177" cy="151" r="4" fill="#4a2a1a"/>
              {/* 嘴 */}
              <path d="M150 167 Q160 172 170 167" stroke="#4a2a1a" strokeWidth="2" strokeLinecap="round" fill="none"/>
              {/* V 領 */}
              <path d="M136 198 L160 225 L184 198" stroke="#7B1A1A" strokeWidth="3" fill="none"/>
              {/* 左臂（上揚聳肩） */}
              <path d="M118 215 Q90 190 62 195" stroke="#9B2828" strokeWidth="22" strokeLinecap="round" fill="none"/>
              <ellipse cx="58" cy="197" rx="14" ry="14" fill="#F4A27A"/>
              {/* 右臂（上揚聳肩） */}
              <path d="M202 215 Q230 190 258 195" stroke="#9B2828" strokeWidth="22" strokeLinecap="round" fill="none"/>
              <ellipse cx="262" cy="197" rx="14" ry="14" fill="#F4A27A"/>
              {/* 問號裝飾 */}
              <text x="48" y="175" fontFamily="serif" fontSize="22" fill="white" opacity="0.6">?</text>
              <text x="264" y="175" fontFamily="serif" fontSize="22" fill="white" opacity="0.6">?</text>
            </svg>
          </motion.div>

        </div>
      </div>

      {/* 服務類型圖示列 */}
      <div className="border-t border-white/10">
        <div className="section-wrap py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ctaServices.map((s, i) => (
              <motion.button
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                onClick={() => setActivePage('services')}
                className="flex flex-col items-center gap-2 py-4 px-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/25 transition-all duration-300 group"
              >
                <span className="text-white/60 text-lg group-hover:text-white/90 transition-colors">{s.icon}</span>
                <span className="font-cinzel text-[10px] tracking-[0.18em] text-white/70 group-hover:text-white transition-colors">
                  {s.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default function Hero({ setActivePage }) {
  const { text, buttons, leftPadding, fontSize, image } = cfg

  const titleLines = text.title.split('\n')

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-white">

      {/* ── 主 Hero 視覺 ── */}
      <motion.div variants={ctr} initial="hidden" animate="show"
        className="relative z-10 min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row items-center">

        {/* ═══ LEFT: Slogan ═══ */}
        <div
          className={`flex-1 flex flex-col justify-center ${leftPadding.vertical} text-center lg:text-left order-2 lg:order-1`}
          style={{ paddingLeft: leftPadding.left, paddingRight: leftPadding.right }}
        >
          <motion.span variants={up}
            className="font-cinzel text-[10px] tracking-[0.38em] text-[#1a1a1a]/40 uppercase mb-6 block">
            {text.label}
          </motion.span>

          <motion.h1 variants={up}
            className="font-cinzel font-bold text-[#1a1a1a] leading-tight mb-4"
            style={{ fontSize: fontSize.title }}>
            {titleLines.map((line, i) => (
              <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
            ))}
          </motion.h1>

          <motion.p variants={up}
            className="font-cormorant text-[#1a1a1a]/50 italic mb-10"
            style={{ fontSize: fontSize.subtitle }}>
            {text.subtitle}
          </motion.p>

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

      {/* ── 往下滑區塊 ── */}
      <GlobeStat />
      <NotableCases />
      <CtaSection setActivePage={setActivePage} />

    </section>
  )
}
