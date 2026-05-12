'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const LINE_COLORS: Record<string, string> = {
  balance: '#7EB8A0',
  energy: '#E8A84C',
  metabolism: '#D4687A',
  protection: '#8B7BB5',
  senolytic: '#5BA3C9',
  skin: '#C9A96E',
}

interface Product {
  id: string
  name: string
  price: number
  line: string
  slug: string
  image: string
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'D. VITC', price: 40, line: 'skin', slug: 'vitc', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=75' },
  { id: '2', name: 'D. VITBx', price: 43, line: 'energy', slug: 'vitbx', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=75' },
  { id: '3', name: 'D. TIMOUP', price: 42, line: 'metabolism', slug: 'timoup', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=75' },
  { id: '4', name: 'D. SLIM', price: 18, line: 'metabolism', slug: 'slim', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=75' },
  { id: '5', name: 'D. SF7N', price: 35, line: 'protection', slug: 'sf7n', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=75' },
  { id: '6', name: 'D. KASF', price: 18, line: 'balance', slug: 'kasf', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=75' },
  { id: '7', name: "D. H'ERTIC", price: 15, line: 'senolytic', slug: 'hertic', image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=400&q=75' },
  { id: '8', name: 'D. GLUTANAC', price: 19, line: 'energy', slug: 'glutanac', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=75' },
]

function ProductCard({ product }: { product: Product }) {
  const lineColor = LINE_COLORS[product.line] ?? '#C9A96E'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/productos/${product.slug}`} className="group block">
        <div className="relative aspect-square bg-sand-300 overflow-hidden mb-3">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          {/* Line color bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ backgroundColor: lineColor }}
          />
        </div>
        <p className="text-xs tracking-widest uppercase text-text font-sans mb-1">
          {product.name}
        </p>
        <p className="text-sm text-text-muted font-sans">€{product.price.toFixed(2)}</p>
      </Link>
    </motion.div>
  )
}

export default function ProductGrid({ products = MOCK_PRODUCTS }: { products?: Product[] }) {
  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-2xl font-light text-cocoa-900"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Todos os Produtos
          </h2>
          <Link
            href="/productos"
            className="text-xs tracking-[0.15em] uppercase text-text-muted font-sans hover:text-cocoa-900 transition-colors"
          >
            Ver todo
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
