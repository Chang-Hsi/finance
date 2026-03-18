# Layout 設計說明（目前版本）

## 目標

- 以 Yahoo Finance 風格為參考，先完成可用的版面骨架與視覺層級。
- 第一階段只做前端靜態資料，不處理 API 串接與商業邏輯。
- 使用 `Vuetify + Tailwind`，並遵守專案字級規範。

## 檔案對應

- `app/layouts/default.vue`：Nuxt 預設 layout 入口，包裝 `DefaultLayout`。
- `app/layouts/DefaultLayout.vue`：整體骨架（Header + Banner + 主內容 + Aside）。
- `app/layouts/DefaultHeader.vue`：雙層頂部導覽與搜尋列。
- `app/layouts/DefaultBanner.vue`：市場橫幅（指數/期貨/商品卡列）。
- `app/layouts/DefaultAside.vue`：右側資訊欄（Quote Lookup、Trending、Portfolio 等）。

## 結構分區

1. Header（固定頂部）
- 上層：品牌、搜尋欄、快捷導覽、通知與登入按鈕。
- 下層：主導航列（My Portfolio / News / Markets...）。
- 視覺：淺灰背景，底部綠色強調線。

2. Banner（Header 下方，非固定）
- 顯示市場卡列（例如 S&P Futures、Dow Futures、Bitcoin）。
- 可橫向滑動，桌機右側顯示切換箭頭。

3. Content（主要內容區）
- 左側主區：頁面內容插槽（`<slot />`）。
- 右側 Aside：固定資訊卡組。
- 比例：桌機為主區優先（85%）+ 側欄（15%，設最小寬度）。

4. Aside（資訊輔助區）
- Quote Lookup
- Trending tickers
- Portfolio（登入引導）
- Recently viewed
- Top gainers

## 響應式規則

- `lg` 以上：雙欄佈局，右側 Aside 顯示在主內容右側。
- `lg` 以下：改為單欄，Aside 移到主內容下方。
- Header 次導覽可橫向滾動，避免小螢幕擠壓。

## 技術規則

1. 使用 `Vuetify` 元件
- 目前使用：`v-text-field`、`v-btn`、`v-icon`、`v-card`。

2. 使用 Tailwind utility class
- 不使用自訂像素字級。
- 字級僅允許：`text-xs / text-sm / text-base / text-lg / text-xl`。

3. 目前資料來源
- 所有顯示資料均為靜態 mock（寫在元件 `script setup` 內）。
- 後續可搬移到 `mocks` + `composables`，不改 layout 結構。

## 待後續確認

1. Header 固定高度與 Banner 高度是否要再微調（目前偏緊湊）。
2. Aside 各卡片資訊密度是否符合首頁閱讀習慣。
3. 主內容區與右側欄位分隔線粗細與留白節奏。
