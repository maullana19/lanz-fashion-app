/* ---------------------------- IMPORT STATEMENT ---------------------------- */
import { defineStore } from 'pinia'
import product from '@/data/product.json'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
export const useSearchStore = defineStore('searchProducts', {
  state: () => ({
    searchQuery: '',
    product,
  }),

  getters: {
    searchProductsGetters(state) {
      if (!state.searchQuery) return []
      return state.product.filter((p) =>
        p.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
      )
    },
  },
})
