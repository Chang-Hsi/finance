import { defineStore } from 'pinia';
import { markRaw } from 'vue';
import { stockQuoteStatic } from '@/data/stockQuoteStatic';

const FALLBACK_SYMBOL = 'CL=F';
const DEFAULT_RANGE = '1D';

const normalizeSymbol = (symbol) => decodeURIComponent(String(symbol || '')).toUpperCase();

export const useStockQuoteStore = defineStore('stock-quote', {
  state: () => ({
    dataset: markRaw(stockQuoteStatic),
    activeRangeBySymbol: {},
  }),

  getters: {
    resolveSymbol: (state) => (symbol) => {
      const normalized = normalizeSymbol(symbol);
      return state.dataset[normalized] ? normalized : FALLBACK_SYMBOL;
    },

    getQuote: (state) => (symbol) => {
      const resolved = state.dataset[normalizeSymbol(symbol)] ? normalizeSymbol(symbol) : FALLBACK_SYMBOL;
      return state.dataset[resolved].profile;
    },

    getStats: (state) => (symbol) => {
      const resolved = state.dataset[normalizeSymbol(symbol)] ? normalizeSymbol(symbol) : FALLBACK_SYMBOL;
      return state.dataset[resolved].stats;
    },

    getRangeKeys: (state) => (symbol) => {
      const resolved = state.dataset[normalizeSymbol(symbol)] ? normalizeSymbol(symbol) : FALLBACK_SYMBOL;
      return Object.keys(state.dataset[resolved].ranges);
    },

    getActiveRange: (state) => (symbol) => {
      const resolved = state.dataset[normalizeSymbol(symbol)] ? normalizeSymbol(symbol) : FALLBACK_SYMBOL;
      const ranges = state.dataset[resolved].ranges;
      const stored = state.activeRangeBySymbol[resolved];

      if (stored && ranges[stored]) {
        return stored;
      }

      return ranges[DEFAULT_RANGE] ? DEFAULT_RANGE : Object.keys(ranges)[0];
    },

    getRangeData: (state) => (symbol, range) => {
      const resolved = state.dataset[normalizeSymbol(symbol)] ? normalizeSymbol(symbol) : FALLBACK_SYMBOL;
      const ranges = state.dataset[resolved].ranges;
      const pickedRange = range && ranges[range] ? range : (ranges[DEFAULT_RANGE] ? DEFAULT_RANGE : Object.keys(ranges)[0]);
      return ranges[pickedRange];
    },

    getHistoricalRows: (state) => (symbol) => {
      const resolved = state.dataset[normalizeSymbol(symbol)] ? normalizeSymbol(symbol) : FALLBACK_SYMBOL;
      return state.dataset[resolved].historicalRows;
    },
  },

  actions: {
    setActiveRange(symbol, range) {
      const resolved = this.resolveSymbol(symbol);
      const ranges = this.dataset[resolved].ranges;

      if (!ranges[range]) {
        return;
      }

      this.activeRangeBySymbol[resolved] = range;
    },
  },
});
