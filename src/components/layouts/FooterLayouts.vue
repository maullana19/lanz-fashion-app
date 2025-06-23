<script setup lang="ts">
/* -------------------------- IMPORT DATA STATEMENT ------------------------- */
import { Instagram, Youtube } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
</script>

<template>
  <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 py-6 max-w-7xl px-6 md:px-0">
    <div class="flex flex-col gap-3">
      <h1 class="font-bold">Lanz<span class="text-primary">Fashion.</span></h1>
      <small>@ 2025 - LanzFashion.</small>
      <small>Disclaimer : This website is private, only for a portfolio and learning media.</small>
    </div>
    <div class="flex flex-col text-start gap-1">
      <h1 class="font-semibold text-muted-foreground">Information</h1>

      <a href="#">Service</a>

      <a href="#">Partner</a>

      <a href="#">Customer Service</a>

      <a href="#">Faq</a>
    </div>
    <div class="flex flex-col text-start gap-3 text-primary">
      <h1 class="font-semibold text-muted-foreground">Follow Us</h1>
      <div class="flex gap-2">
        <Button variant="outline" size="icon"> <Youtube /> </Button>
        <Button variant="outline" size="icon"> <Instagram /></Button>
      </div>
    </div>
    <div>
      <h1 class="font-semibold text-muted-foreground">Hire Me?</h1>
      <p class="italic">dedemaulana162@gmail.com</p>
    </div>
  </div>
</template>
