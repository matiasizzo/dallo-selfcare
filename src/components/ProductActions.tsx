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
      {/* Variant selector */}
      {activeVariants.length > 1 && (
        <div className="mb-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-text-muted font-sans mb-3">Formato</p>
          <div className="flex flex-wrap gap-2">
            {activeVariants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelected(v)}
                className={`border px-4 py-2.5 text-xs font-sans transition-all duration-200 ${
                  selected.id === v.id
                    ? 'border-cocoa-900 bg-cocoa-900 text-sand-100 shadow-md'
                    : 'border-sand-400 text-text hover:border-cocoa-900 hover:bg-sand-50'
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
            className="px-3 py-3 text-text hover:text-cocoa-900 transition-colors duration-200"
            aria-label="Reducir cantidad"
          >
            <Minus size={14} strokeWidth={1.5} />
          </button>
          <span className="px-4 text-sm font-sans text-text min-w-[2rem] text-center">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-3 text-text hover:text-cocoa-900 transition-colors duration-200"
            aria-label="Aumentar cantidad"
          >
            <Plus size={14} strokeWidth={1.5} />
          </button>
        </div>

        <button
          onClick={handleAdd}
          disabled={outOfStock}
          className="flex-1 bg-cocoa-900 text-sand-100 text-xs tracking-[0.2em] uppercase py-3 font-sans hover:bg-cocoa-800 transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {outOfStock ? 'Agotado' : added ? '✓ Añadido' : 'Agregar'}
        </button>
      </div>
    </div>
  )
}
