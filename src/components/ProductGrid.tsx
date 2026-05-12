'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type Product, LINE_COLORS, formatPrice, getDefaultVariant } from '@/lib/products'

function ProductCard({ product }: { product: Product }) {
  const category = product.categories
  const lineColor = LINE_COLORS[category?.slug ?? ''] ?? '#C9A96E'
  const variant = getDefaultVariant(product)

  return (
    <Link href={`/productos/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] bg-sand-100 overflow-hidden mb-4">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-text-muted text-xs">Sin imagen</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: lineColor }} />
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-cocoa-900 mb-1 group-hover:text-cocoa-600 transition-colors">
        {product.name}
      </p>
      {product.tagline && (
        <p className="text-xs text-text-muted mb-2 truncate font-light">{product.tagline}</p>
      )}
      {variant && (
        <p className="text-xs text-text-muted">{formatPrice(variant.price_cents)}</p>
      )}
    </Link>
  )
}

interface ProductGridProps {
  products: Product[]
  title?: string
  showViewAll?: boolean
}

export default function ProductGrid({ products, title = 'Todos los productos', showViewAll = true }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <section className="w-full py-24 px-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="text-text-muted text-sm">No hay productos disponibles.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-24 px-8 border-t border-sand-300">
      <div className="max-w-screen-xl mx-auto">
        {title && (
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-cormorant text-4xl font-light text-cocoa-900">{title}</h2>
            {showViewAll && (
              <Link href="/productos" className="text-[11px] tracking-[0.2em] uppercase text-text-muted hover:text-cocoa-900 transition-colors">
                Ver todo
              </Link>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
