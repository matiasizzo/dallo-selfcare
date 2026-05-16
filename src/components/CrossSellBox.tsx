'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/store/cart'
import { formatPrice } from '@/lib/products'
import type { Product, ProductVariant } from '@/lib/supabase'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

interface Props {
  currentProduct: Product
  crossSell: Product
  crossSellVariant: ProductVariant
  isSkin: boolean
}

export default function CrossSellBox({ currentProduct, crossSell, crossSellVariant, isSkin }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd(e?: React.MouseEvent) {
    e?.stopPropagation()
    addItem({
      variantId: crossSellVariant.id,
      productId: crossSell.id,
      name: crossSell.name,
      variantName: crossSellVariant.name,
      priceCents: crossSellVariant.price_cents,
      imageUrl: crossSell.image_url ?? null,
      lineColor: '#553b2e',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const crossSellLabel = isSkin ? 'Suplemento recomendado' : 'Cosmética recomendada'

  return (
    <div
      className="mt-10 overflow-hidden"
      style={{ background: '#1e1610' }}
    >
      {/* Header */}
      <div
        className="px-6 pt-6 pb-4 flex items-center gap-3"
        style={{ borderBottom: '1px solid rgba(179,157,126,0.15)' }}
      >
        <span
          className="text-[9px] tracking-[0.32em] uppercase"
          style={{ color: '#b29d7e' }}
        >
          ✦ Completa tu ritual{isSkin ? ' senolítico' : ''}
        </span>
      </div>

      {/* Cards row */}
      <div className="p-4 flex items-stretch gap-3">

        {/* ── Producto actual ── */}
        <div
          className="flex-1 flex flex-col gap-3 p-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(179,157,126,0.18)' }}
        >
          {/* Image */}
          <div
            className="relative w-full aspect-square overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            {currentProduct.image_url ? (
              <Image
                src={currentProduct.image_url}
                alt={currentProduct.name}
                fill
                className="object-contain p-3"
                sizes="150px"
              />
            ) : (
              <div className="w-full h-full" />
            )}
          </div>

          {/* Meta */}
          <div className="flex flex-col gap-1">
            <span
              className="text-[9px] tracking-[0.22em] uppercase"
              style={{ color: 'rgba(179,157,126,0.7)' }}
            >
              Este producto
            </span>
            <p
              className="font-cormorant font-[400] text-[15px] leading-tight m-0"
              style={{ color: '#f0e7dc' }}
            >
              {currentProduct.name}
            </p>
          </div>
        </div>

        {/* ── Separador + ── */}
        <div
          className="flex-shrink-0 flex items-center justify-center w-8"
          style={{ color: '#b29d7e' }}
        >
          <span className="text-[18px] font-[300] select-none">+</span>
        </div>

        {/* ── Producto complementario (clickable) ── */}
        <div
          className="flex-1 flex flex-col gap-3 p-4 group cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(179,157,126,0.28)',
            transition: 'border-color 0.2s cubic-bezier(0.23,1,0.32,1)',
          }}
          onClick={handleAdd}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(179,157,126,0.7)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(179,157,126,0.28)')}
        >
          {/* Image */}
          <div
            className="relative w-full aspect-square overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            {crossSell.image_url ? (
              <Image
                src={crossSell.image_url}
                alt={crossSell.name}
                fill
                className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="150px"
              />
            ) : (
              <div className="w-full h-full" />
            )}
          </div>

          {/* Meta */}
          <div className="flex flex-col gap-1 flex-1">
            <span
              className="text-[9px] tracking-[0.22em] uppercase"
              style={{ color: 'rgba(179,157,126,0.7)' }}
            >
              {crossSellLabel}
            </span>
            <p
              className="font-cormorant font-[400] text-[15px] leading-tight m-0 flex-1 transition-colors duration-200"
              style={{ color: '#f0e7dc' }}
            >
              {crossSell.name}
            </p>
            <p
              className="text-[12px] m-0"
              style={{ color: 'rgba(179,157,126,0.85)' }}
            >
              {formatPrice(crossSellVariant.price_cents)}
            </p>
          </div>

          {/* CTA */}
          <motion.button
            onClick={handleAdd}
            disabled={added}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-[11px] tracking-[0.1em] uppercase font-[500] transition-all duration-200 active:scale-[0.97]"
            style={{
              background: added ? 'rgba(179,157,126,0.25)' : 'rgba(179,157,126,0.15)',
              border: '1px solid rgba(179,157,126,0.35)',
              color: '#f0e7dc',
            }}
            whileTap={{ scale: 0.96 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="done"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.16, ease: EASE_OUT }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5 9-9"/>
                  </svg>
                  Añadido
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.16, ease: EASE_OUT }}
                >
                  Añadir al carrito
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(179,157,126,0.2)' }}
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Ver página del producto */}
          <Link
            href={`/productos/${crossSell.slug}`}
            onClick={e => e.stopPropagation()}
            className="block text-center text-[10px] tracking-[0.1em] uppercase transition-colors duration-200 pt-1"
            style={{ color: 'rgba(179,157,126,0.55)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(179,157,126,1)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(179,157,126,0.55)')}
          >
            Ver producto →
          </Link>
        </div>
      </div>
    </div>
  )
}
