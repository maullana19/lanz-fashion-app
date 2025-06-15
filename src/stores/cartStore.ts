import { defineStore } from 'pinia'
import type { Product } from '@/data/products'

interface CartItem extends Product {
  quantity: number
  selectedSize: string
  selectedColor: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: (state) =>
      state.items.reduce((sum, item) => {
        const price = item.discount ? item.price * (1 - item.discount / 100) : item.price
        return sum + price * item.quantity
      }, 0),
    cartIsEmpty: (state) => state.items.length === 0,
  },
  actions: {
    addToCart(product: Product, size: string, color: string) {
      const existingItem = this.items.find(
        (item) =>
          item.id === product.id && item.selectedSize === size && item.selectedColor === color,
      )

      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          ...product,
          quantity: 1,
          selectedSize: size,
          selectedColor: color,
        })
      }
    },
    removeFromCart(itemId: number) {
      this.items = this.items.filter((item) => item.id !== itemId)
    },
    updateQuantity(itemId: number, newQuantity: number) {
      const item = this.items.find((item) => item.id === itemId)
      if (item) {
        item.quantity = Math.max(1, newQuantity)
      }
    },
    clearCart() {
      this.items = []
    },
  },
  persist: true,
})
