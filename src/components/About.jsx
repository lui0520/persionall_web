import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PhotoCarousel from './PhotoCarousel'

const highlights = [
  { icon: '🌐', title: 'Global Production',   titleZh: '跨國監製實力', desc: '曾任拉斯維加斯、央視、TVB 等數千人公演魔術總監，足跡遍布亞美兩大洲。' },
  { icon: '🎭', title: 'Charismatic Contrast', titleZh: '幽默反差人格',   desc: '顧問級硬核資歷，卻擁有搞笑幽默、極具親和力的表演靈魂。' },
  { icon: '🧠', title: 'Emotional Insight',    titleZh: '洞察大眾情緒',   desc: '與生俱來高親和力，跨足感情諮詢，將細膩觀察融入魔術，用魔術彈走心靈緊繃。' },
  { icon: '🏆', title: 'Elite Achievements',   titleZh: '頂尖舞台成就',   desc: '全台舞台魔術季軍、近景魔術特別獎，多次操盤5000人規模大型售票公演。' },
]

const bioPhotos = ['hero_01.jpg', 'hero_05.jpg', 'perf_03.jpg', 'perf_05.jpg']

function Card({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16,1,0.3,1] }}
      className="glass-card p-8 hover:border-black/25 hover:bg-black/3 transition-all duration-500 flex flex-col border-black/10"
    >
      <div className="text-3xl mb-5">{item.icon}</div>
      <h3 className="font-cinzel font-bold text-[#1a1a1a] text-xs tracking-[0.18em] uppercase mb-1">{item.title}</h3>
      <p className="font-cormorant text-[#374151] text-xl italic mb-4 leading-snug">{item.titleZh}</p>
      <p className="text-[#1a1a1a]/75 text-[15px] leading-relaxed">{item.desc}</p>
    </motion.div>
  )
}

export default function About() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 md:py-32 w-full">
      <div className="section-wrap">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="section-label mb-5">About</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title text-gold-gradient mt-4">
            魔術師 彈彈
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel text-[#1a1a1a]/40 text-[10px] tracking-[0.35em] uppercase mt-3">
            Magician Arsene Hsiao
          </motion.p>
          <div className="gold-divider" />
        </div>

        {/* Bio row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9 }}
          className="flex flex-col md:flex-row gap-10 items-center mb-16"
        >
          {/* Carousel */}
          <div className="shrink-0 w-full md:w-80 relative">
            <div className="absolute -inset-[3px] border border-black/15 pointer-events-none z-10" />
            <span className="frame-corner tl z-20" /><span className="frame-corner tr z-20" />
            <span className="frame-corner bl z-20" /><span className="frame-corner br z-20" />
            <PhotoCarousel images={bioPhotos} aspect="aspect-[4/3]" interval={3500} />
          </div>

          {/* Bio text */}
          <div className="flex-1">
            <p className="font-cormorant text-[#1a1a1a]/80 leading-loose italic mb-4"
              style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)' }}>
              17年魔術生涯，從台灣出發，足跡踏遍拉斯維加斯、香港、澳門、多倫多與雪梨。
              他不僅是魔術師，更是電視節目魔術顧問、幕後舞台總監與原創道具設計師，
              用每一個不可能，詮釋魔術的本質——
            </p>
            <p className="font-cormorant text-[#374151] italic font-bold leading-snug"
              style={{ fontSize: 'clamp(1.3rem, 2.8vw, 1.7rem)' }}>
              「讓人相信奇蹟。」
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e5e7eb]">
          {highlights.map((item, i) => <Card key={i} item={item} index={i} />)}
        </div>

      </div>
    </section>
  )
}
