import { defineStore } from "pinia";
import { markRaw } from "vue";
import { stockNews } from "@/data/stockNews";
import { useStockQuoteStore } from "@/stores/stockQuote";

const SUMMARY_NEWS_LIMIT = 8;

const buildQuoteTag = (quote) => ({
  symbol: quote.symbol,
  value: quote.changePercent || "--",
  positive: String(quote.change).startsWith("+"),
});

const cloneTags = (tags = []) => tags.map((tag) => ({ ...tag }));

const mapNewsItem = (item, quote) => {
  const tags = cloneTags(item.tags);

  if (item.includeQuoteTag) {
    tags.unshift(buildQuoteTag(quote));
  }

  return {
    ...item,
    tags,
  };
};

export const useStockNewsStore = defineStore("stock-news", {
  state: () => ({
    dataset: markRaw(stockNews),
  }),

  getters: {
    getNews: (state) => (symbol) => {
      const stockQuoteStore = useStockQuoteStore();
      const resolvedSymbol = stockQuoteStore.resolveSymbol(symbol);
      const quote = stockQuoteStore.getQuote(resolvedSymbol);

      return state.dataset.map((item) => mapNewsItem(item, quote));
    },

    getAllNews() {
      return this.getNews("CL=F");
    },

    getSummaryNews() {
      return (symbol) => this.getNews(symbol).slice(0, SUMMARY_NEWS_LIMIT);
    },
  },
});
