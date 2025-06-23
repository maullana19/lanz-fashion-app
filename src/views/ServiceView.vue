<script setup lang="ts">
/* ---------------------------- IMPORT STATEMENT ---------------------------- */
import ServiceSection from '@/components/sections/ServiceSection.vue'
import services from '@/data/services.json'
import { MessageCircleMore, FastForward, History } from 'lucide-vue-next'

/* ----------------------------- ICON MAP DEFINITION ---------------------------- */
const iconMap = {
  MessageCircleMore,
  FastForward,
  History,
}

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
const mappedServices = services.map((item) => ({
  ...item,
  icons: iconMap[item.icons as keyof typeof iconMap],
}))
</script>

<template>
  <ServiceSection :services="mappedServices" />
</template>
