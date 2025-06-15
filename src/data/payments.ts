interface PaymentMethodTypes {
  id: number
  title: string
  val: string
}

export const paymentMethod: PaymentMethodTypes[] = [
  {
    id: 1,
    title: 'Debit',
    val: 'debt',
  },
  {
    id: 2,
    title: 'Credit',
    val: 'credit',
  },
  {
    id: 3,
    title: 'QRIS',
    val: 'qris',
  },
]
