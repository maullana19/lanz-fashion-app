<script setup lang="ts">
/* ---------------------------- IMPORT STATEMENT ---------------------------- */
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import type { Component } from 'vue'

/* ----------------------------- LOGIC STATEMENT ----------------------------- */
defineProps<{
  services: {
    id: number
    title: string
    subtitle: string
    icons: Component
  }[]
}>()
</script>

<template>
  <section class="bg-white py-12 px-4 h-screen">
    <div class="max-w-5xl mx-auto space-y-9">
      <h2 class="text-2xl font-bold text-center text-primary">Our Services</h2>

      <!-- CARD LOOP -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card v-for="service in services" :key="service.id">
          <CardHeader
            class="bg-primary items-center flex text-primary-foreground py-2 justify-center"
          >
            <component :is="service.icons" class="size-9" />
            <h3 class="text-xl font-semibold">{{ service.title }}</h3>
          </CardHeader>
          <CardContent>
            <p>
              {{ service.subtitle }}
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <p class="text-muted-foreground text-center">
          Need more help?
          <a href="#" class="underline text-primary">Contact CS</a>
        </p>
      </div>
    </div>
  </section>
</template>
