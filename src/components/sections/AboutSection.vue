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
}>()
</script>

<template>
  <section>
    <div class="max-w-5xl mx-auto py-12 space-y-8 px-5 md:px-0">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 class="text-2xl font-semibold mb-3">{{ title }}</h1>
          <p>{{ subtitle }}</p>
        </div>
        <div>
          <img :src="imageSrc" alt="About-Image" class="rounded shadow object-cover" />
        </div>
      </div>
      <hr />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        <Card>
          <CardHeader>
            <h1 class="font-bold">Vission</h1>
          </CardHeader>
          <CardContent>
            {{ vission }}
          </CardContent>
        </Card>
        <Card>
          <CardHeader> <h1 class="font-bold">Mission</h1> </CardHeader>
          <CardContent>
            <ul class="list-disc ml-4">
              <li v-for="(mission, idx) in mission" :key="idx">{{ mission }}</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader> <h1 class="font-bold">Our Value</h1> </CardHeader>
          <CardContent>
            <ul class="list-disc ml-4">
              <li v-for="(val, idx) in values" :key="idx">{{ val }}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
