/* ---------------------------- IMPORT STATEMENT ---------------------------- */
import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as { id: number; name: string; quantity: number }[],
  }),

  actions: {
    loadFromSession() {
      const data = sessionStorage.getItem('cartItems')
      if (data) {
        this.items = JSON.parse(data)
      }
    },

    saveToSession() {
      sessionStorage.setItem('cartItems', JSON.stringify(this.items))
    },

    addToCart(product: { id: number; name: string }) {
      const auth = useAuthStore()
      if (!auth.user) {
        alert('Harap login terlebih dahulu!')
        return
      }

      const existing = this.items.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.saveToSession()
    },

    clearCart() {
      this.items = []
      sessionStorage.removeItem('cartItems')
    },
  },
})
