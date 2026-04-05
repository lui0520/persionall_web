import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PhotoCarousel from './PhotoCarousel'

const teachingHistory = [
  { year:'2008', role:'台北市立成淵高中 · 魔術社創社社長',                         type:'學校' },
  { year:'2011', role:'兒童燙傷基金會 〈魔幻派對〉夏令營 · 魔術指導老師',          type:'公益' },
  { year:'2012', role:'兒童燙傷基金會 〈魔球More Fun〉夏令營 · 魔術指導老師',      type:'公益' },
  { year:'2012', role:'台北市立中山女子高中 · 魔術社團指導老師',                   type:'學校' },
  { year:'2013', role:'台北市立百齡高中 · 魔術社團指導老師',                       type:'學校' },
  { year:'2013', role:'接棒啟蒙計畫 〈KNOW〉· 職涯魔術師 · 職涯專家邀請',         type:'講座' },
  { year:'2014', role:'蔚思教育機構 · 冬令營 / 夏令營 魔術指導老師',              type:'機構' },
  { year:'2014', role:'MIT美語才藝班 · 魔術夏令營 指導老師',                      type:'機構' },
  { year:'2015', role:'蔚思教育機構 · 冬令營 魔術指導老師',                       type:'機構' },
  { year:'2016', role:'長庚醫院 〈如何利用魔術吸引注意〉講座講師',                type:'講座' },
  { year:'2016', role:'蔚思教育機構 · 冬令營 / 夏令營 魔術指導老師',              type:'機構' },
]

const typeStyle = {
  '學校': 'text-sky-300   border-sky-300/35',
  '公益': 'text-rose-300  border-rose-300/35',
  '機構': 'text-amber-300 border-amber-300/35',
  '講座': 'text-emerald-300 border-emerald-300/35',
}

const globalRegions = [
  { region:'Americas', regionZh:'美洲',   places:['美國','多倫多','拉斯維加斯','舊金山'],                          icon:'🌎' },
  { region:'Asia',     regionZh:'亞洲',   places:['中國','香港','澳門','泰國','馬來西亞','新加坡','韓國'],         icon:'🌏' },
  { region:'Oceania',  regionZh:'大洋洲', places:['澳洲（雪梨）'],                                                 icon:'🌏' },
  { region:'Europe',   regionZh:'歐洲',   places:['英國'],                                                         icon:'🌍' },
]

const teachingPhotos = ['perf_61.jpg','perf_63.jpg','perf_64.jpg','perf_65.jpg','perf_66.jpg','perf_67.jpg']

export default function Teaching() {
  const titleRef  = useRef(null)
  const inView    = useInView(titleRef,  { once: true, margin: '-80px' })
  const globalRef = useRef(null)
  const globalInView = useInView(globalRef, { once: true, margin: '-80px' })

  return (
    <section id="teaching" className="py-24 md:py-32 w-full">
      <div className="section-wrap">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-14">
          <motion.span initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} className="section-label mb-5">
            Teaching Experience
          </motion.span>
          <motion.h2 initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:0.8, delay:0.1 }}
            className="section-title text-gold-gradient mt-4">教學經歷</motion.h2>
          <div className="gold-divider" />
        </div>

        {/* Teaching photo carousel */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{ once:true }} transition={{ duration:0.9 }}
          className="mb-12 relative max-w-2xl mx-auto">
          <div className="absolute -inset-[3px] border border-[#c9a94b]/28 pointer-events-none z-10" />
          <span className="frame-corner tl z-20" /><span className="frame-corner tr z-20" />
          <span className="frame-corner bl z-20" /><span className="frame-corner br z-20" />
          <PhotoCarousel images={teachingPhotos} aspect="aspect-[16/7]" interval={2800} />
        </motion.div>

        {/* Teaching list */}
        <div className="max-w-3xl mx-auto mb-28">
          {teachingHistory.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:-24 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:0.5, delay:i*0.04 }}
              className="flex items-start gap-5 py-4 border-b border-white/8 group hover:border-[#c9a94b]/25 transition-colors"
            >
              <span className="font-cinzel text-[#c9a94b]/65 font-bold text-xs w-10 shrink-0 pt-0.5 tracking-wide">{item.year}</span>
              <span className="text-white/78 text-[15px] leading-relaxed flex-1 group-hover:text-white/90 transition-colors">{item.role}</span>
              <span className={`font-cinzel text-[8px] tracking-widest uppercase border px-2 py-0.5 shrink-0 ${typeStyle[item.type]}`}>{item.type}</span>
            </motion.div>
          ))}
        </div>

        {/* Global reach */}
        <div ref={globalRef}>
          <div className="text-center mb-14">
            <motion.span initial={{ opacity:0 }} animate={globalInView?{opacity:1}:{}} className="section-label mb-5">
              Global Footprint
            </motion.span>
            <motion.h2 initial={{ opacity:0, y:30 }} animate={globalInView?{opacity:1,y:0}:{}}
              transition={{ duration:0.8, delay:0.1 }}
              className="section-title text-gold-gradient mt-4">全球合作足跡</motion.h2>
            <div className="gold-divider" />
            <motion.p initial={{ opacity:0 }} animate={globalInView?{opacity:1}:{}}
              transition={{ duration:0.8, delay:0.3 }}
              className="font-cormorant text-white/55 text-xl italic mt-5">
              跨越亞、歐、美、大洋洲，豐富的跨國執案經驗
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#c9a94b]/15">
            {globalRegions.map((r, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:36 }} animate={globalInView?{opacity:1,y:0}:{}}
                transition={{ duration:0.7, delay:i*0.1 }}
                className="glass-card border-[#c9a94b]/22 p-8 hover:border-[#c9a94b]/48 hover:bg-[#c9a94b]/5 transition-all duration-500"
              >
                <div className="text-3xl mb-4">{r.icon}</div>
                <h3 className="font-cinzel font-bold text-white text-sm tracking-[0.15em] uppercase mb-1">{r.region}</h3>
                <p className="font-cormorant text-[#c9a94b] text-xl italic mb-4">{r.regionZh}</p>
                <div className="space-y-2">
                  {r.places.map(p => (
                    <div key={p} className="flex items-center gap-2.5 text-white/72 text-[15px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a94b]/55 shrink-0" />{p}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Core services */}
          <motion.div initial={{ opacity:0, y:24 }} animate={globalInView?{opacity:1,y:0}:{}}
            transition={{ duration:0.8, delay:0.45 }}
            className="mt-px glass-card border-[#c9a94b]/22 p-10 text-center">
            <span className="section-label block mb-8">Core Services</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { icon:'🌐', title:'International Shows', zh:'全球電視節目、大型舞台公演' },
                { icon:'✨', title:'Bespoke Design',      zh:'品牌活動專屬魔術、高度客製化設計' },
                { icon:'🎓', title:'Keynote & Workshop',  zh:'法人機構教學、創意啟發演講' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <h4 className="font-cinzel text-white font-bold text-xs tracking-[0.18em] uppercase mb-3">{s.title}</h4>
                  <p className="text-white/65 text-[15px] leading-relaxed">{s.zh}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
