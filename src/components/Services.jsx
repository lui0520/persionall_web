import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  { id: 'full-scene',  title: '全場景互動秀',   en: 'Full-Scene Interactive Show',  desc: '適合各類型大型活動，結合舞台與觀眾互動的完整演出。' },
  { id: 'stage',       title: '舞台幻術互動秀', en: 'Stage Illusion Show',          desc: '震撼視覺的大型舞台幻術，搭配音樂燈光創造極致體驗。' },
  { id: 'consultant',  title: '魔術顧問',       en: 'Magic Consultant',             desc: '提供電視節目、品牌活動的魔術創意設計與技術指導。' },
  { id: 'close-up',    title: '近距離魔術',     en: 'Close-Up Magic',               desc: '桌邊近距離互動魔術，適合商務宴席、迎賓場合。' },
  { id: 'workshop',    title: '魔術教學',       en: 'Magic Workshop',               desc: '企業團建、學校社團、親子活動的魔術工作坊課程。' },
]

function ServiceCard({ item, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div id={item.id} ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      className="glass-card border-black/10 p-8 hover:border-black/25 hover:bg-black/3 transition-all duration-500"
    >
      <p className="font-cinzel text-[9px] tracking-[0.32em] text-[#1a1a1a]/35 uppercase mb-3">{item.en}</p>
      <h3 className="font-cinzel font-bold text-[#1a1a1a] text-base tracking-wide mb-4">{item.title}</h3>
      <div className="w-6 h-px bg-black/20 mb-4" />
      <p className="text-[#1a1a1a]/60 text-[15px] leading-relaxed">{item.desc}</p>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="py-24 md:py-32 w-full">
      <div className="section-wrap">

        <div ref={ref} className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="section-label mb-5">Services</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title mt-4">服務項目</motion.h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e5e7eb] max-w-5xl mx-auto">
          {services.map((s, i) => <ServiceCard key={s.id} item={s} i={i} />)}
        </div>

      </div>
    </section>
  )
}
