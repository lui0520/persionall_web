import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const shows = [
  { id:1,  title:'三繩奇術',     en:'Three Rope Mystery',   type:'搭配音樂', desc:'配合音樂，將繩子魔術以有趣方式演示繩子變成多段、還原等各種驚奇效果，讓掌聲不斷。', image:'shows_01.jpg' },
  { id:2,  title:'撲克牌穿寶特瓶', en:'Card Through Bottle', type:'觀眾互動', desc:'邀請觀眾上台簽名，在眾目睽睽之下把牌穿透入全新飲料的寶特瓶中，視覺衝擊強烈。', image:'shows_02.jpg' },
  { id:3,  title:'水變形',       en:'Water Transfiguration',type:'觀眾互動', desc:"魔術師拿出一瓶水，就在觀眾眼前搖晃幾下，立刻變成滿是氣泡的汽水。Murphy's Magic 商業道具。", image:'shows_03.jpg', highlight:true },
  { id:4,  title:'撕報還原',     en:'Torn & Restored',      type:'搭配音樂', desc:'拿出報紙展示每一面，撕開數份後，對著碎片吹口氣，報紙在一瞬間完整還原。', image:'shows_04.jpg' },
  { id:5,  title:'蛋與袋',       en:'Egg & Bag',            type:'觀眾互動', desc:'邀請觀眾上台，不但能把蛋變不見、出現，最後連觀眾也能把蛋變出來！互動性極強。', image:'shows_05.jpg' },
  { id:6,  title:'魔幻飛桌',     en:'Floating Table',       type:'搭配音樂', desc:'配合音樂把桌子飄浮起來，與桌子一起共舞，邀請觀眾一同上台體驗漂浮感受。', image:'shows_06.jpg' },
  { id:7,  title:'可樂預言',     en:'Cola Prediction',      type:'觀眾互動', desc:'拿出三種飲料請觀眾選擇，魔術師不但成功預言，還現場教你怎麼變！', image:'shows_07.jpg' },
  { id:8,  title:'不可能的轉移', en:'Impossible Transfer',  type:'觀眾互動', desc:'邀請兩位觀眾，拿出全新撲克牌洗亂，一人各拿十張，魔術師隔空移動多張牌。', image:'shows_08.jpg' },
  { id:9,  title:'小大魔術棒',   en:'Magic Wand',           type:'親子互動', desc:'邀請小朋友上台完成艱難魔術任務，在不斷意外出現後，魔術師終於拿出秘密武器！', image:'shows_09.jpg' },
  { id:10, title:'奇幻快手魔術', en:'Quick Change',         type:'搭配音樂', desc:'撲克牌、絲巾、棒子等各種物件在魔術師手上消失又出現，不同的變化讓人目不轉睛。', image:'shows_10.jpg' },
]

const typeColor = {
  '搭配音樂': 'text-violet-300 border-violet-300/35',
  '觀眾互動': 'text-emerald-300 border-emerald-300/35',
  '親子互動': 'text-sky-300 border-sky-300/35',
}

function ShowCard({ show, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:36 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.6, delay:(index%5)*0.07 }}
      className="cursor-pointer"
      style={{ perspective:1000 }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration:0.55, ease:[0.16,1,0.3,1] }}
        style={{ transformStyle:'preserve-3d', position:'relative', minHeight:260 }}
      >
        {/* Front */}
        <div className={`absolute inset-0 glass-card overflow-hidden flex flex-col ${
            show.highlight ? 'border-[#c9a94b]/40' : 'border-[#c9a94b]/22'
          }`}
          style={{ backfaceVisibility:'hidden' }}>
          <div className="h-32 overflow-hidden shrink-0">
            <img src={`/images/web/${show.image}`} alt=""
              className="w-full h-full object-cover img-hover"
              style={{ filter:'brightness(0.78) contrast(1.06)' }} />
          </div>
          <div className="p-4 flex flex-col flex-1 justify-between">
            <div>
              <span className={`font-cinzel text-[8px] tracking-widest uppercase border px-1.5 py-0.5 ${typeColor[show.type]}`}>
                {show.type}
              </span>
              <h3 className="font-cinzel font-bold text-white text-sm tracking-wider mt-2 mb-0.5">{show.title}</h3>
              <p className="text-white/45 text-[11px] tracking-wide">{show.en}</p>
            </div>
            <p className="font-cinzel text-[8px] text-[#c9a94b]/45 mt-3 tracking-widest">點擊查看 →</p>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 glass-card p-5 flex flex-col justify-center bg-[#c9a94b]/8 border-[#c9a94b]/38"
          style={{ backfaceVisibility:'hidden', transform:'rotateY(180deg)' }}>
          <h3 className="font-cinzel font-bold text-white text-sm tracking-wider mb-3">{show.title}</h3>
          <p className="text-white/80 text-[15px] leading-relaxed">{show.desc}</p>
          <p className="font-cinzel text-[8px] text-[#c9a94b]/45 mt-4 tracking-widest">再次點擊收起 ←</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ShowList() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="shows" className="py-24 md:py-32 w-full">
      <div className="section-wrap">

        <div ref={titleRef} className="text-center mb-16">
          <motion.span initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} className="section-label mb-5">
            Show Repertoire
          </motion.span>
          <motion.h2 initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:0.8, delay:0.1 }}
            className="section-title text-gold-gradient mt-4">節目單</motion.h2>
          <div className="gold-divider" />
          <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
            transition={{ duration:0.8, delay:0.3 }}
            className="font-cinzel text-white/40 text-[9px] tracking-[0.35em] mt-5 uppercase">
            Click any card to reveal details
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[#c9a94b]/15">
          {shows.map((show, i) => <ShowCard key={show.id} show={show} index={i} />)}
        </div>

        <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.8 }}
          className="mt-px glass-card border-[#c9a94b]/22 p-6 text-center">
          <span className="section-label block mb-3">Upgrade Customization</span>
          <p className="text-white/65 text-[15px]">
            Chair Suspension · 不可能的巧合 · 鈔票大獎 · 香檳BANG ——
            <span className="text-[#c9a94b]"> 特殊需求請洽詢</span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}
