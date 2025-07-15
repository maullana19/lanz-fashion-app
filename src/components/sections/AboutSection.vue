<script setup lang="ts">
/* ---------------------------- IMPORT STATEMENT ---------------------------- */
import { Card, CardHeader, CardContent } from '../ui/card'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
defineProps<{
  title?: string
  subtitle?: string
  vission?: string
  mission?: string[]
  values?: string[]
  imageSrc?: string
  achievementTitle?: string
  achievementAward?: string | number
  achievementSold?: string | number
  achievementSatisfaction?: string | number
}>()
</script>

<template>
  <section>
    <div class="max-w-5xl mx-auto py-12 space-y-8 px-5 md:px-0">
      <!-- ABOUT SECTION PROPS -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div class="space-y-2">
          <h1 class="relative text-primary inline-block group text-4xl font-semibold">
            <span class="relative z-10 transition-colors duration-300 group-hover:text-white">
              {{ title }}
            </span>
            <span
              class="absolute inset-0 bg-primary z-0 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
            ></span>
          </h1>
          <p>{{ subtitle }}</p>
        </div>
        <div>
          <img :src="imageSrc" alt="About-Image" class="rounded shadow object-cover" />
        </div>
      </div>
      <hr />
      <!-- VISI AND MISSION SECTION PROPS -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        <Card
          class="hover:bg-primary hover:text-white transform hover:-translate-y-4 transition-all"
        >
          <CardHeader>
            <h1 class="font-bold text-xl hover:text-white">Vission</h1>
          </CardHeader>
          <CardContent>
            {{ vission }}
          </CardContent>
        </Card>
        <Card
          class="hover:bg-primary hover:text-white transform hover:-translate-y-4 transition-all"
        >
          <CardHeader> <h1 class="font-bold text-xl">Mission</h1> </CardHeader>
          <CardContent>
            <ul class="list-disc ml-4">
              <li v-for="(mission, idx) in mission" :key="idx">{{ mission }}</li>
            </ul>
          </CardContent>
        </Card>
        <Card
          class="hover:bg-primary hover:text-white transform hover:-translate-y-4 transition-all"
        >
          <CardHeader> <h1 class="font-bold text-xl">Our Value</h1> </CardHeader>
          <CardContent>
            <ul class="list-disc ml-4">
              <li v-for="(val, idx) in values" :key="idx">{{ val }}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <hr />
      <!-- ACHIEVEMENTS SECTION PROPS -->
      <div>
        <div class="mb-6">
          <h1 class="text-3xl font-semibold text-right text-primary">{{ achievementTitle }}</h1>
        </div>
        <Card>
          <CardContent>
            <div class="flex justify-between gap-3 px-4">
              <div class="flex gap-2">
                <h1 class="text-3xl text-primary">{{ achievementSold }}+</h1>
                <span>Sold</span>
              </div>
              <div class="flex gap-2">
                <h1 class="text-3xl text-primary">{{ achievementAward }}+</h1>
                <span>Awards</span>
              </div>
              <div class="flex gap-2">
                <h1 class="text-3xl text-primary">{{ achievementSatisfaction }}+</h1>
                <span>Satisfaction</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
