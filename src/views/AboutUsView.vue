<script setup lang="ts">
/* ------------------------------- IMPORT DATA ------------------------------ */
import { Card, CardHeader, CardContent } from '@/components/ui/card'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
interface DataTypeVisionAndMission {
  id: number
  title: string
  contents: string | string[]
}

const dataVisiAndMission: DataTypeVisionAndMission[] = [
  {
    id: 1,
    title: 'Visi',
    contents:
      'Menjadi brand fashion lokal terdepan yang menginspirasi gaya hidup modern dan positif.',
  },
  {
    id: 2,
    title: 'Misi',
    contents: [
      'Menghadirkan produk berkualitas & terjangkau',
      'Memberikan pelayanan terbaik',
      'Mendukung kreativitas anak bangsa',
    ],
  },
  {
    id: 3,
    title: 'Nilai Kami',
    contents: ['Kejujuran & Transparansi', 'Inovasi & Kreativitas', 'Peduli Lingkungan'],
  },
]
</script>

<template>
  <section class="py-12 container max-w-5xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-3 mb-12">
      <div>
        <h1 class="text-4xl font-bold mb-4 text-amber-700">Tentang Kami</h1>
        <p class="text-gray-600 text-lg mb-8">
          Lanz Fashion adalah brand fashion lokal yang berkomitmen menghadirkan produk berkualitas,
          stylish, dan nyaman untuk semua kalangan. Kami percaya setiap orang berhak tampil percaya
          diri dengan gaya terbaiknya.
        </p>
      </div>

      <div>
        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
          alt="JustPhotos"
          class="rounded w-full object-cover"
        />
      </div>
    </div>

    <div class="grid grid-cols-3 gap-5 py-6">
      <Card v-for="item in dataVisiAndMission" :key="item.id">
        <CardHeader>
          <h2 class="text-2xl font-semibold text-amber-700">{{ item.title }}</h2>
        </CardHeader>

        <CardContent>
          <div v-if="Array.isArray(item.contents)">
            <ul class="list-disc list-inside">
              <li v-for="(point, idx) in item.contents" :key="idx">{{ point }}</li>
            </ul>
          </div>
          <div v-else>
            <p>{{ item.contents }}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
