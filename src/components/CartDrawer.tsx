'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/store/cart'
import { formatPrice } from '@/lib/products'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalCents } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-cocoa-900/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-sand-50 z-50 flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-sand-300">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-cocoa-900" />
                <span
                  className="font-cormorant text-lg font-light text-cocoa-900"
                >
                  Carrito
                </span>
                {totalItems() > 0 && (
                  <span className="text-xs text-text-muted font-sans">({totalItems()})</span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="text-text-muted hover:text-cocoa-900 transition-colors"
                aria-label="Cerrar carrito"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={40} strokeWidth={1} className="text-sand-400" />
                  <p className="text-sm text-text-muted font-sans">Tu carrito está vacío</p>
                  <button
                    onClick={closeCart}
                    className="text-xs tracking-[0.15em] uppercase font-sans text-cocoa-900 underline underline-offset-4 hover:text-cocoa-600 transition-colors"
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.variantId} className="flex gap-4">
                      {/* Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 bg-sand-300 overflow-hidden">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full" />
                        )}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{ backgroundColor: item.lineColor }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-xs tracking-widest uppercase text-text font-sans leading-tight">
                            {item.name}
                          </p>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="text-text-muted hover:text-cocoa-900 transition-colors ml-2 flex-shrink-0"
                            aria-label="Eliminar"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        {item.variantName && (
                          <p className="text-xs text-text-muted font-sans mb-3">{item.variantName}</p>
                        )}
                        <div className="flex items-center justify-between">
                          {/* Quantity */}
                          <div className="flex items-center border border-sand-400">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="px-2 py-1 text-text-muted hover:text-cocoa-900 transition-colors"
                              aria-label="Reducir cantidad"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-3 text-xs font-sans text-text min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="px-2 py-1 text-text-muted hover:text-cocoa-900 transition-colors"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm font-sans text-cocoa-900">
                            {formatPrice(item.priceCents * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-sand-300 px-6 py-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs tracking-[0.15em] uppercase font-sans text-text-muted">
                    Subtotal
                  </span>
                  <span className="text-base font-sans text-cocoa-900">
                    {formatPrice(totalCents())}
                  </span>
                </div>
                <p className="text-[10px] text-text-muted font-sans">
                  Gastos de envío calculados al finalizar la compra
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full bg-cocoa-900 text-sand-100 text-xs tracking-[0.2em] uppercase text-center py-4 font-sans hover:bg-cocoa-800 transition-colors"
                >
                  Finalizar compra
                </Link>
                <button
                  onClick={closeCart}
                  className="block w-full text-center text-xs tracking-[0.15em] uppercase font-sans text-text-muted hover:text-cocoa-900 transition-colors"
                >
                  Seguir comprando
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
