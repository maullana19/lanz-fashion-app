/* ----------------------------- INTERFACE TYPE ----------------------------- */
export interface Product {
  id: number
  slug: string
  name: string
  brandName: string
  brandSlug: string
  category: string[]
  price: number
  discount?: number
  size: string[]
  colors: string[]
  description: string
  images: string[]
  stock: number
  rating: number
  isNew?: boolean
  material: string
  gender?: 'men' | 'women' | 'unisex'
  tags?: string[]
  popularity: number
  trendScore: number
}

interface Gender {
  id: number
  slug: string
  name: string
}

interface Brands {
  id: number
  slug: string
  namebrand: string
  categorybrand: string[]
}

interface Review {
  id: number
  productId: number
  userName: string
  rating: number
  comment: string
  date: string
}

interface Category {
  id: number
  name: string
  slug: string
  count: number
}

interface ColorOption {
  id: number
  name: string
  code: string
}

/* ------------------------------- DATA DUMMY ------------------------------- */

export const brandCategory: Brands[] = [
  { id: 1, slug: 'zara', namebrand: 'Zara', categorybrand: ['import', 'local'] },
  { id: 2, slug: 'uniqlo', namebrand: 'Uniqlo', categorybrand: ['import'] },
  { id: 3, slug: 'nike', namebrand: 'Nike', categorybrand: ['import'] },
  { id: 4, slug: 'lanzfashion', namebrand: 'LanzFashion', categorybrand: ['local'] },
]

export const genderCategory: Gender[] = [
  { id: 1, slug: 'unisex', name: 'Unisex' },
  { id: 2, slug: 'man', name: 'Pria' },
  { id: 3, slug: 'women', name: 'Wanita' },
]

export const fashionProducts: Product[] = [
  {
    id: 1,
    slug: 'kaos-putih-hotel',
    name: 'Kaos Putih Hotel Teks',
    brandName: 'Zara',
    brandSlug: 'zara',
    category: ['atasan'],
    price: 249000,
    discount: 15,
    size: ['S', 'M', 'L', 'XL'],
    colors: ['brown', 'black', 'white'],
    description: 'Kaos premium dengan bahan katun 100% nyaman dipakai seharian',
    images: [
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9',
    ],
    stock: 42,
    rating: 4.5,
    isNew: true,
    material: 'Katun',
    gender: 'unisex',
    tags: ['flannel', 'longsleeve'],
    popularity: 72,
    trendScore: 55,
  },
  {
    id: 2,
    slug: 'sweater-musim-dingin-premium',
    name: 'Sweater Musim Dingin Premium',
    brandName: 'Uniqlo',
    brandSlug: 'uniqlo',
    category: ['atasan'],
    price: 349000,
    discount: 15,
    size: ['28', '30', '32', '34'],
    colors: ['Orange', 'Brown', 'Black', 'White'],
    description: 'Sweater modern untuk penampilan kasual yang stylish',
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea'],
    stock: 15,
    rating: 4.2,
    material: 'Twill Cotton',
    gender: 'unisex',
    popularity: 76,
    tags: ['chino'],
    trendScore: 56,
  },
  {
    id: 3,
    slug: 'sepatu-sneakers-urban',
    name: 'Sepatu Sneakers Urban',
    brandName: 'Nike',
    brandSlug: 'nike',
    category: ['sepatu'],
    price: 599000,
    discount: 20,
    size: ['39', '40', '41', '42', '43'],
    colors: ['brown', 'black', 'white'],
    description:
      'Sneakers dengan sol karet tebal dan material breathable untuk kenyamanan maksimal',
    images: ['https://images.unsplash.com/photo-1600269452121-4f2416e55c28'],
    stock: 8,
    rating: 4.8,
    isNew: true,
    material: 'Knit Fabric + Rubber',
    gender: 'men',
    popularity: 77,
    tags: ['sneakers', 'urban'],
    trendScore: 55,
  },
  {
    id: 4,
    slug: 'topi-baseball-premium',
    name: 'Topi Baseball Premium',
    brandName: 'Uniqlo',
    brandSlug: 'uniqlo',
    category: ['aksesoris'],
    price: 129000,
    discount: 5,
    size: ['All Size'],
    colors: ['brown', 'black', 'white'],
    description: 'Topi baseball dengan bordir logo premium dan bahan cepat kering',
    images: ['https://images.unsplash.com/photo-1575428652377-a2d80e2277fc'],
    stock: 23,
    rating: 3.9,
    material: 'Polyester',
    gender: 'unisex',
    popularity: 77,
    tags: ['topi'],
    trendScore: 53,
  },
  {
    id: 5,
    slug: 'sweater-musim-dingin-lanzfashion',
    name: 'Sweater Polos Musim Dingin Design LanzFashion',
    brandName: 'LanzFashion',
    brandSlug: 'lanzfashion',
    category: ['atasan'],
    price: 259000,
    discount: 10,
    size: ['M', 'L', 'XL', 'XXL'],
    colors: ['orange', 'white'],
    description: 'Sweater modern untuk penampilan kasual yang stylish',
    images: ['/images/products/sweater_orange_lansfashion.png'],
    stock: 222,
    rating: 4.8,
    material: 'Twill Cotton',
    gender: 'unisex',
    popularity: 72,
    tags: ['sweater'],
    trendScore: 76,
  },
  {
    id: 6,
    slug: 'sweater-rajut-bahan-tebal',
    name: 'Sweater Raju Bahan Tebal',
    brandName: 'LanzFashion',
    brandSlug: 'lanzfashion',
    category: ['atasan'],
    price: 449000,
    discount: 7,
    size: ['M', 'L', 'XL', 'XXL'],
    colors: ['brown', 'black', 'white'],
    description: 'Sweater modern untuk penampilan kasual yang stylish dan minimalist',
    images: [
      'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    stock: 22,
    rating: 4.5,
    material: 'Twill Cotton',
    gender: 'women',
    popularity: 70,
    tags: ['sweater'],
    trendScore: 72,
  },
  {
    id: 7,
    slug: 'stylish-jeans-blue-color',
    name: 'Stylish Jeans Biru ',
    brandName: 'LanzFashion',
    brandSlug: 'lanzfashion',
    category: ['bawahan'],
    price: 649000,
    discount: 10,
    size: ['30', '33', '34'],
    colors: ['brown', 'black', 'white'],
    description: 'Celana Jeans Terbaik Kualitas Lokal Perpaduan antara minimalist dan cleanist',
    images: [
      'https://images.pexels.com/photos/4210864/pexels-photo-4210864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    stock: 12,
    rating: 4.2,
    material: 'Jeans',
    gender: 'unisex',
    popularity: 79,
    tags: ['pants'],
    trendScore: 74,
  },
]

export const categories: Category[] = [
  { id: 1, name: 'Atasan', slug: 'atasan', count: 12 },
  { id: 2, name: 'Bawahan', slug: 'bawahan', count: 8 },
  { id: 3, name: 'Sepatu', slug: 'sepatu', count: 5 },
  { id: 4, name: 'Aksesoris', slug: 'aksesoris', count: 15 },
]

export const colorOptions: ColorOption[] = [
  { id: 1, name: 'Hitam', code: '#000000' },
  { id: 2, name: 'Putih', code: '#ffffff' },
  { id: 3, name: 'Biru Navy', code: '#1e293b' },
]

export const sizeOptions = {
  baju: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  celana: ['28', '30', '32', '34', '36'],
  sepatu: ['38', '39', '40', '41', '42', '43'],
  aksesoris: ['All Size'],
}

export const productReviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userName: 'John Doe',
    rating: 5,
    comment: 'Bahan sangat nyaman dan tidak panas',
    date: '2023-10-15',
  },
]
