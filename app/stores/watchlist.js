import { defineStore } from 'pinia'

export const useWatchlistStore = defineStore('watchlist', {
  state: () => ({
    symbols: ['2330', '0050', '2454', '2317']
  }),
  actions: {
    addSymbol(symbol) {
      const normalized = symbol.trim()

      if (normalized && !this.symbols.includes(normalized)) {
        this.symbols.unshift(normalized)
      }
    },
    removeSymbol(symbol) {
      this.symbols = this.symbols.filter((item) => item !== symbol)
    }
  }
})
