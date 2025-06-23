<script setup lang="ts">
/* ---------------------------- IMPORT STATEMENT ---------------------------- */
import { useProductStore } from '@/stores/productStore'
import programs from '@/data/programs.json'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
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
            <BreadcrumbLink href="#"> Home </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Shop</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <aside class="flex flex-col space-y-3 lg:sticky top-2 lg:top-24 self-start overflow-hidden">
        <!-- SELECT CATEGORY -->
        <Card>
          <CardHeader>
            <h1 class="font-semibold text-muted-foreground">Category</h1>
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
                    {{ category.titleCategories }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <!-- SELECT BRAND -->
        <Card>
          <CardHeader>
            <h1 class="font-semibold text-muted-foreground">Select Brand</h1>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel class="text-muted-foreground font-semibold">
                    Coming soon
                  </SelectLabel>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <!-- RESELLER PROGRAM -->
        <Card>
          <CardContent>
            <div class="space-y-4">
              <h1 class="font-semibold">
                {{ programs[0].resellerProgramContent.title }}
              </h1>

              <ul
                v-for="(contentList, idx) in programs[0].resellerProgramContent.listContent"
                :key="idx"
                class="list-disc text-sm line-clamp-1"
              >
                <li>{{ contentList }}</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button class="w-full hover:cursor-pointer"> Learn more </Button>
          </CardFooter>
        </Card>
      </aside>

      <div class="col-span-3 p-2">
        <div class="flex justify-between items-center mb-2">
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
          <div>
            <!-- SORT BY -->
            <Select v-model="store.sortBy">
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
        <hr />

        <div class="py-6">
          <!-- LIST OF PRODUCT -->
          <div
            v-if="store.sortedProducts.length === 0"
            class="text-center text-muted-foreground py-12"
          >
            The product was not found.
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                <Badge class="absolute right-0 top-2 rounded-none bg-primary"
                  >-{{ product.discount }}%</Badge
                >

                <div class="py-3 flex flex-col space-y-5 flex-1 mb-2">
                  <h3 class="font-bold line-clamp-1">{{ product.name }}</h3>

                  <div class="flex items-center justify-between">
                    <span class="text-primary font-bold">
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
