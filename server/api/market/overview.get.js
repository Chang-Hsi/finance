export default defineEventHandler(() => {
  return {
    lastUpdated: new Date().toLocaleString('zh-TW', { hour12: false }),
    marketCards: [
      {
        label: '加權指數',
        value: '22,315.47',
        change: 126.28,
        changeText: '+126.28 (+0.57%)',
        period: '收盤'
      },
      {
        label: '櫃買指數',
        value: '256.41',
        change: -0.83,
        changeText: '-0.83 (-0.32%)',
        period: '收盤'
      },
      {
        label: '台積電 ADR',
        value: '178.22',
        change: 2.47,
        changeText: '+2.47 (+1.41%)',
        period: '盤後'
      },
      {
        label: '美元 / 台幣',
        value: '31.68',
        change: -0.11,
        changeText: '-0.11 (-0.35%)',
        period: '即時'
      }
    ],
    topNews: [
      {
        id: 'n1',
        source: 'TWSE',
        publishedAt: '15:10',
        related: '2330 / 半導體',
        title: '權值股帶動大盤收高，半導體族群延續買盤',
        summary: '示意資料。後續可改接證交所公開資訊、公司重大訊息或 GDELT 關鍵字新聞聚合，做成個股與主題新聞頁。'
      },
      {
        id: 'n2',
        source: 'MOPS',
        publishedAt: '14:32',
        related: '2317 / 電子代工',
        title: '電子權值股法說題材升溫，市場關注第二季展望',
        summary: '這個區塊適合延伸成 Yippee Finance Lite 的新聞列表、新聞詳情頁、相關股票標籤與來源過濾。'
      },
      {
        id: 'n3',
        source: 'Macro',
        publishedAt: '13:48',
        related: '匯率 / 外資',
        title: '台幣走勢轉強，外資買盤回流權值與 ETF',
        summary: '如果後面加入央行、主計總處或 FRED 宏觀資料，也可以把這裡擴成市場焦點與總經卡片。'
      }
    ],
    watchlist: [
      {
        symbol: '2330',
        name: '台積電',
        price: 'NT$ 982.00',
        change: 12,
        changeText: '+1.24%',
        note: '成交量放大'
      },
      {
        symbol: '0050',
        name: '元大台灣50',
        price: 'NT$ 187.65',
        change: 0.9,
        changeText: '+0.48%',
        note: 'ETF'
      },
      {
        symbol: '2454',
        name: '聯發科',
        price: 'NT$ 1,286.00',
        change: -14,
        changeText: '-1.08%',
        note: '高價電子'
      }
    ]
  }
})
