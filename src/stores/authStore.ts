import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  // Mock user data
  const mockUsers: User[] = [
    { id: '1', name: 'Admin', email: 'admin@example.com', role: 'admin' },
    { id: '2', name: 'User Biasa', email: 'user@example.com', role: 'user' },
  ]

  function login(email: string, password: string) {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find((u) => u.email === email)

        if (foundUser && password === 'password123') {
          user.value = foundUser
          isAuthenticated.value = true
          localStorage.setItem('mockAuth', 'true')
          resolve(true)
        } else {
          resolve(false)
        }
      }, 500)
    })
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('mockAuth')
  }

  const checkAuth = () => {
    if (localStorage.getItem('mockAuth')) {
      isAuthenticated.value = true

      user.value = mockUsers[0]
    }
  }

  return { user, isAuthenticated, login, logout, checkAuth }
})
