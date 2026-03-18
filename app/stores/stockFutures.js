import { defineStore } from "pinia";
import { markRaw } from "vue";
import { stockFutures } from "@/data/stockFutures";

const FALLBACK_SYMBOL = "CL=F";

const normalizeSymbol = (symbol) => decodeURIComponent(String(symbol || "")).toUpperCase();

export const useStockFuturesStore = defineStore("stock-futures", {
  state: () => ({
    dataset: markRaw(stockFutures),
  }),

  getters: {
    resolveSymbol: (state) => (symbol) => {
      const normalizedSymbol = normalizeSymbol(symbol);
      return state.dataset[normalizedSymbol] ? normalizedSymbol : FALLBACK_SYMBOL;
    },

    getFuturesChain: (state) => (symbol) => {
      const resolvedSymbol = state.dataset[normalizeSymbol(symbol)]
        ? normalizeSymbol(symbol)
        : FALLBACK_SYMBOL;

      return state.dataset[resolvedSymbol] || [];
    },
  },
});
