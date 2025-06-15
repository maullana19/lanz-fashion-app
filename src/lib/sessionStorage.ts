import { ref, watch } from 'vue'

export function useSessionStorage<T>(key: string, defaultValue: T) {
  const storedValue = sessionStorage.getItem(key)
  const data = ref<T>(storedValue ? JSON.parse(storedValue) : defaultValue)

  // Sync perubahan ke sessionStorage
  watch(
    data,
    (newVal) => {
      sessionStorage.setItem(key, JSON.stringify(newVal))
    },
    { deep: true },
  )

  const clear = () => {
    sessionStorage.removeItem(key)
  }

  return {
    data,
    clear,
  }
}
