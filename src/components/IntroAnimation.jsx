import { useEffect, useState } from 'react'

const GIF_DURATION = 2500  // ms — 調整此值以符合 GIF 實際時長
const FADE_OUT     = 600

export default function IntroAnimation({ onComplete }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true)
      setTimeout(onComplete, FADE_OUT)
    }, GIF_DURATION)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: exiting ? 0 : 1,
      transition: `opacity ${FADE_OUT}ms ease`,
      pointerEvents: exiting ? 'none' : 'auto',
    }}>
      <img
        src="/images/animation/animation_clean.gif"
        alt=""
        style={{
          width: '100%', height: '100%',
          objectFit: 'contain',
          transform: 'translateX(5%)',
        }}
      />
    </div>
  )
}
