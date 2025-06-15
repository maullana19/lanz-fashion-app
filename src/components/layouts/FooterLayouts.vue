<script setup lang="ts">
/* -------------------------- IMPORT DATA STATEMENT ------------------------- */
import { Instagram, Youtube } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
</script>

<template>
  <div class="flex flex-col lg:flex-row justify-between py-6">
    <div class="flex flex-col gap-3">
      <h1 class="font-bold text-lg">Lanz<span class="text-amber-800">Fashion.</span></h1>
      <p class="text-gray-600">@ 2025 - LanzFashion.</p>
    </div>
    <div class="flex flex-col text-start gap-3">
      <h1 class="font-semibold">Infomation</h1>

      <a href="#">Service</a>

      <a href="#">Partner</a>

      <a href="#">Customer Service</a>

      <a href="#">Faq</a>
    </div>
    <div class="flex flex-col text-start gap-3">
      <h1 class="font-semibold">Social</h1>
      <Button> <Youtube class="size-4" /> Youtube </Button>
      <Button> <Instagram class="size-4" /> Instagram </Button>
    </div>
  </div>
</template>
