<script setup lang="ts">
/* -------------------------- IMPORT DATA STATEMENT ------------------------- */
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import { useAuthStore } from '@/stores/authStore'
import NavbarLayouts from '@/components/layouts/NavbarLayouts.vue'
import FooterLayouts from '@/components/layouts/FooterLayouts.vue'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
const authStore = useAuthStore()

authStore.checkAuth()
</script>

<template>
  <Toaster class="pointer-events-auto" />
  <header class="sticky top-0 z-50 shadow px-2 md:px-6 bg-white">
    <NavbarLayouts />
  </header>
  <main class="container mx-auto max-w-7xl px-2 md:px-6">
    <RouterView />
  </main>
  <footer class="bg-gray-200 px-2 md:px-6">
    <FooterLayouts />
  </footer>
</template>
