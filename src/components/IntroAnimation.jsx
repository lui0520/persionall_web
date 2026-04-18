import { useEffect, useRef, useState } from 'react'

const GIF_DURATION    = 2500  // ms — 調整此值以符合 GIF 實際時長
const PARTICLE_DURATION = 550
const LOGO_HOLD       = 1100
const FADE_OUT        = 600

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
      if (a < 60 || (r > 230 && g > 230 && b > 230)) continue
      candidates.push({ x, y })
    }
  }

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

export default function IntroAnimation({ onComplete }) {
  const gifRef    = useRef(null)
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const [phase, setPhase] = useState('playing')

  useEffect(() => {
    const timer = setTimeout(startParticles, GIF_DURATION)
    return () => {
      clearTimeout(timer)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  function startParticles() {
    const gif    = gifRef.current
    const canvas = canvasRef.current
    if (!gif || !canvas) return

    const w = gif.naturalWidth  || gif.offsetWidth  || 800
    const h = gif.naturalHeight || gif.offsetHeight || 800
    canvas.width  = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    ctx.drawImage(gif, 0, 0, w, h)

    const particles = sampleParticles(canvas)
    setPhase('particles')

    const t0 = performance.now()
    function animate(now) {
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
        rafRef.current = requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setPhase('logo')
        setTimeout(() => {
          setPhase('exiting')
          setTimeout(onComplete, FADE_OUT)
        }, LOGO_HOLD)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
  }

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

      {/* GIF */}
      <img
        ref={gifRef}
        src="/images/animation/animation_clean.gif"
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'contain',
          transform: 'translateX(5%)',
          opacity: phase === 'playing' ? 1 : 0,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
        }}
      />

      {/* 粒子 canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          transform: 'translateX(5%)',
          opacity: phase === 'particles' ? 1 : 0,
          pointerEvents: 'none',
        }}
      />

      {/* Logo */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: isLogo ? 1 : 0,
        transition: 'opacity 0.25s ease',
        pointerEvents: 'none',
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
