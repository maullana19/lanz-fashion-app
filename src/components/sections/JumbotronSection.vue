<script setup lang="ts">
/* ------------------------ IMPORT ALL DATA STATEMENT ----------------------- */
import { ref } from 'vue'
import { Button } from '../ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
const images = [
  {
    id: 1,
    title: 'Elegant Monochrome Collection',
    subtitle:
      'Discover luxury in simplicity with our monochrome collection. The timeless purple color combined with modern cuts creates a sophisticated silhouette for any occasion.',
    src: 'https://images.unsplash.com/photo-1595446472569-42bbc8de9aaf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'unsplash.com',
  },
  {
    id: 2,
    title: 'Tropical Vibrance (Summer Edition)',
    subtitle:
      'Hadapi musim panas dengan gaya! Koleksi ini menampilkan warna-warna cerah dan motif tropis yang segar, dibuat dari bahan breathable untuk kenyamanan maksimal di bawah terik matahari.',
    src: 'https://images.unsplash.com/photo-1633767448607-64876fa0978e?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'unsplash.com',
  },
  {
    id: 3,
    title: 'Urban Explorer (Streetwear Essentials)',
    subtitle:
      'Streetwear dengan sentuhan high-fashion. Jaket oversized, celana cargo utilitarian, dan sneakers limited edition. sempurna untuk gaya urban yang edgy namun tetap functional.',

    src: 'https://images.unsplash.com/photo-1649864730872-fb7a9a01b6e8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'unsplash.com',
  },
]

const currentSlide = ref(0)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % images.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + images.length) % images.length
}

// Function For change Slide
const goToSlide = (index: number) => {
  currentSlide.value = index
}
</script>

<template>
  <div class="relative w-full lg:max-w-7xl max-w-2xl mx-auto group py-3">
    <!-- Carousel Container -->
    <Carousel v-model="currentSlide" class="rounded-lg overflow-hidden shadow-md">
      <CarouselContent>
        <CarouselItem v-for="image in images" :key="image.id" class="relative h-64 md:h-96">
          <!-- Image with Lazy Loadings -->
          <img
            :src="image.src"
            :alt="image.alt"
            loading="lazy"
            class="w-full h-full object-cover object-center"
          />

          <!-- Overlay text (optional) -->
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center lg:px-24">
            <div class="text-white text-center p-4">
              <h1 class="text-lg md:text-4xl font-bold mb-4">
                {{ image.title }}
              </h1>
              <p class="text-pretty normal-case">{{ image.subtitle }}</p>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>

      <!-- Arrow Nav -->
      <CarouselPrevious
        @click="prevSlide"
        class="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      >
        <ChevronLeft class="size-6" />
      </CarouselPrevious>
      <CarouselNext
        @click="nextSlide"
        class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      >
        <ChevronRight class="size-6" />
      </CarouselNext>
    </Carousel>

    <!-- Slide Indicator -->
    <div class="flex justify-center gap-2 mt-4">
      <Button
        size="icon"
        v-for="(_, index) in images"
        :key="index"
        @click="goToSlide(index)"
        :class="[
          'size-2 rounded-full transition-all',
          currentSlide === index ? 'bg-primary w-6' : 'bg-gray-300',
        ]"
        :aria-label="`Pergi ke slide ${index + 1}`"
      />
    </div>
  </div>
</template>
