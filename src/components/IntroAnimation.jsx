import { useEffect, useRef, useState } from 'react'

const FRAME_COUNT = 61
const PREFIX = '/images/animation/frame-'
const FPS = 24

function buildFrames() {
  return Array.from({ length: FRAME_COUNT }, (_, i) => `${PREFIX}${i}.png`)
}

export default function IntroAnimation({ onComplete }) {
  const canvasRef = useRef(null)
  const [exiting, setExiting] = useState(false)
  const framesRef = useRef([])
  const frameIndexRef = useRef(0)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(null)

  useEffect(() => {
    const urls = buildFrames()
    let loaded = 0
    const images = urls.map((src) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        loaded++
        if (loaded === FRAME_COUNT) startAnimation()
      }
      img.onerror = () => {
        loaded++
        if (loaded === FRAME_COUNT) startAnimation()
      }
      return img
    })
    framesRef.current = images

    function startAnimation() {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      const interval = 1000 / FPS

      function draw(timestamp) {
        if (!lastTimeRef.current) lastTimeRef.current = timestamp
        const elapsed = timestamp - lastTimeRef.current

        if (elapsed >= interval) {
          lastTimeRef.current = timestamp - (elapsed % interval)
          const idx = frameIndexRef.current
          const img = framesRef.current[idx]
          if (img.complete) {
            canvas.width = img.naturalWidth || canvas.offsetWidth
            canvas.height = img.naturalHeight || canvas.offsetHeight
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          }
          frameIndexRef.current = idx + 1
          if (frameIndexRef.current >= FRAME_COUNT) {
            setExiting(true)
            setTimeout(() => onComplete(), 600)
            return
          }
        }
        rafRef.current = requestAnimationFrame(draw)
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [onComplete])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exiting ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: 'translateX(8%)',
        }}
      />
    </div>
  )
}
