import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PhotoCarousel from './PhotoCarousel'

const events = [
  { year: '2017',    title: "America's Got Talent",  titleZh: '美國達人秀',             role: '魔術顧問 · 後台執行 · 道具製作',    tags: ['美國','NBC','國際'],           images: ['agt/agt_11.jpg','agt/agt_12.jpg','agt/agt_04.jpg','agt/agt_09.jpg'],                    desc: '協助魔術師 Will Tsai 創作關鍵道具，包含硬幣魔術與冰塊變金魚效果，現場側台執行。評審 Howie Mandel 稱讚不已。' },
  { year: '2017',    title: 'TVB Ultimate Street Magic', titleZh: 'TVB 終極街頭魔法王',   role: '魔術顧問 · 現場拍攝指導 · 效果創作', tags: ['香港','TVB','電視節目'],         images: ['tvb2017/tvb2017_05.jpg','tvb2017/tvb2017_07.jpg','tvb2017/tvb2017_09.jpg','tvb2017/tvb2017_11.jpg'],     desc: '製作10集魔術節目，負責80%魔術創作，共創作120個以上全新魔術效果。' },
  { year: '2017–18', title: 'Jay Chou — Jokers',     titleZh: '周杰倫 周遊記',           role: '魔術道具設計 · 製作',                tags: ['周杰倫','社群媒體','道具設計'],   images: ['jaychou/jaychou_03.jpg','jaychou/jaychou_05.jpg','jaychou/jaychou_07.jpg','jaychou/jaychou_09.jpg'],     desc: '6小時內完成巴黎鐵塔消失明信片，5小時內完成「阿信變杰倫」五月天專輯道具。' },
  { year: '2018',    title: 'CCTV New Year Gala',    titleZh: '央視 我們一起上春晚',     role: '魔術顧問 · 魔術舞台總監',            tags: ['央視','春晚','直播'],            images: ['cctv2018/cctv2018_01.jpg','cctv2018/cctv2018_03.jpg','cctv2018/cctv2018_04.jpg','cctv2018/cctv2018_05.jpg'], desc: '執行水果交換魔術：柳橙切開後是酪梨，火龍果切開後是柳橙。奠定電視節目魔術視覺概念的重大嘗試。' },
  { year: '2018',    title: 'The Infinity — Macao',  titleZh: 'Louis Yan 澳門5000人公演', role: '魔術顧問 · 舞台總監',                tags: ['澳門','5000人','世界巡迴'],       images: ['infinity/infinity_02.jpg','infinity/infinity_03.jpg','infinity/infinity_05.jpg','infinity/infinity_07.jpg'],  desc: '5000人售票世界巡迴公演澳門站，帶領後台Crew共同扛起90分鐘節目，0失誤 Good Show。' },
  { year: '2019–23', title: 'Musical — Bitter Life', titleZh: '台灣音樂劇 苦魯人生',     role: '魔術設計 · 顧問',                   tags: ['台灣','音樂劇','舞台設計'],       images: ['musical/musical_01.jpg','musical/musical_03.jpg','musical/musical_05.jpg','musical/musical_07.jpg'],      desc: '為刺點劇團重製魔術流程，設計漂浮帽子與噴牌特效，創造觀眾「後台視角」體驗。' },
  { year: '2022–24', title: 'TVB Anniversary Gala',  titleZh: 'TVB 萬千星輝賀台慶',     role: '魔術顧問 · 舞台總監',                tags: ['TVB','台慶','三年連續'],          images: ['tvb2022/tvb2022_03.jpg','tvb2022/tvb2022_06.jpg','tvb2022/tvb2022_10.jpg','tvb2022/tvb2022_14.jpg'],      desc: '連續三年台慶魔術節目，無論大型幻術或螢幕前觀眾互動，都讓人眼睛為之一亮。' },
  { year: '2024–25', title: 'My Faith World Tour',   titleZh: 'My Faith 世界巡迴',        role: '魔術顧問 · 舞台總監',                tags: ['Las Vegas','SF','千人巡迴'],       images: ['myfaith/myfaith_01.jpg','myfaith/myfaith_02.jpg','myfaith/myfaith_04.jpg','myfaith/myfaith_08.jpg'],      desc: '睽違8年重踏拉斯維加斯劇院，連續6場千人巡迴公演全數 Good Show。17年生涯最大的舞台。' },
]

function TimelineItem({ event }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16,1,0.3,1] }}
      className="flex gap-6 md:gap-10 w-full"
    >
      {/* Year column */}
      <div className="flex flex-col items-center shrink-0 w-14 md:w-20">
        <motion.div
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-3 h-3 rounded-full bg-[#1a1a1a] shadow-[0_0_8px_rgba(0,0,0,0.2)] mt-1.5 shrink-0" />
        <div className="w-px flex-1 bg-gradient-to-b from-black/30 to-transparent mt-2" />
      </div>

      {/* Card */}
      <div className="flex-1 min-w-0 pb-12">
        <span className="font-cinzel text-[#374151] font-bold text-sm tracking-widest mb-3 block">
          {event.year}
        </span>

        <div className="glass-card border-black/10 overflow-hidden hover:border-black/25 transition-all duration-500">

          {/* Carousel top */}
          <div className="relative">
            <div className="absolute -inset-[1px] border border-black/8 pointer-events-none z-10" />
            <PhotoCarousel images={event.images} aspect="aspect-video" interval={3000} />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div>
                <h3 className="font-cinzel font-bold text-[#1a1a1a] tracking-wider mb-1"
                  style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}>
                  {event.title}
                </h3>
                <p className="font-cormorant text-[#1a1a1a]/55 text-xl italic leading-tight">{event.titleZh}</p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                {event.tags.map(t => (
                  <span key={t} className="font-cinzel text-[9px] tracking-widest uppercase px-2.5 py-1 border border-black/18 text-[#374151]/75">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <p className="font-cinzel text-[#374151]/65 text-[10px] tracking-widest uppercase mb-3">{event.role}</p>
            <p className="text-[#1a1a1a]/75 text-[15px] leading-relaxed">{event.desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-24 md:py-32 w-full">
      <div className="section-wrap">

        <div ref={titleRef} className="text-center mb-20">
          <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="section-label mb-5">Significant Experience</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title text-gold-gradient mt-4">
            重要經歷
          </motion.h2>
          <div className="gold-divider" />
        </div>

        <div className="w-full space-y-0">
          {events.map((ev, i) => <TimelineItem key={i} event={ev} />)}
        </div>

      </div>
    </section>
  )
}
