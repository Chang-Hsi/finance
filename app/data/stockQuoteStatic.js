import dayjs from 'dayjs';

const ts = (iso) => Math.floor(new Date(iso).getTime() / 1000);

/**
 * 輔助函數：將 dailyBars 轉換為 historicalRows 格式
 * 保持 string 格式與 toLocaleString 處理
 */
const toHistoricalRows = (dailyBars) =>
  [...dailyBars]
    .sort((a, b) => b.time - a.time)
    .map((bar) => ({
      date: dayjs.unix(bar.time).format('MMM D, YYYY'),
      open: bar.open.toFixed(2),
      high: bar.high.toFixed(2),
      low: bar.low.toFixed(2),
      close: bar.close.toFixed(2),
      adjClose: bar.close.toFixed(2),
      volume: Number(bar.volume).toLocaleString('en-US'),
    }));

// ==========================================
// 1D: Intraday (每 15-30 分鐘一筆，共約 40 筆)
// ==========================================
const cl1D = [
  { time: ts('2026-03-16T00:00:00Z'), open: 98.71, high: 99.10, low: 98.50, close: 98.90, volume: 800 },
  { time: ts('2026-03-16T00:30:00Z'), open: 98.90, high: 99.35, low: 98.85, close: 99.35, volume: 950 },
  { time: ts('2026-03-16T01:00:00Z'), open: 99.35, high: 99.62, low: 99.22, close: 99.50, volume: 1100 },
  { time: ts('2026-03-16T01:30:00Z'), open: 99.50, high: 99.71, low: 99.43, close: 99.58, volume: 1000 },
  { time: ts('2026-03-16T02:00:00Z'), open: 99.58, high: 99.64, low: 99.42, close: 99.53, volume: 980 },
  { time: ts('2026-03-16T02:30:00Z'), open: 99.53, high: 99.70, low: 99.48, close: 99.65, volume: 1200 },
  { time: ts('2026-03-16T03:00:00Z'), open: 99.65, high: 99.66, low: 99.20, close: 99.32, volume: 1500 },
  { time: ts('2026-03-16T03:15:00Z'), open: 99.32, high: 99.45, low: 99.15, close: 99.25, volume: 1100 },
  { time: ts('2026-03-16T03:30:00Z'), open: 99.25, high: 99.74, low: 99.25, close: 99.58, volume: 1350 },
  { time: ts('2026-03-16T04:00:00Z'), open: 99.58, high: 100.10, low: 99.56, close: 99.89, volume: 1600 },
  { time: ts('2026-03-16T04:30:00Z'), open: 99.89, high: 100.42, low: 99.86, close: 100.28, volume: 1900 },
  { time: ts('2026-03-16T05:00:00Z'), open: 100.28, high: 100.31, low: 99.96, close: 100.08, volume: 1750 },
  { time: ts('2026-03-16T05:30:00Z'), open: 100.08, high: 100.24, low: 100.01, close: 100.16, volume: 1680 },
  { time: ts('2026-03-16T06:00:00Z'), open: 100.16, high: 100.18, low: 99.88, close: 99.93, volume: 1500 },
  { time: ts('2026-03-16T06:30:00Z'), open: 99.93, high: 99.94, low: 99.66, close: 99.72, volume: 1300 },
  { time: ts('2026-03-16T07:00:00Z'), open: 99.72, high: 99.73, low: 99.20, close: 99.28, volume: 1200 },
  { time: ts('2026-03-16T07:30:00Z'), open: 99.28, high: 99.31, low: 98.86, close: 98.95, volume: 1100 },
  { time: ts('2026-03-16T08:00:00Z'), open: 98.95, high: 98.96, low: 98.42, close: 98.48, volume: 1600 },
  { time: ts('2026-03-16T08:30:00Z'), open: 98.48, high: 98.50, low: 97.89, close: 97.38, volume: 2200 },
  { time: ts('2026-03-16T09:00:00Z'), open: 97.38, high: 97.62, low: 97.24, close: 97.55, volume: 2000 },
  { time: ts('2026-03-16T09:30:00Z'), open: 97.55, high: 97.68, low: 97.40, close: 97.49, volume: 1760 },
  { time: ts('2026-03-16T10:00:00Z'), open: 97.49, high: 97.72, low: 97.44, close: 97.61, volume: 1540 },
  { time: ts('2026-03-16T10:30:00Z'), open: 97.61, high: 97.70, low: 97.33, close: 97.44, volume: 1490 },
  { time: ts('2026-03-16T11:00:00Z'), open: 97.44, high: 97.48, low: 97.12, close: 97.22, volume: 1630 },
  { time: ts('2026-03-16T11:30:00Z'), open: 97.22, high: 97.36, low: 97.10, close: 97.28, volume: 1570 },
  { time: ts('2026-03-16T12:00:00Z'), open: 97.28, high: 97.54, low: 97.19, close: 97.45, volume: 1660 },
  { time: ts('2026-03-16T12:30:00Z'), open: 97.45, high: 97.58, low: 97.34, close: 97.53, volume: 1410 },
  { time: ts('2026-03-16T13:00:00Z'), open: 97.53, high: 97.60, low: 97.28, close: 97.34, volume: 1500 },
  { time: ts('2026-03-16T13:30:00Z'), open: 97.34, high: 97.41, low: 97.02, close: 97.16, volume: 1700 },
  { time: ts('2026-03-16T14:00:00Z'), open: 97.16, high: 97.25, low: 96.98, close: 97.08, volume: 1890 },
  { time: ts('2026-03-16T14:30:00Z'), open: 97.08, high: 97.30, low: 97.02, close: 97.21, volume: 1640 },
  { time: ts('2026-03-16T15:00:00Z'), open: 97.21, high: 97.46, low: 97.16, close: 97.41, volume: 1580 },
  { time: ts('2026-03-16T15:30:00Z'), open: 97.41, high: 97.54, low: 97.20, close: 97.31, volume: 1730 },
  { time: ts('2026-03-16T16:00:00Z'), open: 97.31, high: 97.50, low: 97.22, close: 97.48, volume: 1810 },
  { time: ts('2026-03-16T16:30:00Z'), open: 97.48, high: 97.55, low: 97.30, close: 97.35, volume: 1400 },
  { time: ts('2026-03-16T17:00:00Z'), open: 97.35, high: 97.40, low: 97.20, close: 97.30, volume: 1200 },
];

// ==========================================
// 5D: 5-Day Intraday (每 2-4 小時一筆，共約 40 筆)
// ==========================================
const cl5D = [
  { time: ts('2026-03-12T00:00:00Z'), open: 93.20, high: 95.10, low: 92.30, close: 94.70, volume: 12100 },
  { time: ts('2026-03-12T04:00:00Z'), open: 94.70, high: 95.50, low: 94.20, close: 95.10, volume: 8800 },
  { time: ts('2026-03-12T08:00:00Z'), open: 95.10, high: 95.80, low: 94.80, close: 95.40, volume: 9200 },
  { time: ts('2026-03-12T12:00:00Z'), open: 95.40, high: 96.70, low: 95.10, close: 96.10, volume: 13200 },
  { time: ts('2026-03-12T16:00:00Z'), open: 96.10, high: 97.10, low: 95.80, close: 96.50, volume: 10500 },
  { time: ts('2026-03-12T20:00:00Z'), open: 96.50, high: 97.40, low: 96.30, close: 96.80, volume: 9800 },
  { time: ts('2026-03-13T00:00:00Z'), open: 96.80, high: 97.20, low: 95.70, close: 96.20, volume: 10200 },
  { time: ts('2026-03-13T04:00:00Z'), open: 96.20, high: 96.60, low: 95.80, close: 96.00, volume: 8100 },
  { time: ts('2026-03-13T08:00:00Z'), open: 96.00, high: 96.40, low: 95.50, close: 95.70, volume: 7600 },
  { time: ts('2026-03-13T12:00:00Z'), open: 95.70, high: 96.50, low: 94.80, close: 95.20, volume: 8600 },
  { time: ts('2026-03-13T16:00:00Z'), open: 95.20, high: 95.80, low: 94.50, close: 94.90, volume: 7900 },
  { time: ts('2026-03-13T20:00:00Z'), open: 94.90, high: 95.20, low: 93.70, close: 94.40, volume: 8800 },
  { time: ts('2026-03-14T00:00:00Z'), open: 94.40, high: 95.20, low: 93.30, close: 94.90, volume: 7100 },
  { time: ts('2026-03-14T08:00:00Z'), open: 94.90, high: 95.40, low: 94.50, close: 95.10, volume: 5500 },
  { time: ts('2026-03-14T16:00:00Z'), open: 95.10, high: 96.10, low: 94.80, close: 95.60, volume: 6900 },
  { time: ts('2026-03-15T00:00:00Z'), open: 95.60, high: 96.70, low: 95.10, close: 96.20, volume: 7600 },
  { time: ts('2026-03-15T08:00:00Z'), open: 96.20, high: 96.50, low: 95.80, close: 96.30, volume: 6200 },
  { time: ts('2026-03-15T16:00:00Z'), open: 96.30, high: 97.10, low: 96.10, close: 96.70, volume: 8100 },
  { time: ts('2026-03-16T00:00:00Z'), open: 96.70, high: 97.90, low: 96.30, close: 97.10, volume: 9200 },
  { time: ts('2026-03-16T04:00:00Z'), open: 97.10, high: 100.42, low: 97.10, close: 99.89, volume: 12000 },
  { time: ts('2026-03-16T08:00:00Z'), open: 99.89, high: 100.10, low: 97.38, close: 98.48, volume: 15000 },
  { time: ts('2026-03-16T12:00:00Z'), open: 98.48, high: 98.70, low: 97.10, close: 97.45, volume: 11000 },
  { time: ts('2026-03-16T16:00:00Z'), open: 97.45, high: 97.60, low: 97.20, close: 97.48, volume: 9500 },
  { time: ts('2026-03-17T00:00:00Z'), open: 97.48, high: 98.31, low: 97.40, close: 98.11, volume: 11200 },
  { time: ts('2026-03-17T04:00:00Z'), open: 98.11, high: 98.50, low: 98.00, close: 98.25, volume: 8900 },
  { time: ts('2026-03-17T08:00:00Z'), open: 98.25, high: 98.40, low: 97.80, close: 97.96, volume: 9400 },
  { time: ts('2026-03-17T12:00:00Z'), open: 97.96, high: 98.08, low: 97.40, close: 97.55, volume: 9700 },
  { time: ts('2026-03-17T16:00:00Z'), open: 97.55, high: 97.81, low: 97.30, close: 97.42, volume: 8500 },
  { time: ts('2026-03-17T20:00:00Z'), open: 97.42, high: 97.60, low: 97.20, close: 97.31, volume: 9150 },
  { time: ts('2026-03-18T00:00:00Z'), open: 97.31, high: 97.70, low: 96.94, close: 97.18, volume: 9800 },
  { time: ts('2026-03-18T04:00:00Z'), open: 97.18, high: 97.40, low: 97.05, close: 97.25, volume: 7700 },
  { time: ts('2026-03-18T08:00:00Z'), open: 97.25, high: 97.61, low: 96.86, close: 97.40, volume: 10400 },
];

// ==========================================
// 1M: Daily (最近 30 天，日資料)
// ==========================================
const cl1M = [
  { time: ts('2026-02-16T00:00:00Z'), open: 68.11, high: 69.35, low: 67.42, close: 68.84, volume: 418331 },
  { time: ts('2026-02-17T00:00:00Z'), open: 68.84, high: 69.24, low: 67.88, close: 68.06, volume: 395002 },
  { time: ts('2026-02-18T00:00:00Z'), open: 68.06, high: 69.10, low: 67.65, close: 68.92, volume: 401220 },
  { time: ts('2026-02-19T00:00:00Z'), open: 68.92, high: 70.44, low: 68.11, close: 69.98, volume: 422190 },
  { time: ts('2026-02-20T00:00:00Z'), open: 69.98, high: 70.21, low: 68.56, close: 68.73, volume: 386100 },
  { time: ts('2026-02-23T00:00:00Z'), open: 68.73, high: 69.41, low: 67.90, close: 68.20, volume: 372118 },
  { time: ts('2026-02-24T00:00:00Z'), open: 66.31, high: 67.15, low: 65.55, close: 65.63, volume: 312124 },
  { time: ts('2026-02-25T00:00:00Z'), open: 66.07, high: 66.60, low: 65.12, close: 65.42, volume: 306780 },
  { time: ts('2026-02-26T00:00:00Z'), open: 65.65, high: 66.71, low: 63.60, close: 65.21, volume: 498542 },
  { time: ts('2026-02-27T00:00:00Z'), open: 65.35, high: 67.83, low: 64.85, close: 67.02, volume: 437053 },
  { time: ts('2026-03-02T00:00:00Z'), open: 75.00, high: 75.33, low: 69.20, close: 71.23, volume: 881329 },
  { time: ts('2026-03-03T00:00:00Z'), open: 71.23, high: 77.98, low: 70.41, close: 74.56, volume: 1009753 },
  { time: ts('2026-03-04T00:00:00Z'), open: 74.74, high: 77.23, low: 73.28, close: 74.66, volume: 617822 },
  { time: ts('2026-03-05T00:00:00Z'), open: 76.15, high: 82.16, low: 74.97, close: 81.01, volume: 707030 },
  { time: ts('2026-03-06T00:00:00Z'), open: 79.08, high: 92.61, low: 78.24, close: 90.90, volume: 996251 },
  { time: ts('2026-03-09T00:00:00Z'), open: 98.00, high: 119.48, low: 81.19, close: 94.77, volume: 1107193 },
  { time: ts('2026-03-10T00:00:00Z'), open: 85.75, high: 91.48, low: 76.73, close: 83.45, volume: 801564 },
  { time: ts('2026-03-11T00:00:00Z'), open: 86.89, high: 88.99, low: 81.79, close: 87.25, volume: 538020 },
  { time: ts('2026-03-12T00:00:00Z'), open: 89.32, high: 97.19, low: 88.61, close: 95.73, volume: 548999 },
  { time: ts('2026-03-13T00:00:00Z'), open: 96.74, high: 99.32, low: 92.04, close: 98.71, volume: 548999 },
  { time: ts('2026-03-16T00:00:00Z'), open: 100.93, high: 102.44, low: 96.66, close: 96.97, volume: 169137 },
];

// ==========================================
// 6M & YTD & 1Y (長線日資料，共約 150 點)
// ==========================================
const generateDailyPoints = (startDate, count, startPrice, volatility) => {
  const points = [];
  let currPrice = startPrice;
  for (let i = 0; i < count; i++) {
    const date = dayjs(startDate).add(i, 'day');
    const open = currPrice;
    const change = (Math.random() - 0.45) * volatility; // 略微向上趨勢
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * (volatility / 2);
    const low = Math.min(open, close) - Math.random() * (volatility / 2);
    points.push({
      time: ts(date.toISOString()),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.floor(Math.random() * 500000) + 300000,
    });
    currPrice = close;
  }
  return points;
};

// 產生從 2025-03-16 到 2026-02-15 的日資料 (約 330 點)
const clHistoricalBase = generateDailyPoints('2025-03-16T00:00:00Z', 337, 72.50, 2.5);

const cl6M = [...clHistoricalBase.slice(-120), ...cl1M];
const clYTD = [...clHistoricalBase.filter(p => dayjs.unix(p.time).year() === 2026), ...cl1M];
const cl1Y = [...clHistoricalBase, ...cl1M];

// ==========================================
// 5Y & All (更長期的趨勢資料)
// ==========================================
const cl5YBase = [
  { time: ts('2021-03-01T00:00:00Z'), open: 52.31, high: 55.10, low: 49.88, close: 54.21, volume: 920111 },
  { time: ts('2021-06-01T00:00:00Z'), open: 54.21, high: 58.30, low: 53.10, close: 57.50, volume: 940000 },
  { time: ts('2021-09-01T00:00:00Z'), open: 57.50, high: 61.42, low: 56.70, close: 59.88, volume: 960222 },
  { time: ts('2021-12-01T00:00:00Z'), open: 59.88, high: 65.20, low: 58.40, close: 64.10, volume: 980000 },
  { time: ts('2022-03-01T00:00:00Z'), open: 64.10, high: 77.15, low: 63.40, close: 73.22, volume: 1011220 },
  { time: ts('2022-06-01T00:00:00Z'), open: 73.22, high: 82.40, low: 71.50, close: 80.10, volume: 1050000 },
  { time: ts('2022-09-01T00:00:00Z'), open: 80.10, high: 89.90, low: 78.33, close: 85.61, volume: 1081120 },
  { time: ts('2022-12-01T00:00:00Z'), open: 85.61, high: 88.20, low: 81.40, close: 84.30, volume: 1020000 },
  { time: ts('2023-03-01T00:00:00Z'), open: 84.30, high: 92.44, low: 79.21, close: 80.17, volume: 998772 },
  { time: ts('2023-09-01T00:00:00Z'), open: 80.17, high: 88.77, low: 74.11, close: 84.55, volume: 952003 },
  { time: ts('2024-03-01T00:00:00Z'), open: 84.55, high: 90.12, low: 79.42, close: 86.80, volume: 940888 },
  { time: ts('2024-09-01T00:00:00Z'), open: 86.80, high: 91.61, low: 82.21, close: 87.11, volume: 901105 },
  { time: ts('2025-03-01T00:00:00Z'), open: 87.11, high: 89.15, low: 80.66, close: 83.74, volume: 884220 },
];
const cl5Y = [...cl5YBase, ...cl1Y];

const clAll = [
  { time: ts('2016-01-01T00:00:00Z'), open: 31.12, high: 34.41, low: 26.05, close: 29.88, volume: 1200110 },
  { time: ts('2017-01-01T00:00:00Z'), open: 29.88, high: 55.20, low: 28.41, close: 53.02, volume: 1182400 },
  { time: ts('2018-01-01T00:00:00Z'), open: 53.02, high: 76.90, low: 50.33, close: 64.11, volume: 1112000 },
  { time: ts('2019-01-01T00:00:00Z'), open: 64.11, high: 67.02, low: 50.18, close: 61.06, volume: 1074020 },
  { time: ts('2020-01-01T00:00:00Z'), open: 61.06, high: 65.65, low: 18.22, close: 39.88, volume: 1532110 },
  ...cl5Y,
];

// ==========================================
// Historical Rows (表格專用資料，補足 150 筆)
// ==========================================
const clHistoricalDaily = [
  ...cl1Y.slice(-150) // 取最近 150 筆日資料做為表格
];

const buildRanges = () => ({
  '1D': { intraday: true, points: cl1D, referenceLines: [{ price: 98.71, color: '#2f3945', style: 'dashed' }, { price: 97.38, color: '#0a8f69', style: 'dashed' }] },
  '5D': { intraday: true, points: cl5D, referenceLines: [{ price: 97.38, color: '#0a8f69', style: 'dashed' }] },
  '1M': { intraday: false, points: cl1M, referenceLines: [{ price: 97.38, color: '#0a8f69', style: 'dashed' }] },
  '6M': { intraday: false, points: cl6M, referenceLines: [{ price: 97.38, color: '#0a8f69', style: 'dashed' }] },
  'YTD': { intraday: false, points: clYTD, referenceLines: [{ price: 97.38, color: '#0a8f69', style: 'dashed' }] },
  '1Y': { intraday: false, points: cl1Y, referenceLines: [{ price: 97.38, color: '#0a8f69', style: 'dashed' }] },
  '5Y': { intraday: false, points: cl5Y, referenceLines: [{ price: 96.65, color: '#cb2f2f', style: 'dashed' }] },
  'All': { intraday: false, points: clAll, referenceLines: [{ price: 96.68, color: '#cb2f2f', style: 'dashed' }] },
});

const clData = {
  profile: {
    symbol: 'CL=F',
    exchange: 'NY Mercantile',
    currency: 'USD',
    name: 'Crude Oil Apr 26',
    price: '97.30',
    change: '-1.41',
    changePercent: '-1.43%',
    timestamp: 'As of 8:08:13 AM EDT. Market Open.',
  },
  stats: {
    preSettlement: '98.71',
    open: '100.93',
    lastPrice: '98.71',
    volume: '164.07k',
    settlementDate: '2026-03-20',
    bid: '97.17',
    dayRange: '96.66 - 102.44',
    ask: '97.23',
  },
  ranges: buildRanges(),
  historicalRows: toHistoricalRows(clHistoricalDaily),
};

const clone = (value) => JSON.parse(JSON.stringify(value));

export const stockQuoteStatic = {
  'CL=F': clData,
  NVDA: {
    profile: {
      symbol: 'NVDA',
      exchange: 'NasdaqGS',
      currency: 'USD',
      name: 'NVIDIA Corporation',
      price: '883.12',
      change: '-14.22',
      changePercent: '-1.58%',
      timestamp: 'As of 8:08:13 AM EDT. Market Open.',
    },
    stats: clone(clData.stats),
    ranges: clone(clData.ranges),
    historicalRows: clone(clData.historicalRows),
  },
  'BTC-USD': {
    profile: {
      symbol: 'BTC-USD',
      exchange: 'CCC',
      currency: 'USD',
      name: 'Bitcoin USD',
      price: '73,166.44',
      change: '+1,613.63',
      changePercent: '+2.26%',
      timestamp: 'As of 8:08:13 AM EDT. Market Open.',
    },
    stats: clone(clData.stats),
    ranges: clone(clData.ranges),
    historicalRows: clone(clData.historicalRows),
  },
};