/* ---------------------------- IMPORT STATEMENT ---------------------------- */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import product from '@/data/product.json'
import categories from '@/data/categories.json'
import genders from '@/data/genders.json'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
export const useProductStore = defineStore('product', () => {
  const selectGenders = ref('unisex')
  const selectedCategory = ref('all')
  const sortBy = ref('default')
  const selectedSize = ref<string | null>(null)
  const selectedColor = ref<string | null>(null)

  // Filter by category & brand
  const filteredProducts = computed(() => {
    let dataProduct = product

    if (selectedCategory.value !== 'all') {
      dataProduct = dataProduct.filter((p) =>
        Array.isArray(p.category)
          ? p.category.includes(selectedCategory.value)
          : p.category === selectedCategory.value,
      )
    }

    if (selectGenders.value !== 'unisex') {
      dataProduct = dataProduct.filter((p) => p.gender === selectGenders.value)
    }

    return dataProduct
  })

  // Sorting
  const sortedProducts = computed(() => {
    const dataProduct = [...filteredProducts.value]
    switch (sortBy.value) {
      case 'lowest_price':
        return dataProduct.sort((a, b) => a.price - b.price)
      case 'popular':
        return dataProduct.sort((a, b) => b.rating - a.rating)
      default:
        return dataProduct
    }
  })

  return {
    selectedCategory,
    genders,
    selectedSize,
    sortBy,
    sortedProducts,
    categories,
    selectGenders,
    selectedColor,
  }
})
