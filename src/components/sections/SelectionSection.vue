<script setup lang="ts">
/* ---------------------------- IMPORT STATEMENT ---------------------------- */
import { useProductStore } from '@/stores/productStore'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
import { RouterLink } from 'vue-router'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
const store = useProductStore()

// HELPER FUNCTION FOR FORMAT PRICES
function formatPrice(price: number): string {
  return 'Rp ' + price.toLocaleString()
}
</script>

<template>
  <section class="py-8 px-2 space-y-3">
    <div>
      <Breadcrumb>
        <BreadcrumbList class="font-bold">
          <BreadcrumbItem>
            <BreadcrumbLink href="/"> Home </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Selection</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-3">
      <aside class="flex flex-col space-y-3 lg:sticky lg:top-24 self-start h-screen overflow-auto">
        <!-- SELECT CATEGORY -->
        <Card>
          <CardHeader>
            <h1 class="font-semibold">Category</h1>
          </CardHeader>
          <CardContent>
            <Select v-model="store.selectedCategory">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel class="text-gray-400 font-semibold">
                    Choose your category
                  </SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem
                    v-for="category in store.categories"
                    :key="category.id"
                    :value="category.slug"
                    @click="store.selectedCategory = category.slug"
                  >
                    {{ category.name }} ({{ category.count }})
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <!-- SELECT Brand -->
        <Card>
          <CardHeader>
            <h1 class="font-semibold">Select Brand</h1>
          </CardHeader>
          <CardContent>
            <Select v-model="store.selectedBrand">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel class="text-gray-400 font-semibold"> Choose your brand </SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem
                    v-for="brand in store.brandCategory"
                    :key="brand.id"
                    :value="brand.slug"
                    @click="store.selectedBrand = brand.slug"
                  >
                    {{ brand.namebrand }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </aside>

      <div class="col-span-3 p-2">
        <div class="flex justify-between items-center mb-2">
          <div class="flex flex-wrap gap-4">
            <Button
              v-for="gender in store.genderCategory"
              :key="gender.id"
              :value="gender.slug"
              @click="store.selectGenders = gender.slug"
              :variant="store.selectGenders === gender.slug ? 'default' : 'secondary'"
              size="sm"
              class="cursor-pointer"
              >{{ gender.name }}</Button
            >
          </div>
          <div>
            <!-- SORT BY -->
            <Select v-model="store.sortBy">
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel class="text-muted">Sort by</SelectLabel>
                  <SelectItem value="popular">Populer</SelectItem>
                  <SelectItem value="trend">Trending</SelectItem>
                  <SelectItem value="lowest_price">Harga Terendah</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <hr />

        <div class="py-6">
          <!-- LIST OF PRODUCT -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card
              v-for="product in store.sortedProducts"
              :key="product.id"
              class="p-0 shadow-none border-none h-[340px] flex flex-col bg-white hover:border-1"
            >
              <CardContent class="border-0 p-0 flex flex-col flex-1 relative">
                <img
                  :src="product.images[0]"
                  :alt="product.name"
                  class="h-48 w-full object-cover rounded"
                />
                <Badge class="absolute right-0 top-2 rounded-none" variant="destructive">{{
                  product.brandName
                }}</Badge>

                <div class="py-3 flex flex-col space-y-5 flex-1 mb-2">
                  <h3 class="font-bold line-clamp-1">{{ product.name }}</h3>

                  <div class="flex items-center justify-between">
                    <span class="text-primary font-bold">
                      {{ formatPrice(product.price * (1 - (product.discount || 0) / 100)) }}
                    </span>
                    <span v-if="product.discount" class="text-red-700 line-through text-xs">
                      {{ formatPrice(product.price) }}
                    </span>
                  </div>
                </div>

                <!-- BUTTON ORDER -->
                <RouterLink :to="`/products/${product.slug}`" class="mt-auto">
                  <Button size="sm" class="w-full cursor-pointer">Order</Button>
                </RouterLink>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
