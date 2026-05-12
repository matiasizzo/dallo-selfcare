'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { type Product, LINE_COLORS, formatPrice, getDefaultVariant } from '@/lib/products'

function ProductCard({ product }: { product: Product }) {
  const category = product.categories
  const lineColor = LINE_COLORS[category?.slug ?? ''] ?? '#C9A96E'
  const variant = getDefaultVariant(product)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/productos/${product.slug}`} className="group block">
        <div className="relative aspect-square bg-sand-300 overflow-hidden mb-3">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-text-muted text-xs font-sans">Sin imagen</span>
            </div>
          )}
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ backgroundColor: lineColor }}
          />
        </div>
        <p className="text-xs tracking-widest uppercase text-text font-sans mb-1">{product.name}</p>
        {product.tagline && (
          <p className="text-xs text-text-muted font-sans mb-1 truncate">{product.tagline}</p>
        )}
        {variant && (
          <p className="text-sm text-text-muted font-sans">{formatPrice(variant.price_cents)}</p>
        )}
      </Link>
    </motion.div>
  )
}

interface ProductGridProps {
  products: Product[]
  title?: string
  showViewAll?: boolean
}

export default function ProductGrid({ products, title = 'Todos los Productos', showViewAll = true }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <section className="w-full py-16 px-6">
        <div className="max-w-screen-xl mx-auto text-center py-24">
          <p className="text-text-muted font-sans text-sm">No hay productos disponibles.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-2xl font-light text-cocoa-900"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {title}
          </h2>
          {showViewAll && (
            <Link
              href="/productos"
              className="text-xs tracking-[0.15em] uppercase text-text-muted font-sans hover:text-cocoa-900 transition-colors"
            >
              Ver todo
            </Link>
          )}
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
