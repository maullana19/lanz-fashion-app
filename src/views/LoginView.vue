<script setup lang="ts">
/* -------------------------- IMPORT DATA STATEMENT ------------------------- */

import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'

/* ----------------------------- LOGIC STATEMENT ----------------------------- */

const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Email dan password harus diisi'
    return
  }

  try {
    isLoading.value = true
    const success = await authStore.login(email.value, password.value)

    if (success) {
      router.push('/')
    } else {
      error.value = 'Email atau password salah'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="container mx-auto py-12 overflow-hidden">
    <div class="max-w-md mx-auto p-6 border rounded-lg">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block mb-1">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="email"
            class="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label for="password" class="block mb-1">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="password"
            class="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>

        <Button type="submit" :disabled="isLoading" class="w-full cursor-pointer">
          {{ isLoading ? 'Memproses...' : 'Login' }}
        </Button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-600">
        <p>Gunakan email berikut untuk testing :</p>
        <p class="font-mono mt-1">admin@example.com / user@example.com</p>
        <p class="mt-1">Password: <span class="font-mono">password123</span></p>
      </div>
    </div>
  </section>
</template>
