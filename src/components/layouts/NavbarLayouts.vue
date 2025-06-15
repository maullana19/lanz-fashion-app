<script setup lang="ts">
/* ------------------------ IMPORT ALL DATA STATEMENT ----------------------- */
import { useProductStore } from '@/stores/productStore'
import { Search, HeartPlus } from 'lucide-vue-next'
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
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
const store = useProductStore()
const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div
    class="w-full max-w-7xl mx-auto py-2 lg:py-3 flex justify-between items-center overflow-hidden"
  >
    <div class="flex items-center gap-5">
      <a href="/" class="font-bold text-lg">Lanz<span class="text-amber-800">Fashion.</span></a>
    </div>

    <div class="hidden md:flex items-center gap-5">
      <RouterLink to="/" active-class=" text-amber-800 font-semibold"> Shop </RouterLink>
      <RouterLink to="/about-us" active-class="text-amber-800 font-semibold">
        Tentang Kami
      </RouterLink>
      <RouterLink to="/service" active-class="text-amber-800"> Layanan</RouterLink>
    </div>

    <div class="hidden lg:flex gap-2">
      <div class="relative w-full items-center">
        <!-- Input search -->
        <Input
          v-model="store.searchQuery"
          id="search"
          type="search"
          placeholder="What are you looking for?"
          class="pl-10 bg-gray-200"
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <Search class="size-5 text-muted-foreground" />
        </span>

        <!-- Hasil pencarian -->
        <div
          v-if="store.searchQuery && store.filteredProducts.length"
          class="absolute top-0 left-0 mt-1 w-full bg-white border rounded shadow overflow-y-auto z-50 h-[500px]"
        >
          <div
            v-for="product in store.filteredProducts"
            :key="product.id"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <RouterLink :to="`/products/${product.slug}`" class="mt-auto">
              {{ product.name }}
            </RouterLink>
          </div>
        </div>

        <!-- Tidak ditemukan -->
        <div
          v-else-if="store.searchQuery && !store.filteredProducts.length"
          class="absolute mt-1 w-full bg-white border rounded shadow z-50 px-4 py-2 text-gray-500"
        >
          No results found.
        </div>
      </div>
    </div>

    <div class="hidden lg:flex gap-5 items-center">
      <Button variant="ghost" size="icon">
        <HeartPlus class="size-5" />
      </Button>

      <Button v-if="!authStore.user" data-testid="login-button" as-child>
        <a href="/login"> Login </a>
      </Button>
      <DropdownMenu v-else>
        <DropdownMenuTrigger> {{ authStore.user.name }}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogout"> Logout </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- MOBILE MENU -->
    <div class="lg:hidden">
      <p>Maintenance</p>
    </div>
  </div>
</template>

<style scoped></style>
