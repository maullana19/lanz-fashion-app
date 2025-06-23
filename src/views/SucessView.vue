<script setup lang="ts">
/* ------------------------------- IMPORT DATA ------------------------------ */
import { ref } from 'vue'
import { getRandomResiNumber } from '@/lib/randomNumber'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */

const randNumberForResi = getRandomResiNumber
const dataStorageRaw = sessionStorage.getItem('dataStorage')
const getDataSessionStorage = dataStorageRaw ? JSON.parse(dataStorageRaw) : null
const currentStatus = ref('shipped')

const shippingSteps = [
  { label: 'Diterima Penjual', value: 'received' },
  { label: 'Diproses', value: 'processing' },
  { label: 'Dikirim', value: 'shipped' },
  { label: 'Sampai Tujuan', value: 'delivered' },
]

function isStepActive(value: string) {
  const idx = shippingSteps.findIndex((s) => s.value === value)
  const currIdx = shippingSteps.findIndex((s) => s.value === currentStatus.value)
  return idx <= currIdx
}
</script>

<template>
  <section class="px-4 md:px-0 py-6">
    <Card>
      <CardContent>
        <div class="mx-auto mb-7">
          <h2 class="text-xl font-bold mb-4 text-center">Delivery Status</h2>
          <div class="flex items-center justify-between">
            <template v-for="(step, idx) in shippingSteps" :key="step.value">
              <div class="flex flex-col items-center flex-1">
                <div
                  class="w-6 h-6 flex items-center justify-center rounded-full border-2"
                  :class="{
                    'bg-green-500 border-green-500 text-white': isStepActive(step.value),
                    'bg-gray-200 border-gray-300 text-gray-400': !isStepActive(step.value),
                  }"
                >
                  <span v-if="isStepActive(step.value)">&#10003;</span>
                  <span v-else>{{ idx + 1 }}</span>
                </div>
                <span
                  class="mt-2 text-xs font-medium"
                  :class="isStepActive(step.value) ? 'text-green-600' : 'text-gray-400'"
                >
                  {{ step.label }}
                </span>
              </div>
              <!-- Garis penghubung antar step -->
              <div
                v-if="idx < shippingSteps.length - 1"
                class="flex-1 h-1"
                :class="isStepActive(shippingSteps[idx + 1].value) ? 'bg-green-500' : 'bg-gray-300'"
              ></div>
            </template>
          </div>
        </div>
        <br />
        <div>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead> Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead> Number.Resi </TableHead>
                <TableHead class="text-right"> Total Amount </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell class="font-medium">
                  {{ getDataSessionStorage.customer_name }}
                </TableCell>
                <TableCell>{{ getDataSessionStorage.customer_address }}</TableCell>
                <TableCell
                  >{{ getDataSessionStorage.payment_method }} -
                  {{ getDataSessionStorage.card_number }}xxxx</TableCell
                >
                <TableCell>{{ randNumberForResi }}</TableCell>
                <TableCell class="text-right font-bold"
                  >Rp {{ getDataSessionStorage.product_price }}</TableCell
                >
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <Button as-child>
          <a href="/">Shopping again?</a>
        </Button>
      </CardFooter>
    </Card>
  </section>
</template>
