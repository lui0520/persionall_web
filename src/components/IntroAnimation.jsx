import { useEffect, useRef, useState } from 'react'

const GIF_DURATION = 1650  // 稍早於一個循環結束（1680ms），確保捕捉最後一幀
const FADE_OUT     = 1000

export default function IntroAnimation({ onComplete }) {
  const gifRef    = useRef(null)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      // 將 GIF 當前幀凍結為靜態圖，停止動畫繼續播放
      const gif = gifRef.current
      if (gif) {
        try {
          const offscreen = document.createElement('canvas')
          offscreen.width  = gif.naturalWidth  || gif.offsetWidth  || 800
          offscreen.height = gif.naturalHeight || gif.offsetHeight || 800
          offscreen.getContext('2d').drawImage(gif, 0, 0, offscreen.width, offscreen.height)
          gif.src = offscreen.toDataURL('image/png')  // 換成靜態 PNG，動畫停止
        } catch (_) { /* 同源問題時直接略過，照常淡出 */ }
      }
      setExiting(true)
      setTimeout(onComplete, FADE_OUT)
    }, GIF_DURATION)

    return () => clearTimeout(timer)
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
      <img
        ref={gifRef}
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
