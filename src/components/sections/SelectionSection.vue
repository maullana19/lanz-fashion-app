<script setup lang="ts">
/* ---------------------------- IMPORT STATEMENT ---------------------------- */
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/productStore'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Toggle } from '@/components/ui/toggle'
import { Heart, ChevronDown, ChevronUp } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
const store = useProductStore()
const showAllCategories = ref(false)

// HELPER FUNCTION FOR FORMAT PRICES
function formatPrice(price: number): string {
  return 'Rp ' + price.toLocaleString()
}

const visibleCategories = computed(() =>
  showAllCategories.value ? store.categories : store.categories.slice(0, 4),
)
</script>

<template>
  <section class="py-8 px-2 space-y-3">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <aside class="flex flex-col space-y-3 lg:sticky top-2 lg:top-20 self-start overflow-hidden">
        <div>
          <Breadcrumb>
            <BreadcrumbList class="font-bold">
              <BreadcrumbItem>
                <BreadcrumbLink href="#"> Home </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage class="text-muted-foreground font-semibold"
                  >Select your fashion</BreadcrumbPage
                >
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <!-- SELECT CATEGORY -->
        <Card class="border-0 shadow-none">
          <CardContent>
            <div class="mb-3">
              <h1 class="text-muted-foreground">Category</h1>
            </div>
            <div class="mb-3">
              <RadioGroup v-model="store.selectedCategory" class="space-y-1">
                <!-- All Option -->
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="all" value="all" />
                  <Label for="all">All</Label>
                </div>

                <!-- Dynamic Options -->
                <div
                  v-for="category in visibleCategories"
                  :key="category.id"
                  class="flex items-center space-x-2"
                >
                  <RadioGroupItem :id="category.slug" :value="category.slug" />
                  <Label :for="category.slug">{{ category.titleCategories }}</Label>
                </div>

                <!-- Button See more -->
                <Button
                  variant="link"
                  @click="showAllCategories = !showAllCategories"
                  class="hover:cursor-pointer"
                >
                  {{ showAllCategories ? 'See less' : 'See more' }}
                  <span class="ml-1">
                    <ChevronUp v-if="showAllCategories" />
                    <ChevronDown v-else />
                  </span>
                </Button>
              </RadioGroup>
            </div>
            <!-- SELECT SIZE -->
            <div class="mb-3">
              <h1 class="text-muted-foreground">Size</h1>
            </div>
            <div class="flex gap-2 flex-wrap">
              <Toggle variant="outline" @click="store.sizeSelect = 'all'"> All </Toggle>
              <Toggle
                variant="outline"
                v-for="size in ['S', 'M', 'L', 'XL', 'XXL']"
                :key="size"
                @click="store.sizeSelect = size"
              >
                {{ size }}
              </Toggle>
            </div>
          </CardContent>
        </Card>
      </aside>

      <div class="col-span-3 p-2">
        <div class="flex justify-between flex-col md:flex-row items-center gap-6">
          <div class="flex flex-row overflow-x-auto gap-4">
            <!-- GENDER SELECT -->
            <Button
              v-for="gender in store.genders"
              :key="gender.id"
              :value="gender.slug"
              @click="store.selectGenders = gender.slug"
              :variant="store.selectGenders === gender.slug ? 'default' : 'secondary'"
              class="cursor-pointer"
              >{{ gender.titleGender }}</Button
            >
          </div>
          <div class="flex">
            <!-- SORT BY -->
            <Select class="w-full" v-model="store.sortBy">
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel class="text-muted">Sort by</SelectLabel>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="trend">Trending</SelectItem>
                  <SelectItem value="lowest_price">Low Price</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <hr class="my-6" />

        <div>
          <!-- LIST OF PRODUCT -->
          <div
            v-if="store.sortedProducts.length === 0"
            class="text-center text-muted-foreground py-12"
          >
            The product was not found.
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Card
              v-for="product in store.sortedProducts"
              :key="product.id"
              class="p-2 border-0 shadow-none h-[360px] flex flex-col bg-white hover:-translate-y-2 transition-all"
            >
              <CardContent class="border-0 p-0 flex flex-col flex-1 relative">
                <img
                  :src="product.images[0]"
                  :alt="product.name"
                  class="h-48 w-full object-cover rounded"
                />
                <Button as-child size="icon" variant="outline" class="absolute right-2 top-2">
                  <RouterLink to="/login"><Heart /></RouterLink>
                </Button>
                <Badge class="absolute right-2 top-40 bg-primary">-{{ product.discount }}%</Badge>

                <div class="py-3 flex flex-col space-y-5 flex-1 mb-2">
                  <h3 class="font-bold line-clamp-1">{{ product.name }}</h3>

                  <div class="flex items-center justify-between">
                    <span class="font-bold">
                      {{ formatPrice(product.price * (1 - (product.discount || 0) / 100)) }}
                    </span>
                    <span v-if="product.discount" class="line-through text-muted-foreground">
                      <small>{{ formatPrice(product.price) }}</small>
                    </span>
                  </div>
                </div>

                <!-- BUTTON ORDER -->
                <RouterLink :to="`/products/${product.slug}`" class="mt-auto">
                  <Button
                    variant="outline"
                    class="w-full cursor-pointer hover:bg-primary hover:text-white"
                    >Order</Button
                  >
                </RouterLink>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
