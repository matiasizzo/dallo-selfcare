'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { type Product, formatPrice, getDefaultVariant, LINE_COLORS } from '@/lib/products'
import { useCart } from '@/store/cart'

function CarouselCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const variant = getDefaultVariant(product)
  const lineColor = LINE_COLORS[product.categories?.slug ?? ''] ?? '#553b2e'

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!variant) return
    addItem({
      variantId: variant.id,
      productId: product.id,
      name: product.name,
      variantName: variant.name,
      priceCents: variant.price_cents,
      imageUrl: product.image_url ?? null,
      lineColor,
    })
  }

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group flex-shrink-0 w-[200px] md:w-[220px] block cursor-pointer"
    >
      {/* Square image */}
      <div
        className="relative aspect-square overflow-hidden flex items-center justify-center transition-colors duration-300 mb-0"
        style={{ background: '#f6eee6' }}
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain object-center transition-transform duration-500 group-hover:-translate-y-1"
            sizes="220px"
          />
        ) : (
          <div className="w-full h-full" />
        )}
        <button
          onClick={handleAdd}
          className="absolute bottom-3 left-3 right-3 bg-paper text-ink border border-line-soft rounded-full py-[9px] px-3 text-[11px] font-[500] flex items-center justify-center gap-1.5 opacity-0 translate-y-[8px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-ink hover:text-bg hover:border-ink"
          aria-label={`Añadir ${product.name}`}
        >
          <Plus size={12} strokeWidth={1.5} />
          Añadir
        </button>
      </div>

      {/* Body */}
      <div className="pt-3 pb-1">
        <h3 className="text-[13px] font-[500] text-ink m-0 truncate">{product.name}</h3>
        {variant && (
          <p className="text-[12px] text-ink-soft mt-[2px] m-0">{formatPrice(variant.price_cents)}</p>
        )}
      </div>
    </Link>
  )
}

interface ProductCarouselProps {
  products: Product[]
  title: string
  eyebrow?: string
  viewAllHref?: string
  viewAllLabel?: string
}

export default function ProductCarousel({
  products,
  title,
  eyebrow,
  viewAllHref = '/productos',
  viewAllLabel = 'Ver todo',
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? 480 : -480, behavior: 'smooth' })
  }

  if (products.length === 0) return null

  return (
    <section className="w-full py-[60px] px-6 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-6">
          <div>
            {eyebrow && (
              <p className="text-[11px] tracking-[0.28em] uppercase text-ink-mute m-0 mb-1">{eyebrow}</p>
            )}
            <h2
              className="font-cormorant font-[400] text-ink m-0 tracking-[-0.005em]"
              style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.1 }}
            >
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Arrow buttons */}
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
            <Link
              href={viewAllHref}
              className="text-[13px] text-ink border-b border-ink pb-px whitespace-nowrap hover:text-brown hover:border-brown transition-colors ml-2"
            >
              {viewAllLabel}
            </Link>
          </div>
        </div>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.map((product) => (
            <div key={product.id} style={{ scrollSnapAlign: 'start' }}>
              <CarouselCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
