<script setup lang="ts">
/* ------------------------------- IMPORT DATA ------------------------------ */
import product from '@/data/product.json'
import DetailProductSection from '@/components/sections/DetailProductSection.vue'
import { useRoute } from 'vue-router'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
const route = useRoute()
const slug = route.params.slug as string
const productData = product.find((item) => item.slug === slug)
</script>

<template>
  <DetailProductSection
    :breadCrumbProduct="productData?.slug ?? ''"
    :nameProduct="productData?.name"
    :priceProduct="productData?.price"
    :imageProduct="productData?.images ?? []"
    :descriptionProduct="productData?.description ?? ''"
    :discountProduct="productData?.discount"
    :sizesProduct="productData?.size ?? []"
    :colorProduct="productData?.colors ?? []"
    :materialProduct="productData?.material ?? ''"
  />
</template>
