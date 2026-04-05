import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PhotoCarousel from './PhotoCarousel'

const categories = [
  { title: 'International TV', titleZh: '國際電視節目', icon: '📺',
    images: ['agt_09.jpg','tvb2017_10.jpg','shandong_03.jpg','cctv2018_06.jpg','tvb2022_05.jpg','gd2024_05.jpg'],
    items: ["NBC America's Got Talent",'TVB 終極街頭魔法王','山東衛視 奇蹟時刻','央視 我們一起上春晚','廣東衛視 灣區春晚','TVB 萬千星輝賀台慶（連續三年）'] },
  { title: 'Major Live Shows', titleZh: '大型售票公演', icon: '🎪',
    images: ['infinity_02.jpg','infinity_06.jpg','myfaith_01.jpg','myfaith_09.jpg','myfaith_10.jpg'],
    items: ['澳門 5000人 The Infinity（舞台總監）','多倫多 4000人售票公演','拉斯維加斯 1500人售票公演','My Faith 澳門/拉斯維加斯/舊金山巡演'] },
  { title: 'Corporate Events', titleZh: '企業 · 品牌活動', icon: '🏢',
    images: ['perf_02.jpg','perf_05.jpg','perf_08.jpg','perf_12.jpg','perf_15.jpg','perf_18.jpg'],
    items: ['新光三越 出神入化魔術秀（週末個人秀）','IKEA 卡友會演出','7-Eleven 開幕演出','新光銀行 企業活動','亞太朝日 春酒尾牙','玉晶光電 中秋私人晚宴'] },
  { title: 'Special & Charity', titleZh: '公益 · 特殊演出', icon: '❤️',
    images: ['perf_20.jpg','perf_22.jpg','perf_26.jpg','perf_30.jpg','perf_31.jpg'],
    items: ['紅鼻子醫生 信義公益基金會','高雄長庚醫院 川崎症孩童聖誕送暖','亞太影展 TaiWonderful 演出','台北順風社 聖誕晚會','國際獅子會 聖誕晚會嘉賓'] },
]

function CategoryCard({ cat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16,1,0.3,1] }}
      className="glass-card border-black/10 overflow-hidden hover:border-black/25 transition-all duration-500"
    >
      {/* Carousel */}
      <PhotoCarousel images={cat.images} aspect="aspect-video" interval={3200 + index * 200} />

      <div className="p-7">
        <div className="text-2xl mb-4">{cat.icon}</div>
        <h3 className="font-cinzel font-bold text-[#1a1a1a] text-sm tracking-[0.15em] uppercase mb-1">{cat.title}</h3>
        <p className="font-cormorant text-[#374151] text-xl italic mb-5 leading-tight">{cat.titleZh}</p>
        <ul className="space-y-2.5">
          {cat.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[#1a1a1a]/75 text-[15px] leading-snug">
              <span className="text-[#374151]/50 mt-1 shrink-0 text-xs">◆</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Performance() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="performance" className="py-24 md:py-32 w-full">
      <div className="section-wrap">

        <div ref={titleRef} className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="section-label mb-5">Performance Experience</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title text-gold-gradient mt-4">
            演出經歷
          </motion.h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e5e7eb]">
          {categories.map((cat, i) => <CategoryCard key={i} cat={cat} index={i} />)}
        </div>

        {/* Awards */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mt-px glass-card border-black/10 p-10 text-center">
          <span className="section-label block mb-8">Awards & Milestones</span>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            {[
              { year:'2013', org:'808全國魔術大會', award:'近景魔術 · 特別獎' },
              { year:'2015', org:'808全國魔術大會', award:'舞台魔術 · 季軍' },
              { year:'2025', org:'My Faith 世界巡迴', award:'連續 6 場 Good Show' },
            ].map((a, i) => (
              <div key={i} className="text-center">
                <div className="font-cinzel text-3xl font-bold text-gold-gradient mb-2">{a.year}</div>
                <div className="text-[#1a1a1a]/80 text-[15px] mb-1">{a.org}</div>
                <div className="font-cinzel text-[10px] tracking-wider text-[#374151]/70">{a.award}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
