import { useEffect, useRef, useState } from 'react'

const FRAME_COUNT = 56
const PREFIX      = '/images/animation/frame-'
const FPS         = 24
const FADE_OUT    = 1000

function buildFrames() {
  return Array.from({ length: FRAME_COUNT }, (_, i) => `${PREFIX}${i}.png`)
}

export default function IntroAnimation({ onComplete }) {
  const canvasRef   = useRef(null)
  const framesRef   = useRef([])
  const frameIdxRef = useRef(0)
  const rafRef      = useRef(null)
  const lastTimeRef = useRef(null)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const urls = buildFrames()
    let loaded = 0

    const images = urls.map(src => {
      const img = new Image()
      img.src = src
      img.onload  = () => { if (++loaded === FRAME_COUNT) start() }
      img.onerror = () => { if (++loaded === FRAME_COUNT) start() }
      return img
    })
    framesRef.current = images

    function start() {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx      = canvas.getContext('2d')
      const interval = 1000 / FPS

      function draw(ts) {
        if (!lastTimeRef.current) lastTimeRef.current = ts
        const elapsed = ts - lastTimeRef.current

        if (elapsed >= interval) {
          lastTimeRef.current = ts - (elapsed % interval)
          const idx = frameIdxRef.current
          const img = framesRef.current[idx]
          if (img.complete) {
            canvas.width  = img.naturalWidth  || canvas.offsetWidth
            canvas.height = img.naturalHeight || canvas.offsetHeight
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          }
          frameIdxRef.current = idx + 1

          // 播到最後一幀：canvas 停在該幀，開始淡出
          if (frameIdxRef.current >= FRAME_COUNT) {
            setExiting(true)
            setTimeout(onComplete, FADE_OUT)
            return
          }
        }
        rafRef.current = requestAnimationFrame(draw)
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed',
      top: '5rem', left: 0, right: 0, bottom: 0,
      zIndex: 9999,
      background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: exiting ? 0 : 1,
      transition: `opacity ${FADE_OUT}ms ease-in`,
      pointerEvents: exiting ? 'none' : 'auto',
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%', height: '100%',
          objectFit: 'contain',
          transform: 'translateX(5%)',
        }}
      />
    </div>
  )
}
