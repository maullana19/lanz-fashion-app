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
  const sizeSelect = ref('all')
  const selectedSize = ref<string | null>(null)
  const selectedColor = ref<string | null>(null)

  // Filterization process
  const filteredProducts = computed(() => {
    let dataProduct = [...product]

    if (selectedCategory.value !== 'all') {
      dataProduct = dataProduct.filter((p) =>
        Array.isArray(p.category)
          ? p.category.includes(selectedCategory.value)
          : p.category === selectedCategory.value,
      )
    }

    if (sizeSelect.value !== 'all') {
      dataProduct = dataProduct.filter((p) =>
        Array.isArray(p.size) ? p.size.includes(sizeSelect.value) : p.size === sizeSelect.value,
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
    sizeSelect,
    genders,
    selectedSize,
    sortBy,
    sortedProducts,
    categories,
    selectGenders,
    selectedColor,
  }
})
