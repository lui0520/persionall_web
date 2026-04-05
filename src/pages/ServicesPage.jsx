// 「服務項目」完整頁面
// 包含所有服務子項目，每個卡片有獨立 id 供 anchor 跳轉

import Services from '../components/Services'

export default function ServicesPage({ setActivePage }) {
  return (
    <div id="services">
      <Services setActivePage={setActivePage} />
    </div>
  )
}
