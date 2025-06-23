<script setup lang="ts">
/* ------------------------ IMPORT ALL DATA STATEMENT ----------------------- */
import { useSearchStore } from '@/stores/searchStore'
import {
  HeartPlus,
  LogIn,
  Store,
  CircleAlert,
  HandHeart,
  ShoppingBag,
  CircleDollarSign,
  Menu,
  Handshake,
} from 'lucide-vue-next'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent } from '@/components/ui/card'
import { useAuthStore } from '@/stores/authStore'
import { RouterLink, useRouter } from 'vue-router'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
const searchStore = useSearchStore()
const authStore = useAuthStore()
const router = useRouter()

// FOR INPUT SEARCH POSITION
const SHEET_SIDES = ['top'] as const

// Handle Logout User
const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div
    class="w-full max-w-7xl mx-auto py-2 px-2 md:py-3 flex justify-between items-center overflow-hidden"
  >
    <div class="flex items-center gap-5">
      <RouterLink to="/" class="font-bold"
        >Lanz<span class="text-primary text-lg">Fashion.</span></RouterLink
      >
    </div>

    <div class="hidden md:flex items-center gap-8 text-sm">
      <RouterLink
        class="flex flex-col items-center"
        to="/"
        active-class="underline underline-offset-8 text-primary font-bold"
        ><span><Store class="size-5" /></span> Shop
      </RouterLink>
      <RouterLink
        class="flex flex-col items-center"
        to="/about-us"
        active-class="text-primary underline underline-offset-8 font-bold"
      >
        <span><CircleAlert class="size-5" /></span> About
      </RouterLink>
      <RouterLink
        class="flex flex-col items-center"
        to="/service"
        active-class="text-primary underline underline-offset-8 font-bold"
        ><span><HandHeart class="size-5" /></span>Service</RouterLink
      >
      <RouterLink
        class="flex flex-col items-center"
        to="/brands"
        active-class="text-primary underline underline-offset-8 font-bold"
        ><span><Handshake class="size-5" /></span>Brands</RouterLink
      >
    </div>

    <!-- SEARCH -->
    <div class="hidden lg:flex gap-2">
      <Sheet v-for="side in SHEET_SIDES" :key="side">
        <SheetTrigger as-child>
          <Input type="text" placeholder="Find your fashion..." class="bg-gray-100" />
        </SheetTrigger>
        <SheetContent :side="side" class="max-w-5xl mx-auto rounded-b-2xl">
          <SheetHeader>
            <SheetTitle>Search your product...</SheetTitle>
            <SheetDescription> </SheetDescription>
          </SheetHeader>
          <div class="w-full p-6 space-y-3">
            <div class="mb-6">
              <Input
                type="text"
                placeholder="What are you looking for?"
                v-model="searchStore.searchQuery"
              />
            </div>
            <div
              v-if="searchStore.searchProductsGetters.length"
              class="grid grid-cols-2 gap-3 overflow-auto"
            >
              <Card v-for="product in searchStore.searchProductsGetters" :key="product.id" class="">
                <CardContent>
                  <div class="flex items-center gap-3">
                    <img
                      :src="Array.isArray(product.images) ? product.images[0] : product.images"
                      alt="product-images"
                      class="size-14 object-cover rounded-full"
                    />
                    <div class="flex flex-col">
                      <RouterLink :to="`/products/${product.slug}`" class="line-clamp-1">
                        {{ product.name }}
                      </RouterLink>
                      <p>{{ product.category }}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <p v-else-if="searchStore.searchQuery" class="text-muted-foreground text-center">
              Not Found.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>

    <div class="hidden lg:flex gap-5 items-center">
      <Button as-child size="icon" variant="outline">
        <RouterLink to="/programs" active-class="pointer-event-none"
          ><CircleDollarSign />
        </RouterLink>
      </Button>

      <DropdownMenu as-child>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" size="icon"> <ShoppingBag /> </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Please Log In</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu as-child>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" size="icon"> <HeartPlus /> </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Please Log In</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button v-if="!authStore.user" data-testid="login-button" as-child>
        <RouterLink to="/login" active-class="pointer-event-none"><LogIn /> Login </RouterLink>
      </Button>
      <DropdownMenu v-else>
        <DropdownMenuTrigger> {{ authStore.user.name }}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogout"> Logout </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- MOBILE MENU -->
    <div class="lg:hidden flex items-center">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent class="w-[260px] sm:w-[340px]">
          <SheetHeader>
            <SheetTitle>Main Menu</SheetTitle>
            <SheetDescription>
              <div class="flex flex-col space-y-4 mt-4">
                <div>
                  <Input
                    type="text"
                    class="bg-gray-200"
                    v-model="searchStore.searchQuery"
                    placeholder="search your fashion"
                  />

                  <div v-if="searchStore.searchProductsGetters.length">
                    <div
                      v-for="product in searchStore.searchProductsGetters"
                      :key="product.id"
                      class="border-b py-2"
                    >
                      {{ product.name }}
                    </div>
                  </div>

                  <p v-else-if="searchStore.searchQuery" class="text-gray-500">Tidak ditemukan.</p>
                </div>
                <RouterLink
                  class="flex gap-3 items-center"
                  to="/"
                  active-class="bg-primary text-white py-2 px-4 rounded-lg"
                  ><span><Store class="size-6" /></span> Shop
                </RouterLink>

                <RouterLink
                  class="flex gap-3 items-center"
                  to="/about-us"
                  active-class="bg-primary text-white py-2 px-4 rounded"
                  ><span><CircleAlert class="size-6" /></span> About Us
                </RouterLink>

                <RouterLink
                  class="flex gap-3 items-center"
                  to="/service"
                  active-class="bg-primary text-white py-2 px-4 rounded"
                  ><span><HandHeart class="size-6" /></span> Service
                </RouterLink>
              </div>
              <hr class="my-6" />
              <div class="flex flex-col space-y-4">
                <Button as-child variant="outline">
                  <RouterLink to="/programs" active-class="pointer-event-none"
                    ><CircleDollarSign /> Program reseller
                  </RouterLink>
                </Button>

                <Button as-child variant="outline">
                  <RouterLink to="/cart" active-class="pointer-event-none"
                    ><ShoppingBag /> Your cart
                  </RouterLink>
                </Button>

                <Button as-child variant="outline">
                  <RouterLink to="/favorites" active-class="pointer-event-none"
                    ><HeartPlus /> Your favorites
                  </RouterLink>
                </Button>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</template>

<style scoped></style>
