import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Highlights() {
  const reelsRef = useRef(null)
  const footRef  = useRef(null)
  const reelsInView = useInView(reelsRef, { once: true, margin: '-80px' })
  const footInView  = useInView(footRef,  { once: true, margin: '-80px' })

  return (
    <section className="py-24 md:py-32 w-full">
      <div className="section-wrap">

        {/* ── 花絮 ── */}
        <div id="reels" ref={reelsRef} className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} animate={reelsInView ? { opacity: 1 } : {}}
            className="section-label mb-5">Performance Reels</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={reelsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title mt-4">花絮</motion.h2>
          <div className="gold-divider" />
          <motion.p initial={{ opacity: 0 }} animate={reelsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-cormorant text-[#1a1a1a]/50 text-xl italic mt-8 max-w-lg mx-auto">
            各地演出照片與影片集錦，內容建置中。
          </motion.p>
        </div>

        <div className="border-t border-black/8 my-20" />

        {/* ── 足跡 ── */}
        <div id="footprint" ref={footRef} className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} animate={footInView ? { opacity: 1 } : {}}
            className="section-label mb-5">Global Footprint</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={footInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title mt-4">足跡</motion.h2>
          <div className="gold-divider" />
          <motion.p initial={{ opacity: 0 }} animate={footInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-cormorant text-[#1a1a1a]/50 text-xl italic mt-8 max-w-lg mx-auto">
            世界地圖標記，內容建置中。
          </motion.p>
        </div>

      </div>
    </section>
  )
}
