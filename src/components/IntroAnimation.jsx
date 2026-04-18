import { useEffect, useState } from 'react'

const GIF_DURATION = 1680  // 56 frames × 30ms = 一次完整播放
const FADE_OUT     = 1000  // 稍慢的淡出

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
      position: 'fixed',
      top: '5rem',        // 不遮住 Navbar（Navbar 高度 = 5rem / 80px）
      left: 0, right: 0, bottom: 0,
      zIndex: 9999,
      background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: exiting ? 0 : 1,
      transition: `opacity ${FADE_OUT}ms ease-in`,
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
