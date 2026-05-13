'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type Product, formatPrice, getDefaultVariant } from '@/lib/products'

function ProductCard({ product }: { product: Product }) {
  const category = product.categories
  const variant = getDefaultVariant(product)

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group flex flex-col bg-bg-card hover:bg-paper transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden flex items-center justify-center">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:-translate-y-[6px] group-hover:-rotate-1"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-bg-card flex items-center justify-center">
            <span className="text-ink-mute text-xs">Sin imagen</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-1 px-7 pt-6 pb-[30px] border-t border-line-soft">
        {category && (
          <p className="text-[10px] tracking-[0.28em] uppercase text-ink-mute mb-2">{category.name}</p>
        )}
        <h3 className="font-cormorant font-[400] text-[22px] leading-[1.15] text-ink tracking-[0.005em] m-0">
          {product.name}
        </h3>
        {product.tagline && (
          <p className="font-cormorant font-[400] text-[13px] italic text-ink-soft leading-[1.4] mt-1 mb-[14px]">
            {product.tagline}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-[6px]">
          {variant && (
            <span className="text-[14px] text-ink">{formatPrice(variant.price_cents)}</span>
          )}
          <span className="text-[12px] tracking-[0.12em] uppercase text-ink border-b border-ink pb-px transition-[padding] duration-300 group-hover:pr-1">
            Añadir →
          </span>
        </div>
      </div>
    </Link>
  )
}

interface ProductGridProps {
  products: Product[]
  title?: string
  eyebrow?: string
  showViewAll?: boolean
  anchor?: string
}

export default function ProductGrid({
  products,
  title = 'Todos los productos',
  eyebrow,
  showViewAll = true,
  anchor,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <section className="w-full py-24 px-[6vw]">
        <div className="max-w-[1600px] mx-auto text-center">
          <p className="text-ink-mute text-sm">No hay productos disponibles.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-[110px] px-[6vw]" id={anchor}>
      <div className="max-w-[1600px] mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between gap-10 mb-14 pb-6 border-b border-line">
          <div>
            {eyebrow && (
              <p className="text-[11px] tracking-[0.3em] uppercase text-ink-mute mb-3">{eyebrow}</p>
            )}
            <h2
              className="font-cormorant font-light leading-[1] tracking-[-0.01em] text-ink m-0"
              style={{ fontSize: 'clamp(34px, 4.2vw, 56px)' }}
              dangerouslySetInnerHTML={{ __html: title.replace(/<em>/g, '<em style="font-style:italic;color:#6b3722">') }}
            />
          </div>
          {showViewAll && (
            <div className="text-[13px] text-ink-soft text-right hidden md:block">
              {products.length} fórmulas activas. Cada unidad se elabora en el momento de tu pedido.
              <br />
              <Link href="/productos" className="text-ink border-b border-ink pb-px whitespace-nowrap hover:text-accent transition-colors">
                Ver todos los productos →
              </Link>
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
