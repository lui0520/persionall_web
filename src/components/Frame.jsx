/**
 * Frame — 相框元件
 *
 * Props:
 *   src         string   圖片路徑
 *   alt         string   alt 文字
 *   width       string   相框寬度，任何 CSS 值，e.g. '320px' / '40vw' / '100%'
 *   height      string   相框高度，任何 CSS 值，e.g. '420px' / '60vh'
 *   offsetX     number   圖片水平偏移 %（正值→右移，負值→左移），預設 0
 *   offsetY     number   圖片垂直偏移 %（正值→下移，負值→上移），預設 0
 *   className   string   額外 class（套用在外框）
 *   imgStyle    object   額外 inline style（套用在 img）
 *   children    node     可疊加在圖片上方的內容（如標籤、漸層）
 */
export default function Frame({
  src,
  alt = '',
  width = '320px',
  height = '400px',
  offsetX = 0,
  offsetY = 0,
  className = '',
  imgStyle = {},
  children,
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: `calc(50% + ${offsetX}%) calc(50% + ${offsetY}%)`,
          ...imgStyle,
        }}
      />
      {children}
    </div>
  )
}
