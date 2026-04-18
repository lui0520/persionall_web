import { useEffect, useRef, useState } from 'react'

const GIF_DURATION = 1650  // 略早於一個循環（1680ms），捕捉最後一幀
const FADE_OUT     = 1000

export default function IntroAnimation({ onComplete }) {
  const gifRef                    = useRef(null)
  const [frozenSrc, setFrozenSrc] = useState(null)  // 靜態截圖 dataURL
  const [exiting,   setExiting]   = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      // 將 GIF 當前幀截成靜態 PNG
      const gif = gifRef.current
      let dataURL = null
      if (gif) {
        try {
          const c = document.createElement('canvas')
          c.width  = gif.naturalWidth  || gif.offsetWidth  || 800
          c.height = gif.naturalHeight || gif.offsetHeight || 800
          c.getContext('2d').drawImage(gif, 0, 0, c.width, c.height)
          dataURL = c.toDataURL('image/png')
        } catch (_) { /* 同源問題時直接淡出 */ }
      }
      // 同一 render：顯示靜態幀、隱藏 GIF、開始淡出
      setFrozenSrc(dataURL)
      setExiting(true)
      setTimeout(onComplete, FADE_OUT)
    }, GIF_DURATION)

    return () => clearTimeout(timer)
  }, [onComplete])

  const imgStyle = {
    position: 'absolute', inset: 0,
    width: '100%', height: '100%',
    objectFit: 'contain',
    transform: 'translateX(5%)',
    pointerEvents: 'none',
  }

  return (
    <div style={{
      position: 'fixed',
      top: '5rem', left: 0, right: 0, bottom: 0,
      zIndex: 9999,
      background: '#fff',
      opacity: exiting ? 0 : 1,
      transition: `opacity ${FADE_OUT}ms ease-in`,
      pointerEvents: exiting ? 'none' : 'auto',
    }}>
      {/* 動畫 GIF：凍結後立即隱藏 */}
      <img
        ref={gifRef}
        src="/images/animation/animation_clean.gif"
        alt=""
        style={{ ...imgStyle, opacity: frozenSrc ? 0 : 1 }}
      />
      {/* 凍結幀：蓋在 GIF 上，讓淡出期間畫面靜止 */}
      {frozenSrc && (
        <img src={frozenSrc} alt="" style={imgStyle} />
      )}
    </div>
  )
}
