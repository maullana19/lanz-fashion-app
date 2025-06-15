<script setup lang="ts">
/* ------------------------------- IMPORT DATA ------------------------------ */
import { fashionProducts } from '@/data/products'
import DetailProductSection from '@/components/sections/DetailProductSection.vue'
import { useRoute } from 'vue-router'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
const route = useRoute()
const slug = route.params.slug as string
const productData = fashionProducts.find((item) => item.slug === slug)
</script>

<template>
  <DetailProductSection
    :breadCrumbProduct="productData?.slug ?? ''"
    :nameProduct="productData?.name"
    :priceProduct="productData?.price"
    :imageProduct="productData?.images ?? []"
    :brandNameProduct="productData?.brandName ?? ''"
    :descriptionProduct="productData?.description ?? ''"
    :discountProduct="productData?.discount"
    :sizesProduct="productData?.size ?? []"
    :colorProduct="productData?.colors ?? []"
    :materialProduct="productData?.material ?? ''"
  />
</template>
