import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * PhotoCarousel
 * Props:
 *   images   – string[]  paths under /images/web/
 *   aspect   – string    tailwind aspect-* class, default "aspect-video"
 *   interval – number    ms between auto-advance, default 3200
 *   className – string
 */
export default function PhotoCarousel({ images = [], aspect = 'aspect-video', interval = 3200, className = '' }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)

  const go = useCallback((next) => {
    setDir(next > idx ? 1 : -1)
    setIdx(next)
  }, [idx])

  useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => {
      setDir(1)
      setIdx(i => (i + 1) % images.length)
    }, interval)
    return () => clearInterval(t)
  }, [images.length, interval])

  if (!images.length) return null

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16,1,0.3,1] } },
    exit:  (d) => ({ opacity: 0, x: d > 0 ? -40 : 40, transition: { duration: 0.4 } }),
  }

  return (
    <div className={`relative overflow-hidden ${aspect} ${className}`}>
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.img
          key={idx}
          src={`${import.meta.env.BASE_URL}images/web/${images[idx]}`}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.88) contrast(1.06)' }}
        />
      </AnimatePresence>

      {/* Gradient overlay bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? 'bg-[#1a1a1a] scale-125' : 'bg-black/25 hover:bg-black/45'
              }`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      <div className="absolute top-2.5 right-3 font-cinzel text-[9px] text-black/40 tracking-widest z-10">
        {idx + 1}/{images.length}
      </div>
    </div>
  )
}
