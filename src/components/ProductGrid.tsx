'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { type Product, formatPrice, getDefaultVariant, LINE_COLORS } from '@/lib/products'
import { useCart } from '@/store/cart'

function ProductCard({ product }: { product: Product }) {
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
    <Link href={`/productos/${product.slug}`} className="group block cursor-pointer">
      {/* Square image */}
      <div
        className="relative aspect-square overflow-hidden flex items-center justify-center transition-colors duration-300"
        style={{ background: 'var(--color-bg-gray, #ebe7e0)' }}
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain object-center w-[78%] transition-transform duration-500 group-hover:-translate-y-1"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full" />
        )}

        {/* Hover add button */}
        <button
          onClick={handleAdd}
          className="absolute bottom-4 left-4 right-4 bg-paper text-ink border border-line-soft rounded-full py-[11px] px-4 text-[12px] font-[500] tracking-[0.02em] flex items-center justify-center gap-2 opacity-0 translate-y-[10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[350ms] hover:bg-ink hover:text-bg hover:border-ink"
          aria-label={`Añadir ${product.name}`}
        >
          <Plus size={14} strokeWidth={1.5} />
          Añadir
        </button>
      </div>

      {/* Card body */}
      <div className="px-1 pt-4 pb-2 flex flex-col gap-[2px]">
        <h3 className="text-[14px] font-[500] tracking-[0.02em] text-ink m-0">{product.name}</h3>
        {variant && (
          <p className="text-[13px] text-ink-soft mt-[2px]">{formatPrice(variant.price_cents)}</p>
        )}
      </div>
    </Link>
  )
}

interface ProductGridProps {
  products: Product[]
  title?: string
  showViewAll?: boolean
  anchor?: string
}

export default function ProductGrid({
  products,
  title = 'Todos os Produtos',
  showViewAll = true,
  anchor,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <section className="w-full py-16 px-8">
        <div className="max-w-[1600px] mx-auto text-center">
          <p className="text-ink-mute text-sm">No hay productos disponibles.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-[70px] px-8" id={anchor}>
      <div className="max-w-[1600px] mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between gap-10 mb-8">
          <h2
            className="font-cormorant font-[400] text-ink m-0 tracking-[-0.005em]"
            style={{ fontSize: 'clamp(26px, 2.6vw, 34px)', lineHeight: 1.1 }}
          >
            {title}
          </h2>
          {showViewAll && (
            <Link
              href="/productos"
              className="text-[13px] text-ink border-b border-ink pb-[2px] whitespace-nowrap hover:text-brown hover:border-brown transition-colors"
            >
              Ver todo
            </Link>
          )}
        </div>

        {/* Grid: 4-col with 12px gaps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
