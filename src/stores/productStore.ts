/* -------------------------------------------------------------------------- */
/*                             PRODUCT STORE PINIA                            */
/* -------------------------------------------------------------------------- */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fashionProducts, categories, brandCategory, genderCategory } from '@/data/products'

export const useProductStore = defineStore('product', () => {
  const searchQuery = ref('')
  const selectGenders = ref('unisex')
  const selectedCategory = ref('all')
  const selectedBrand = ref('all')
  const sortBy = ref('default')
  const selectedSize = ref<string | null>(null)
  const selectedColor = ref<string | null>(null)
  const cart = ref<(string | number)[]>([])

  // Filter by category & brand
  const filteredProducts = computed(() => {
    let products = fashionProducts

    if (searchQuery.value.trim() !== '') {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
    }

    if (selectedCategory.value !== 'all') {
      products = products.filter((p) =>
        Array.isArray(p.category)
          ? p.category.includes(selectedCategory.value)
          : p.category === selectedCategory.value,
      )
    }

    if (selectedBrand.value !== 'all') {
      products = products.filter((p) => p.brandSlug === selectedBrand.value)
    }

    if (selectGenders.value !== 'unisex') {
      products = products.filter((p) => p.gender === selectGenders.value)
    }

    return products
  })

  // Sorting
  const sortedProducts = computed(() => {
    const products = [...filteredProducts.value]
    switch (sortBy.value) {
      case 'lowest_price':
        return products.sort((a, b) => a.price - b.price)
      case 'popular':
        return products.sort((a, b) => b.rating - a.rating)
      default:
        return products
    }
  })

  function addToCart(item: string | number | null) {
    if (item !== null) {
      cart.value.push(item)
    }
  }

  return {
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedSize,
    sortBy,
    filteredProducts,
    sortedProducts,
    categories,
    brandCategory,
    selectGenders,
    genderCategory,
    selectedColor,
    cart,
    addToCart,
  }
})
