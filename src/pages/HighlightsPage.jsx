// 「花絮 & 足跡」完整頁面
// 包含：花絮 / 足跡
// 每個子區塊有獨立 id，供 Navbar 下拉選單 anchor 跳轉使用

import Highlights from '../components/Highlights'

export default function HighlightsPage({ setActivePage }) {
  return (
    <div id="highlights">
      <Highlights setActivePage={setActivePage} />
    </div>
  )
}
