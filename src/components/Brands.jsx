import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Brands() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="brands" className="py-24 md:py-32 w-full">
      <div className="section-wrap">
        <div ref={ref} className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="section-label mb-5">Brand Collaborations</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title mt-4">合作過的品牌</motion.h2>
          <div className="gold-divider" />
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-cormorant text-[#1a1a1a]/50 text-xl italic mt-8 max-w-lg mx-auto">
            內容建置中，敬請期待。
          </motion.p>
        </div>
      </div>
    </section>
  )
}
