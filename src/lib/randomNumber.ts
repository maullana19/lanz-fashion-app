function generateRandomResiNumber(): string {
  let resi = ''
  for (let i = 0; i < 10; i++) {
    resi += Math.floor(Math.random() * 10) // 0–9
  }
  return resi
}

export const getRandomResiNumber = generateRandomResiNumber()
