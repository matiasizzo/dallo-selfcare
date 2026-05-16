'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { useCart } from '@/store/cart'
import { LINE_COLORS, formatPrice } from '@/lib/products'
import type { Product, ProductVariant } from '@/lib/supabase'

interface Props {
  product: Product
  defaultVariant: ProductVariant
}

export default function ProductActions({ product, defaultVariant }: Props) {
  const activeVariants = (product.product_variants ?? []).filter((v) => v.active)
  const [selected, setSelected] = useState<ProductVariant>(defaultVariant)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const lineColor = LINE_COLORS[product.categories?.slug ?? ''] ?? '#C9A96E'
  const outOfStock = selected.stock_quantity === 0

  function handleAdd() {
    addItem(
      {
        productId: product.id,
        variantId: selected.id,
        name: product.name,
        variantName: selected.name,
        priceCents: selected.price_cents,
        imageUrl: product.image_url,
        lineColor,
      },
      qty
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div>
      {/* Variant selector — rounded pills */}
      {activeVariants.length > 1 && (
        <div className="mb-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-text-muted font-sans mb-3">Formato</p>
          <div className="flex flex-wrap gap-2">
            {activeVariants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelected(v)}
                className={`rounded-full border px-5 py-2 text-xs font-sans transition-all duration-200 active:scale-[0.96] ${
                  selected.id === v.id
                    ? 'border-cocoa-900 bg-cocoa-900 text-sand-100'
                    : 'border-sand-400 text-text hover:border-cocoa-900'
                }`}
              >
                {v.name}
                <span className="ml-2 text-[11px] opacity-70">{formatPrice(v.price_cents)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity + add to cart */}
      <div className="flex gap-3 items-stretch">
        <div className="flex items-center border border-sand-400 transition-colors duration-200 hover:border-cocoa-900">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-3 text-text hover:text-cocoa-900 transition-colors duration-200 active:scale-[0.85]"
            aria-label="Reducir cantidad"
          >
            <Minus size={14} strokeWidth={1.5} />
          </button>
          <span className="px-4 text-sm font-sans text-text min-w-[2rem] text-center">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-3 text-text hover:text-cocoa-900 transition-colors duration-200 active:scale-[0.85]"
            aria-label="Aumentar cantidad"
          >
            <Plus size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Main CTA with nested-arrow icon */}
        <button
          onClick={handleAdd}
          disabled={outOfStock}
          className="group flex-1 flex items-center justify-center gap-2 bg-cocoa-900 text-sand-100 text-xs tracking-[0.2em] uppercase py-3 px-5 font-sans hover:bg-cocoa-800 transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{outOfStock ? 'Agotado' : added ? '✓ Añadido' : 'Agregar'}</span>
          {!outOfStock && !added && (
            <span className="w-6 h-6 rounded-full bg-[rgba(246,238,230,0.12)] group-hover:bg-[rgba(246,238,230,0.2)] flex items-center justify-center transition-colors duration-200">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-[1px] transition-transform duration-150">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
