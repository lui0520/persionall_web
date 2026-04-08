import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Frame from './Frame'

const highlights = [
  { suit: '♠', suitColor: 'text-[#1a1a1a]', title: 'Global Production',   titleZh: '跨國監製實力', desc: '曾任拉斯維加斯、央視、TVB 等數千人公演魔術總監，足跡遍布亞美兩大洲。' },
  { suit: '♥', suitColor: 'text-rose-500',   title: 'Charismatic Contrast', titleZh: '幽默反差人格', desc: '顧問級硬核資歷，卻擁有搞笑幽默、極具親和力的表演靈魂。' },
  { suit: '♦', suitColor: 'text-rose-500',   title: 'Emotional Insight',    titleZh: '洞察大眾情緒', desc: '與生俱來高親和力，跨足感情諮詢，將細膩觀察融入魔術，用魔術彈走心靈緊繃。' },
  { suit: '♣', suitColor: 'text-[#1a1a1a]', title: 'Elite Achievements',   titleZh: '頂尖舞台成就', desc: '全台舞台魔術季軍、近景魔術特別獎，多次操盤5000人規模大型售票公演。' },
]

const timeline = [
  { year: '2008', event: '成立台北市立成淵高中魔術社，擔任創社社長' },
  { year: '2013', event: '獲全台舞台魔術季軍、近景魔術特別獎' },
  { year: '2016', event: '擔任拉斯維加斯大型公演魔術總監' },
  { year: '2018', event: '央視、TVB 節目魔術顧問，足跡延伸至港澳' },
  { year: '2020', event: '多倫多、雪梨跨國演出，累計逾5000人公演規模' },
  { year: '2024', event: '持續活躍於舞台、電視、品牌活動與魔術教學' },
]

export default function Intro() {
  const headerRef   = useRef(null)
  const bioRef      = useRef(null)
  const timelineRef = useRef(null)
  const cardsRef    = useRef(null)

  const headerInView   = useInView(headerRef,   { once: true, margin: '-80px' })
  const bioInView      = useInView(bioRef,       { once: true, margin: '-80px' })
  const timelineInView = useInView(timelineRef,  { once: true, margin: '-80px' })
  const cardsInView    = useInView(cardsRef,     { once: true, margin: '-80px' })

  return (
    <section className="w-full">

      {/* ── 大標題 ── */}
      <div ref={headerRef} className="py-20 md:py-28 text-center bg-white">
        <div className="section-wrap">
          <motion.span initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}}
            className="section-label mb-5">Magician Introduction</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title mt-4">魔術師介紹</motion.h2>
          <div className="gold-divider" />
        </div>
      </div>

      {/* ── 主視覺：照片 + 核心文案 ── */}
      <div ref={bioRef} className="bg-[#fafafa] py-16 md:py-24">
        <div className="section-wrap">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

            {/* 照片相框 */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={bioInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
              className="shrink-0"
            >
              <div className="relative">
                <div className="absolute -inset-[3px] border border-black/15 pointer-events-none z-10" />
                <span className="frame-corner tl z-20" />
                <span className="frame-corner tr z-20" />
                <span className="frame-corner bl z-20" />
                <span className="frame-corner br z-20" />
                <Frame
                  src={`${import.meta.env.BASE_URL}images/web/hero_05.jpg`}
                  alt="彈彈"
                  width="clamp(260px, 30vw, 380px)"
                  height="clamp(320px, 38vw, 480px)"
                  offsetY={-8}
                />
              </div>
            </motion.div>

            {/* 文字 */}
            <div className="flex-1">
              <motion.div initial={{ opacity: 0 }} animate={bioInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-black/10" />
                <span className="font-cinzel text-[9px] tracking-[0.4em] text-[#1a1a1a]/30 uppercase">Arsene Hsiao</span>
                <div className="h-px flex-1 bg-black/10" />
              </motion.div>

              <motion.h3 initial={{ opacity: 0, y: 20 }} animate={bioInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-cinzel font-bold text-[#1a1a1a] mb-6"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '0.08em' }}>
                魔術師 彈彈
              </motion.h3>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={bioInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-cormorant text-[#1a1a1a]/70 leading-loose italic mb-6"
                style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)' }}>
                17年魔術生涯，從台灣出發，足跡踏遍拉斯維加斯、香港、澳門、多倫多與雪梨。
                他不僅是魔術師，更是電視節目魔術顧問、幕後舞台總監與原創道具設計師，
                用每一個不可能，詮釋魔術的本質——
              </motion.p>

              <motion.p initial={{ opacity: 0, y: 12 }} animate={bioInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="font-cormorant text-[#374151] italic font-bold leading-snug mb-10"
                style={{ fontSize: 'clamp(1.3rem, 2.8vw, 1.75rem)' }}>
                「讓人相信奇蹟。」
              </motion.p>

              {/* 身份標籤 */}
              <motion.div initial={{ opacity: 0 }} animate={bioInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-wrap gap-2">
                {['魔術師', '電視節目顧問', '舞台總監', '道具設計師', '魔術教學'].map(tag => (
                  <span key={tag}
                    className="font-cinzel text-[9px] tracking-[0.22em] border border-black/20 text-[#1a1a1a]/55 px-3 py-1.5 uppercase">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 時間軸 ── */}
      <div ref={timelineRef} className="py-16 md:py-24 bg-white">
        <div className="section-wrap max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={timelineInView ? { opacity: 1 } : {}}
            className="text-center mb-12">
            <span className="section-label">Career Timeline</span>
          </motion.div>

          <div className="relative pl-6 border-l border-black/10">
            {timeline.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative mb-8 last:mb-0">
                {/* 圓點 */}
                <span className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full bg-[#1a1a1a]/25 border-2 border-white ring-1 ring-black/15" />
                <div className="flex items-baseline gap-4">
                  <span className="font-cinzel text-xs font-bold text-[#1a1a1a]/40 tracking-widest shrink-0">{item.year}</span>
                  <p className="text-[#1a1a1a]/70 text-[15px] leading-relaxed">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 四大特色：撲克牌樣式 ── */}
      <div ref={cardsRef} className="py-16 md:py-24 bg-[#fafafa]">
        <div className="section-wrap">
          <motion.div initial={{ opacity: 0 }} animate={cardsInView ? { opacity: 1 } : {}}
            className="text-center mb-20">
            <span className="section-label">Core Identity</span>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {highlights.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40, rotate: -3 }}
                animate={cardsInView ? { opacity: 1, y: 0, rotate: i % 2 === 0 ? -1.5 : 1.5 } : {}}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16,1,0.3,1] }}
                whileHover={{ y: -12, rotate: 0, transition: { duration: 0.25 } }}
                className="relative bg-white shadow-[0_6px_32px_rgba(0,0,0,0.10)]"
                style={{ width: 'clamp(180px, 22vw, 220px)', aspectRatio: '2.5/3.5' }}
              >
                {/* 外邊框 */}
                <div className="absolute inset-0 border-2 border-black/15 pointer-events-none" />
                {/* 內框線 */}
                <div className="absolute inset-[9px] border border-black/8 pointer-events-none" />
                {/* 四角花紋 */}
                {['top-[11px] left-[11px]','top-[11px] right-[11px]','bottom-[11px] left-[11px]','bottom-[11px] right-[11px]'].map((pos, j) => (
                  <span key={j} className={`absolute ${pos} text-[#1a1a1a]/20 text-[11px] leading-none pointer-events-none`}>✦</span>
                ))}
                {/* 四邊中央花紋 */}
                <span className="absolute top-[11px] left-1/2 -translate-x-1/2 text-[#1a1a1a]/12 text-[10px] pointer-events-none">❖</span>
                <span className="absolute bottom-[11px] left-1/2 -translate-x-1/2 text-[#1a1a1a]/12 text-[10px] pointer-events-none">❖</span>
                <span className="absolute left-[11px] top-1/2 -translate-y-1/2 text-[#1a1a1a]/12 text-[10px] pointer-events-none">❖</span>
                <span className="absolute right-[11px] top-1/2 -translate-y-1/2 text-[#1a1a1a]/12 text-[10px] pointer-events-none">❖</span>

                {/* 左上角 */}
                <div className="absolute top-4 left-4 text-center leading-none">
                  <div className={`font-cinzel font-bold text-2xl leading-none ${item.suitColor}`}>A</div>
                  <div className={`text-xl leading-none mt-1 ${item.suitColor}`}>{item.suit}</div>
                </div>

                {/* 右下角（倒置） */}
                <div className="absolute bottom-4 right-4 rotate-180 text-center leading-none">
                  <div className={`font-cinzel font-bold text-2xl leading-none ${item.suitColor}`}>A</div>
                  <div className={`text-xl leading-none mt-1 ${item.suitColor}`}>{item.suit}</div>
                </div>

                {/* 中間內容 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <div className={`text-4xl mb-3 ${item.suitColor} opacity-20`}>{item.suit}</div>
                  <h3 className="font-cinzel font-bold text-[#1a1a1a] text-[11px] tracking-[0.2em] uppercase mb-2 leading-relaxed">
                    {item.title}
                  </h3>
                  <p className={`font-cormorant text-2xl italic mb-3 leading-snug ${item.suitColor}`}>
                    {item.titleZh}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px w-5 bg-black/12" />
                    <span className={`text-[10px] ${item.suitColor} opacity-40`}>{item.suit}</span>
                    <div className="h-px w-5 bg-black/12" />
                  </div>
                  <p className="text-[#1a1a1a]/60 text-[12px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
