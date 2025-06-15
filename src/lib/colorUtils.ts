/**
 * Format warna HEX ke format standar
 * @param hex - Input warna (dengan atau tanpa #)
 * @returns Warna HEX yang diformat (contoh: "#RRGGBB")
 */
export const formatHexColor = (hex: string): string => {
  // Hapus karakter # jika ada
  let value = hex.replace('#', '')

  // Handle shorthand HEX (3 digit)
  if (value.length === 3) {
    value = value
      .split('')
      .map((c) => c + c)
      .join('')
  }

  // Tambahkan # jika belum ada dan valid
  if (/^[0-9A-Fa-f]{6}$/.test(value)) {
    return `#${value.toUpperCase()}`
  }

  // Return default jika invalid
  console.warn(`Warna HEX invalid: ${hex}`)
  return '#000000'
}

/**
 * Validasi warna HEX
 */
export const isValidHex = (hex: string): boolean => {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)
}
