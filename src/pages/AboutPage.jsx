// 「關於彈彈」完整頁面
// 包含：關於彈彈 / 魔術師介紹 / 合作過的品牌
// 每個子區塊有獨立 id，供 Navbar 下拉選單 anchor 跳轉使用

import About from '../components/About'
import Intro from '../components/Intro'
import Brands from '../components/Brands'

export default function AboutPage({ setActivePage }) {
  return (
    <>
      <div id="about">
        <About setActivePage={setActivePage} />
      </div>
      <div id="intro" className="border-t border-black/8">
        <Intro />
      </div>
      <div id="brands" className="border-t border-black/8">
        <Brands />
      </div>
    </>
  )
}
