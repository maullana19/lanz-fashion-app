<script setup lang="ts">
/* -------------------------------------------------------------------------- */
/*                                LAYOUT SYSTEM                               */
/* -------------------------------------------------------------------------- */

/* ------------------------------ REQUIREMENTS ------------------------------ */
// - LANGUAGE PROGRAM     : Js, Ts
// - FRAMEWORK AND TOOLS  : VUE.JS v3,  Vite, Cypress, Vue ROUTER, PINIA
// - STYLING METHOD       : TAILWINDCSS V4 + SHADCN VUE + SWIPER JS

/* -------------------------- IMPORT DATA STATEMENT ------------------------- */
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import { useAuthStore } from '@/stores/authStore'
import NavbarLayouts from '@/components/layouts/NavbarLayouts.vue'
import FooterLayouts from '@/components/layouts/FooterLayouts.vue'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
// Logic Auth
const authStore = useAuthStore()

authStore.checkAuth() // Cek auth state saat pertama load
</script>

<template>
  <Toaster class="pointer-events-auto" />
  <header class="lg:px-12 sticky top-0 z-50 px-4 bg-white shadow">
    <NavbarLayouts />
  </header>
  <main class="container mx-auto px-4 lg:px-12">
    <RouterView />
  </main>
  <footer class="lg:px-12 px-4 bg-gray-100">
    <FooterLayouts />
  </footer>
</template>

<style scoped></style>
