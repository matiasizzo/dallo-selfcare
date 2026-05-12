'use client'

import { useState } from 'react'
import { useCart } from '@/store/cart'
import type { Product, ProductVariant } from '@/lib/supabase'
import { LINE_COLORS } from '@/lib/products'

interface Props {
  product: Product
  selectedVariant: ProductVariant
}

export default function AddToCartButton({ product, selectedVariant }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const lineColor = LINE_COLORS[product.categories?.slug ?? ''] ?? '#C9A96E'

  function handleAdd() {
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      variantName: selectedVariant.name,
      priceCents: selectedVariant.price_cents,
      imageUrl: product.image_url,
      lineColor,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full border border-cocoa-900 bg-cocoa-900 text-sand-100 text-xs tracking-[0.2em] uppercase py-4 font-sans hover:bg-cocoa-800 transition-colors disabled:opacity-50"
      disabled={selectedVariant.stock_quantity === 0}
    >
      {selectedVariant.stock_quantity === 0
        ? 'Agotado'
        : added
        ? '✓ Añadido'
        : 'Añadir al carrito'}
    </button>
  )
}
