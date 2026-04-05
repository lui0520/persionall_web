import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import PhotoCarousel from './PhotoCarousel'

const creations = [
  { year:'2015', title:'Water Transfiguration', titleZh:'水變形', highlight:true,
    desc:"將水變成可樂的魔術道具，以「隱性操作」為核心設計理念，登上全世界最大魔術道具網站 Murphy's Magic 販售。",
    tag:"Murphy's Magic · 商業道具", link:null,
    images:['misc_01.jpg','shows_03.jpg'] },
  { year:'2017', title:'White Cat Project', titleZh:'白貓Project 科技魔術',
    desc:'結合日本《白貓Project》手遊，利用時光倒轉的魔法，創造「一伸手就抽四星」的視覺奇蹟，引起遊戲玩家熱烈討論。',
    tag:'數位魔術 · 科技創作', link:'https://youtu.be/BvkefJ9crsY',
    images:['misc_02.jpg','perf_53.jpg'] },
  { year:'2015', title:'Secret Act', titleZh:'全國舞台魔術季軍',
    desc:'以寶箱與鑰匙為元素，結合精湛手法，在2015年全國舞台魔術大賽奪得季軍。每個人心中都有好奇心，刺探各種秘密的渴望。',
    tag:'2015全國舞台魔術 · 季軍', link:'https://youtu.be/ztO99OoqXgM',
    images:['perf_51.jpg','perf_52.jpg'] },
  { year:'2013', title:'My First Gift', titleZh:'全國近景魔術特別獎',
    desc:'參與Baton接棒啟蒙計畫，結合不同職業創造職涯魔術，在808近景魔術比賽中獲得特別獎。',
    tag:'2013全國近景魔術 · 特別獎', link:'https://youtu.be/2eBLyd7ecLI',
    images:['perf_53.jpg','perf_54.jpg'] },
]

function CreationCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:48, scale:0.98 }}
      animate={inView ? { opacity:1, y:0, scale:1 } : {}}
      transition={{ duration:0.8, delay:index*0.1, ease:[0.16,1,0.3,1] }}
      className={`glass-card overflow-hidden hover:border-black/28 transition-all duration-500 group ${
        item.highlight ? 'border-black/20' : 'border-black/10'
      }`}
    >
      {/* Carousel */}
      <div className="relative">
        <PhotoCarousel images={item.images} aspect="aspect-[16/9]" interval={3400 + index*300} />
        {item.highlight && (
          <div className="absolute top-3 right-3 z-20 font-cinzel text-[8px] tracking-widest text-[#374151] border border-black/25 bg-white/85 px-2.5 py-1 uppercase backdrop-blur-sm">
            Murphy's Magic
          </div>
        )}
      </div>

      <div className="p-7">
        <div className="font-cinzel text-black/12 font-bold text-4xl mb-3 leading-none">{item.year}</div>
        <h3 className="font-cinzel font-bold text-[#1a1a1a] tracking-wider mb-1"
          style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)' }}>{item.title}</h3>
        <p className="font-cormorant text-[#374151] text-xl italic mb-4">{item.titleZh}</p>
        <p className="text-[#1a1a1a]/75 text-[15px] leading-relaxed mb-6">{item.desc}</p>

        <div className="flex items-center justify-between">
          <span className="font-cinzel text-[8px] tracking-widest uppercase text-[#1a1a1a]/38 border border-black/12 px-2.5 py-1">
            {item.tag}
          </span>
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#374151]/65 hover:text-[#1a1a1a] text-xs transition-colors group-hover:text-[#1a1a1a]">
              <span className="font-cinzel text-[9px] tracking-wider">Watch</span>
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Creations() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="creations" className="py-24 md:py-32 w-full">
      <div className="section-wrap">

        <div ref={titleRef} className="text-center mb-16">
          <motion.span initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} className="section-label mb-5">
            Original Creations
          </motion.span>
          <motion.h2 initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:0.8, delay:0.1 }}
            className="section-title text-gold-gradient mt-4">個人創作</motion.h2>
          <div className="gold-divider" />
          <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
            transition={{ duration:0.8, delay:0.3 }}
            className="font-cormorant text-[#1a1a1a]/50 text-xl italic mt-8 max-w-xl mx-auto leading-relaxed">
            「一個好的魔術，簡單的設定以及隱性操作<br/>都『應該』是一個產品必須擁有的。」
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e5e7eb]">
          {creations.map((item, i) => <CreationCard key={i} item={item} index={i} />)}
        </div>

      </div>
    </section>
  )
}
