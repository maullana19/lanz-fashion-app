<script setup lang="ts">
/* ---------------------------- IMPORT STATEMENT ---------------------------- */
import { ref } from 'vue'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import banners from '@/data/banners.json'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
const currentSlide = ref(0)

const data_content_jumbotron = banners.find(
  (items) => 'jumbotron_content' in items,
)?.jumbotron_content
</script>

<template>
  <section class="relative w-full max-w-7xl mx-auto py-6">
    <Carousel v-model="currentSlide" class="rounded-2xl overflow-hidden shadow-xl">
      <CarouselContent>
        <CarouselItem
          v-for="item in data_content_jumbotron"
          :key="item.id"
          class="relative h-[360px] md:h-[500px] transition-all"
        >
          <img
            :src="item.img_src"
            :alt="item.title"
            loading="lazy"
            class="w-full h-full object-cover object-center"
          />
          <!-- Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end md:items-center justify-center"
          >
            <div class="text-white text-center p-6 md:p-12 max-w-2xl w-full">
              <h1
                class="text-2xl md:text-5xl font-extrabold mb-4 drop-shadow-lg animate-fade-in-up"
              >
                {{ item.title }}
              </h1>
              <p class="text-base md:text-xl mb-6 font-light animate-fade-in-up delay-100">
                {{ item.subtitle }}
              </p>
              <Button
                as="a"
                :href="item.ctaLink"
                size="lg"
                class="bg-primary hover:bg-primary/80 text-white font-semibold px-8 py-3 rounded-full shadow-lg animate-fade-in-up delay-200"
              >
                {{ item.cta }}
              </Button>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <!-- Arrow Nav -->
      <CarouselPrevious
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 z-10 transition cursor-pointer"
      >
        <ChevronLeft class="size-6" />
      </CarouselPrevious>
      <CarouselNext
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 z-10 transition cursor-pointer"
      >
        <ChevronRight class="size-6" />
      </CarouselNext>
    </Carousel>
  </section>
</template>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
}
.delay-100 {
  animation-delay: 0.1s;
}
.delay-200 {
  animation-delay: 0.2s;
}
</style>
