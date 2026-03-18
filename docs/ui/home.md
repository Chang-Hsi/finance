# Home UI 設計說明（目前落地版）

## 目標

- 依照參考圖完成 Yahoo Finance 風格首頁。
- 首頁由 `index.vue` 只做組件拼接，不放內容邏輯。
- 第一階段全部使用靜態資料。

## 檔案對應

- `app/pages/index.vue`
- `app/components/home/HeroSection.vue`
- `app/components/home/VideoSection.vue`
- `app/components/home/ListSection.vue`

## 目前頁面結構

1. HeroSection（上區塊）
- 左欄：主新聞大圖 + 標題 + 摘要 + tags。
- 左欄下方：兩張次要新聞卡。
- 中欄：一張焦點新聞 + 多則文字列表 + View More。
- 右欄：Latest 直式列表（每則含來源/時間/tags）。

2. VideoSection（中區塊）
- 左欄：主影片播放器（`<video controls>`）+ 標題摘要。
- 右欄：影片列表（縮圖/標題/來源/時間/標籤）。
- 互動：點擊右欄項目可切換左側主影片。
- 影片來源：`public/videos/v1.mp4 ~ v4.mp4`。

3. ListSection（下區塊）
- 左欄：More News 長列表（圖 + 標題 + 來源時間 + tags）。
- 右欄：訂閱卡（Email input + Subscribe 按鈕）。

## 視覺與技術規範（現況）

- 使用 `Vuetify + Tailwind`。
- 字級遵循專案規則：`text-xs / text-sm / text-base / text-lg / text-xl`。
- 卡片、分隔線、留白以參考圖風格為主（灰底 + 細邊框 +列表分隔）。

## 補充

- 目前資料皆寫在各 section 元件的 `script setup` 靜態陣列。
- 後續可搬移到 `app/mocks` + `composables`，不改首頁結構。
