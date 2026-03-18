# TW Market Pulse

一個以台灣市場資料為核心的前端作品專案，目標是用免費公開資料做出清楚、可延伸的市場儀表板。

## 開發環境

- Package manager: `pnpm`
- 安裝依賴：`pnpm install`
- 本機開發：`pnpm dev`

## 開發框架與技術

- `Nuxt 4`（Vue 全端框架）
- `Vue 3`
- `Vuetify 4`（UI 元件）
- `Tailwind CSS`
- `Pinia`（狀態管理）
- `Axios`（HTTP 請求）
- `Nitro server routes`（`/server/api` 後端 API 路由，第二階段再啟用）

## 圖形技術地圖（Charts-focused）

本專案的圖形視覺化採「多技術分工」：

1. `lightweight-charts`
   用途：高互動金融時間序列圖（K 線、成交量、區間切換、crosshair、全螢幕、指標疊加）。
   主要場景：股市/期貨報價與研究圖。
   主要檔案：
   - `app/components/stocks/Summary.vue`
   - `app/components/stocks/Chart.vue`
   - `app/pages/research.vue`
   - `app/components/charts/SparklineChart.vue`（右側欄位迷你走勢）

2. `vue-echarts` + `echarts`
   用途：產業/板塊視覺化（Treemap 熱圖）與比較圖（Line），適合多維度分類與權重呈現。
   主要場景：產業（Sectors）與子產業、公司熱圖與報酬比較。
   主要檔案：
   - `app/components/markets/Sectores.vue`
   - `app/pages/markets/sectors/index.vue`

3. 自製 SVG Sparkline（非 ECharts / 非 lightweight）
   用途：極輕量小型趨勢線，嵌入表格密集區塊。
   主要場景：World Indices / Assets 列表中的小趨勢圖。
   主要檔案：
   - `app/components/markets/MiniSparkline.vue`
   - `app/components/markets/MarketsTableGroup.vue`
   - `app/pages/markets/world-indices/index.vue`
   - `app/pages/markets/assets/index.vue`

### 圖形分工原則

1. 需要交易圖互動（縮放、十字線、多圖型切換）時，使用 `lightweight-charts`。
2. 需要分類層級與熱區面積表現（Sector/Industry/Company 熱圖）時，使用 `vue-echarts`。
3. 需要大量列表內小圖、追求效能與可控樣式時，使用 `SVG sparkline`。

## UI 規則（字級）

- 本專案全部使用標準 Tailwind 級距：`text-xs / text-sm / text-base / text-lg / text-xl`。

## 專案目的

- 用免費且可公開取得的資料，建立台股市場視覺化作品。
- 不追求即時逐筆，優先做「可閱讀、可比較、可延伸」的市場資訊頁。
- 先完成穩定資料流與頁面結構，再逐步補上更多分析模組。

## 前期開發策略（已確認）

1. 第一階段先專注前端，不處理後端與 API 串接。
2. 所有資料先用靜態資料完成畫面與互動。
3. `pages` 僅負責畫面組件拼接，不放主要商業邏輯。
4. 畫面內容由 `components` 組成，資料透過 `composables` 取得。
5. 靜態資料集中在 `app/mocks`，避免分散在各頁。
6. 第二階段再評估哪些區塊改為後端提供資料，後端再向第三方 API 取資料。
7. 目標是前端完成後，可低成本切換資料來源，不重寫頁面結構。

## 企劃先行原則（已確認）

1. 先完成資訊架構、sitemap、頁面責任與資料欄位定義，再開始開發。
2. 未定版的功能只討論、不實作。
3. 開發順序以「企劃確認版本」為唯一依據，避免超前進度。
4. 任何新增頁面或路由，需先在 README 企劃段落補上用途與對應資料來源。

## 首頁卡片導流規格（已確認）

首頁所有子卡片都必須可點擊，且需導向內頁，不做純展示卡。

1. 新聞卡片 -> `/news/[slug]`（詳情頁）
2. 個股代號卡片（trending/watchlist/movers item） -> `/stocks/[symbol]`（詳情頁）
3. 市場指數卡片 -> `/markets/[market]`（主題頁）
4. 市場指標卡片（成交值、上漲下跌家數等） -> `/market/metrics/[metric]`（主題頁）
5. 法人摘要卡片 -> `/market/institutions`（主題頁）
6. 融資融券摘要卡片 -> `/market/margin`（主題頁）

## 資料來源策略（免費優先）

目前優先考慮：

- TWSE OpenAPI: https://openapi.twse.com.tw/
- TPEx OpenAPI: https://www.tpex.org.tw/openapi/

備註：

- 兩者 Swagger 目前皆可直接存取，且 schema 未看到 API key 驗證欄位。
- 官方條款有保留服務調整與資料使用規範，實作時需在頁面標示資料來源並遵守條款。

## Sitemap 企劃草案（待確認）

> 這是企劃版本草案，確認後才進入開發。

1. `/` 市場總覽  
   內容：首頁導流樞紐，所有子卡片可點擊進內頁。
2. `/news/[slug]` 新聞詳情  
   內容：靜態新聞內容、來源、時間、相關標籤。
3. `/stocks` 個股清單與搜尋  
   內容：代號、名稱、收盤、漲跌、成交量，支援排序與關鍵字查詢。
4. `/stocks/[symbol]` 個股詳情  
   內容：歷史日資料（價格/量）、估值指標（若來源可得）、法人/融資融券摘要（若來源可得）。
5. `/markets/[market]` 市場主題頁  
   內容：單一市場或指數群組的摘要與延伸資訊。
6. `/market/metrics/[metric]` 市場指標主題頁  
   內容：特定指標（成交值、漲跌家數等）的定義與時間序列。
7. `/market/institutions` 法人籌碼  
   內容：三大法人買賣超（可做市場與個股兩層）。
8. `/market/margin` 融資融券  
   內容：融資融券餘額與變化。
9. `/about-data` 資料來源與更新說明  
   內容：API 來源、更新頻率、欄位定義、免責聲明。

## 專案架構定稿（v1）

> 本段為第一版定稿，後續若調整，先更新 README 再實作。

### 1) 目錄分層

```text
app/
  pages/                      # 路由入口層（只做組件拼接）
    index.vue
    news/[slug].vue
    stocks/index.vue
    stocks/[symbol].vue
    markets/[market].vue
    market/metrics/[metric].vue
    market/institutions.vue
    market/margin.vue
    about-data.vue

  components/
    home/                     # 首頁專用區塊元件
      HomeView.vue            # 首頁頁面組裝元件
    news/                     # 新聞區塊元件
      NewsDetailView.vue      # 新聞詳情頁面組裝元件
    stocks/                   # 個股區塊元件
      StocksListView.vue      # 個股列表頁面組裝元件
      StockDetailView.vue     # 個股詳情頁面組裝元件
    market/                   # 市場區塊元件
      MarketTopicView.vue     # 市場主題頁面組裝元件
      MetricTopicView.vue     # 市場指標主題頁面組裝元件
      InstitutionsView.vue    # 法人頁面組裝元件
      MarginView.vue          # 融資融券頁面組裝元件
    about/                    # 說明頁區塊元件
      AboutDataView.vue       # 資料來源頁面組裝元件
    common/                   # 可重用通用元件

  composables/                # 資料存取與轉換（useXxxData）
    useHomeData.ts
    useNewsData.ts
    useStocksData.ts
    useMarketData.ts

  mocks/                      # 第一階段靜態資料來源
    home.ts
    news.ts
    stocks.ts
    market.ts

  layouts/                    # 版面骨架（下一階段討論定稿）
    default.vue

types/                        # 型別定義
  news.ts
  stock.ts
  market.ts

server/                       # 第二階段啟用（目前不接入前端流程）
```

### 2) 責任邊界（強制）

1. `pages` 只做路由進入點與組件拼接，不寫主要內容與資料邏輯。
2. `components/*/*View.vue` 負責該頁區塊組裝、事件分派、資料綁定。
3. `components/*` 其他子元件以 `props`/`emit` 為主，不直接依賴路由層。
4. `composables` 是資料唯一入口；第一階段讀 `mocks`，第二階段可替換成 API。
5. `mocks` 集中管理靜態資料，不允許把大量資料直接寫在各頁 `script setup`。
6. 卡片導流連結欄位統一使用 `href`，元件統一以 `NuxtLink` 呈現。

### 3) Route 與頁面組件對應

1. `/` -> `components/home/HomeView.vue`
2. `/news/[slug]` -> `components/news/NewsDetailView.vue`
3. `/stocks` -> `components/stocks/StocksListView.vue`
4. `/stocks/[symbol]` -> `components/stocks/StockDetailView.vue`
5. `/markets/[market]` -> `components/market/MarketTopicView.vue`
6. `/market/metrics/[metric]` -> `components/market/MetricTopicView.vue`
7. `/market/institutions` -> `components/market/InstitutionsView.vue`
8. `/market/margin` -> `components/market/MarginView.vue`
9. `/about-data` -> `components/about/AboutDataView.vue`

### 4) 第一階段資料流（靜態）

1. `mocks/*.ts` 定義原始資料。
2. `composables/useXxxData.ts` 轉換成頁面可用格式。
3. 各功能模組內的 `*View.vue` 呼叫 composable 取得資料。
4. `components/*` 接收資料並渲染 UI。

### 5) 第二階段切換原則（保留）

1. `composables` 對外回傳格式不變。
2. 只替換 composable 內部資料來源（`mocks` -> `server/api` -> 第三方 API）。
3. 不重寫 `pages` 與大部分 `components`。

## 目前狀態

- `app/pages/index.vue` 目前仍是空頁模板。
- `server/api/market/overview.get.js` 目前為示意資料，後續可替換成真實 API 整合。

## Quote 靜態資料格式（給 Summary / HistoricalData 共用）

目前個股頁使用：

- 靜態資料檔：`app/data/stockQuoteStatic.js`
- Store：`app/stores/stockQuote.js`

### 資料結構樣板

```js
{
  "CL=F": {
    profile: {
      symbol: "CL=F",
      exchange: "NY Mercantile",
      currency: "USD",
      name: "Crude Oil Apr 26",
      price: "97.30",
      change: "-1.41",
      changePercent: "-1.43%",
      timestamp: "As of 8:08:13 AM EDT. Market Open."
    },
    stats: {
      preSettlement: "--",
      open: "100.93",
      lastPrice: "98.71",
      volume: "164.07k",
      settlementDate: "2026-03-20",
      bid: "97.17",
      dayRange: "96.66 - 102.44",
      ask: "97.23"
    },
    ranges: {
      "1D": {
        intraday: true,
        points: [
          {
            time: 1773622800, // unix seconds
            open: 99.35,
            high: 99.62,
            low: 99.22,
            close: 99.50,
            volume: 1100
          }
        ],
        referenceLines: [
          { price: 98.71, color: "#2f3945", style: "dashed" },
          { price: 97.38, color: "#0a8f69", style: "dashed" }
        ]
      },
      "5D": { ... },
      "1M": { ... },
      "6M": { ... },
      "YTD": { ... },
      "1Y": { ... },
      "5Y": { ... },
      "All": { ... }
    },
    historicalRows: [
      {
        date: "Mar 16, 2026",
        open: "100.93",
        high: "102.44",
        low: "96.66",
        close: "96.97",
        adjClose: "96.97",
        volume: "169,137"
      }
    ]
  }
}
```

### 各欄位用途

1. `profile`: Summary 與 HistoricalData 上方標題列。
2. `stats`: Summary 圖表下方 8 格摘要數據。
3. `ranges`: Summary 圖表資料來源，切換 `1D/5D/1M...` 時直接換這裡的 `points`。
4. `ranges[*].points`: 圖表主資料（OHLCV）；`time` 必須是 unix 秒。
5. `ranges[*].referenceLines`: 右側價格標籤/水平參考線。
6. `historicalRows`: HistoricalData 表格列資料。

### 擴充建議

1. 先維持同一 schema，不改欄位名稱。
2. 只擴大量：`ranges[*].points` 與 `historicalRows`。
3. 若未來改 API，優先保持 store 輸出格式不變，UI 可不重寫。

### 專案介紹
這個專案是一個以財經資訊為核心的前端平台，主旨是把市場資料轉成「可閱讀、可比較、可探索」的視覺化介面。它的目的不是只顯示數字，而是用一致的頁面結構與圖形語言，讓使用者可以在個股、產業、指數與研究場景之間快速切換，理解價格趨勢、資金流向與市場結構。整體以 Nuxt 4 + Vue 3 建構，並搭配 Vuetify、Tailwind、Pinia，先用靜態資料完成可操作的產品形態，後續可平滑切換到真實資料來源。

功能面上，專案已涵蓋股票詳情、歷史資料、新聞、期貨鏈、市場總覽、產業分析、研究圖表與影片頁等模組；每個頁面都圍繞「同一份資料，不同分析視角」設計，讓使用者可以從摘要到深度分析逐層下鑽。像是股票頁提供多時間區間、多圖型切換與全螢幕檢視，市場頁則聚焦跨區域、跨資產與跨產業比較，研究頁進一步整合指標與表格視圖，支援更進階的判讀流程。

這個專案最突出的特點在圖形技術分工。lightweight-charts 負責高互動金融時間序列圖，處理 K 線、成交量、crosshair、區間切換、指標疊加與進階圖表視窗，適合個股與研究場景；vue-echarts + ECharts 負責產業層級的 Treemap 熱圖與比較折線圖，擅長呈現 Sector/Industry/Company 的權重與漲跌結構；而列表中的迷你趨勢圖則以自製 SVG Sparkline 實作，確保在高密度表格中仍有良好效能與可讀性。這種「互動交易圖 + 結構熱圖 + 輕量小圖」的三層架構，正是本專案在財經視覺化上的核心競爭力。

### 專案介紹v2
Yippee Finance | 金融網站
2026/3~Present
這個專案是一個以財經資訊為核心的前端平台，主旨是把市場資料轉成「可閱讀、可比較、可探索」的視覺化介面。整體以 Nuxt 4 + Vue 3 建構，並搭配 Vuetify、Tailwind、Pinia，先用靜態資料完成可操作的產品形態，後續可平滑切換到真實資料來源。
- Nuxt 4 / Vue 3 / Vuetify 4 / Tailwind CSS / Pinia
- 圖形與視覺化技術：
1. lightweight-charts：
   用於股票、期貨、研究頁的高互動金融時間序列圖，支援 K 線、區間切換、成交量、crosshair、全螢幕與技術指標疊加。
2. vue-echarts + ECharts：
   用於市場板塊與產業結構分析，實作 Treemap 熱圖與比較折線圖，呈現 Sector / Industry / Company 的權重與漲跌表現。
3. SVG Sparkline（自製）：
   用於 World Indices / Assets 列表的小型即時趨勢圖，在高密度表格中兼顧效能與可讀性。

