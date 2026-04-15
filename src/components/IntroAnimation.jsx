import { useEffect, useRef, useState } from 'react'

const FRAME_COUNT = 61
const PREFIX = '/images/animation/frame-'
const FPS = 24
const PARTICLE_DURATION = 550  // ms 粒子爆散時長
const LOGO_HOLD = 1100          // ms logo 停留時長
const FADE_OUT = 600            // ms 整體淡出時長

function buildFrames() {
  return Array.from({ length: FRAME_COUNT }, (_, i) => `${PREFIX}${i}.png`)
}

/** 從 canvas 採樣有色像素，回傳粒子初始資料 */
function sampleParticles(canvas, count = 600) {
  const ctx = canvas.getContext('2d')
  const { width, height } = canvas
  const imageData = ctx.getImageData(0, 0, width, height)
  const d = imageData.data
  const step = Math.max(4, Math.floor(Math.sqrt((width * height) / (count * 3))))
  const candidates = []

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const i = (y * width + x) * 4
      const r = d[i], g = d[i + 1], b = d[i + 2], a = d[i + 3]
      // 排除透明 & 白色背景
      if (a < 60 || (r > 230 && g > 230 && b > 230)) continue
      candidates.push({ x, y })
    }
  }

  // 隨機挑選
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[candidates[i], candidates[j]] = [candidates[j], candidates[i]]
  }

  const cx = width / 2
  const cy = height / 2
  const YELLOWS = ['#FFD700', '#FFC107', '#FFEB3B', '#FFA500', '#FF8C00']

  return candidates.slice(0, count).map(({ x, y }) => {
    const dx = x - cx
    const dy = y - cy
    const dist = Math.sqrt(dx * dx + dy * dy) || 1
    const speed = 2.5 + Math.random() * 6
    return {
      x, y,
      vx: (dx / dist) * speed + (Math.random() - 0.5) * 2.5,
      vy: (dy / dist) * speed + (Math.random() - 0.5) * 2.5,
      size: 1.5 + Math.random() * 3.5,
      color: YELLOWS[Math.floor(Math.random() * YELLOWS.length)],
      gravity: 0.06 + Math.random() * 0.06,
    }
  })
}

// phase: 'loading' | 'playing' | 'particles' | 'logo' | 'exiting'

export default function IntroAnimation({ onComplete }) {
  const canvasRef   = useRef(null)
  const rafRef      = useRef(null)
  const framesRef   = useRef([])
  const frameIdxRef = useRef(0)
  const lastTimeRef = useRef(null)
  const [phase, setPhase] = useState('loading')

  useEffect(() => {
    const urls = buildFrames()
    let loaded = 0
    const images = urls.map(src => {
      const img = new Image()
      img.src = src
      img.onload  = () => { if (++loaded === FRAME_COUNT) startPlaying() }
      img.onerror = () => { if (++loaded === FRAME_COUNT) startPlaying() }
      return img
    })
    framesRef.current = images

    /* ── 1. 播放幀序列 ── */
    function startPlaying() {
      setPhase('playing')
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
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
          if (frameIdxRef.current >= FRAME_COUNT) {
            startParticles(canvas, ctx)
            return
          }
        }
        rafRef.current = requestAnimationFrame(draw)
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    /* ── 2. 粒子爆散 ── */
    function startParticles(canvas, ctx) {
      const particles = sampleParticles(canvas)
      setPhase('particles')
      const t0 = performance.now()

      function animateParticles(now) {
        const progress = Math.min((now - t0) / PARTICLE_DURATION, 1)
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.forEach(p => {
          p.x  += p.vx
          p.y  += p.vy
          p.vy += p.gravity
          const alpha = Math.max(0, 1 - progress * 1.3)
          ctx.save()
          ctx.globalAlpha = alpha
          ctx.fillStyle   = p.color
          ctx.shadowColor = p.color
          ctx.shadowBlur  = 6
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animateParticles)
        } else {
          /* ── 3. 顯示 logo ── */
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          setPhase('logo')
          setTimeout(() => {
            setPhase('exiting')
            setTimeout(onComplete, FADE_OUT)
          }, LOGO_HOLD)
        }
      }
      rafRef.current = requestAnimationFrame(animateParticles)
    }

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [onComplete])

  const isLogo    = phase === 'logo' || phase === 'exiting'
  const isExiting = phase === 'exiting'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: isExiting ? 0 : 1,
      transition: `opacity ${FADE_OUT}ms ease`,
      pointerEvents: isExiting ? 'none' : 'auto',
    }}>

      {/* 幀序列 + 粒子 canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%', height: '100%',
          objectFit: 'contain',
          transform: 'translateX(5%)',
          opacity: isLogo ? 0 : 1,
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Logo 覆蓋層 */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        opacity: isLogo ? 1 : 0,
        transition: 'opacity 0.25s ease',
        pointerEvents: 'none',
        gap: 0,
      }}>
        <img
          src="/images/animation/logo.png"
          alt="彈彈"
          style={{
            width: 'clamp(80px, 20vw, 200px)',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>

    </div>
  )
}
