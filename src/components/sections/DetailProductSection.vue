<script setup lang="ts">
/* ------------------------ IMPORT ALL DATA STATEMENT ----------------------- */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { toast } from 'vue-sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CircleX } from 'lucide-vue-next'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { useProductStore } from '@/stores/productStore'
import { paymentMethod } from '@/data/payments'
import { datesFormatted } from '@/lib/dateFormater'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
// ALL DATA VARIABLE
const router = useRouter()
const modules = [Pagination]
const store = useProductStore()
const buyerName = ref('')
const buyerAddress = ref('')
const payMethod = ref('')
const cardNumber = ref('')

// PROPS FOR COMPONENTS DATA
const props = defineProps<{
  nameProduct?: string
  priceProduct?: number
  imageProduct: string[]
  brandNameProduct: string
  descriptionProduct: string
  discountProduct?: number
  sizesProduct: string[]
  colorProduct: string[]
  breadCrumbProduct: string
  materialProduct: string
}>()

// FUNCTION HANDLE CHECKOUT
function submitCheckOut() {
  if (!buyerName.value || !buyerAddress.value || !payMethod.value) {
    toast('Tolong isi semua data yang tersedia!')
  } else {
    const dataStorage = {
      product_name: props.nameProduct,
      product_price: props.priceProduct,
      customer_name: buyerName.value,
      customer_address: buyerAddress.value,
      payment_method: payMethod.value,
      card_number: cardNumber.value,
    }

    sessionStorage.setItem('dataStorage', JSON.stringify(dataStorage))

    toast('Sukses!', {
      description: `${datesFormatted}` + '-' + `${props.nameProduct}`,
      action: {
        label: 'Cek Resi',
        onClick: () => router.push('/success-page'),
      },
    })
  }
}
</script>

<template>
  <div class="container mx-auto px-3 lg:px-0 py-8">
    <div class="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/"> Home </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#"> Detail </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {{ breadCrumbProduct }}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Gambar Produk Carousel -->
      <div class="bg-white rounded-xl overflow-hidden shadow-md">
        <Swiper
          :pagination="true"
          :modules="modules"
          :space-between="20"
          :slides-per-view="1"
          class="w-full rounded-lg"
        >
          <SwiperSlide v-for="(img, index) in imageProduct" :key="index">
            <img :src="img" :alt="nameProduct" class="w-full h-[420px] object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- DETAIL PRODUCTS -->
      <div class="flex flex-col space-y-4">
        <div class="flex flex-col gap-2">
          <div class="flex gap-3">
            <Badge class="bg-amber-700">{{ brandNameProduct }}</Badge>
            <Badge class="bg-amber-700">Diskon {{ discountProduct }}%</Badge>
            <Badge class="bg-amber-700">{{ materialProduct }}</Badge>
          </div>

          <h1 class="text-2xl font-bold">{{ nameProduct }}</h1>
          <p class="text-gray-600">{{ descriptionProduct }}</p>
        </div>

        <div class="flex flex-col space-y-3">
          <span class="line-through text-gray-400 text-sm">
            Rp{{ (priceProduct ?? 0).toLocaleString() }}
          </span>
          <h4 class="text-2xl font-bold text-primary">
            Rp{{ ((priceProduct ?? 0) * (1 - (discountProduct || 0) / 100)).toLocaleString() }}
          </h4>

          <div v-if="sizesProduct.length">
            <h1 class="mb-2">Pilih Size</h1>
            <div class="flex gap-2">
              <Button
                size="sm"
                :variant="store.selectedSize === size ? 'default' : 'outline'"
                v-for="size in sizesProduct"
                :key="size"
                @click="store.selectedSize = size"
              >
                {{ size }}
                <span v-if="store.selectedSize === size" class="ml-1">&#10003;</span>
              </Button>
            </div>
          </div>

          <div v-if="colorProduct.length">
            <h1 class="mb-2">Pilih Warna</h1>
            <div class="flex gap-3">
              <Button
                size="sm"
                :variant="store.selectedColor === color ? 'default' : 'outline'"
                v-for="color in colorProduct"
                :key="color"
                @click="store.selectedColor = color"
              >
                {{ color }}
                <span v-if="store.selectedColor === color" class="ml-1">&#10003;</span>
              </Button>
            </div>
          </div>
        </div>
        <hr />
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Button as-child class="cursor-pointer w-full" variant="outline"
            ><a href="/"
              >Cancel <span><CircleX /></span
            ></a>
          </Button>

          <!-- FORM CHECKOUT -->
          <Dialog>
            <DialogTrigger>
              <Button class="cursor-pointer w-full bg-amber-700"
                >Checkout <span><ArrowRight /></span
              ></Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Checkout Form</DialogTitle>
                <DialogDescription>
                  Pastikan data pesanan sudah benar sebelum melanjutkan pembayaran.
                </DialogDescription>

                <div class="space-y-3 py-2">
                  <div class="flex justify-between">
                    <span class="font-semibold">Produk</span>
                    <span class="italic">{{ nameProduct }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-semibold">Harga</span>
                    <span class="italic"
                      >Rp{{
                        ((priceProduct ?? 0) * (1 - (discountProduct || 0) / 100)).toLocaleString()
                      }}</span
                    >
                  </div>
                  <div class="flex justify-between">
                    <span class="font-semibold">Size</span>
                    <span class="italic">{{ store.selectedSize || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-semibold">Warna</span>
                    <span class="italic">{{ store.selectedColor || '-' }}</span>
                  </div>
                  <hr />
                  <!-- INPUT NAME  -->
                  <div class="space-y-3">
                    <Label for="person">Nama Penerima</Label>
                    <Input id="person" v-model="buyerName" type="text" placeholder="Nama Anda" />
                  </div>
                  <!-- INPUT ADDRESS -->
                  <div class="space-y-3 mb-3">
                    <Label>Alamat</Label>
                    <Textarea v-model="buyerAddress" placeholder="Alamat Lengkap"></Textarea>
                  </div>
                  <!-- INPUT PAYMENT METHOD -->
                  <div class="grid grid-cols-2 items-center gap-3">
                    <div class="w-full">
                      <Label class="space-y-3 mb-3">Payment</Label>
                      <Select v-model="payMethod">
                        <SelectTrigger class="w-full">
                          <SelectValue placeholder="Select a payment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel class="font-semibold">Select payment method</SelectLabel>
                            <SelectItem
                              v-for="pay in paymentMethod"
                              :key="pay.id"
                              :value="pay.title"
                            >
                              {{ pay.title }}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <!-- INPUT CARD NUMBER CONDITION FOR CARD METHOD -->
                    <div v-if="['Debit', 'Credit'].includes(payMethod)">
                      <Label for="card-number" class="space-y-3 mb-3">Card Number</Label>
                      <Input
                        id="card-number"
                        v-model="cardNumber"
                        type="number"
                        placeholder="Enter your card number"
                      />
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <DialogFooter>
                <Button @click="submitCheckOut" class="cursor-pointer"> Pay </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
</template>
