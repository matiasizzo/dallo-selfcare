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
          <motion.div
            className="fixed inset-0 bg-cocoa-900/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-cream z-50 flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-sand-300">
              <div className="flex items-center gap-2">
                <span className="font-cormorant text-xl font-light text-cocoa-900">
                  Tu carrito
                </span>
                {totalItems() > 0 && (
                  <span className="text-xs text-text-muted">({totalItems()})</span>
                )}
              </div>
              <button onClick={closeCart} className="text-text-muted hover:text-cocoa-900 transition-colors" aria-label="Cerrar carrito">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
                  <ShoppingBag size={44} strokeWidth={1} className="text-sand-400" />
                  <div>
                    <p className="font-cormorant text-2xl font-light text-cocoa-900 mb-1">Tu carrito está vacío</p>
                    <p className="text-xs text-text-muted">¿Tienes una cuenta? <Link href="/cuenta/login" onClick={closeCart} className="underline underline-offset-2 hover:text-cocoa-900">Inicia sesión</Link> para pagar más rápido.</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="rounded-full border border-cocoa-900 text-cocoa-900 text-xs tracking-[0.15em] uppercase px-8 py-3 hover:bg-cocoa-900 hover:text-white transition-colors"
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.variantId} className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 bg-sand-200 overflow-hidden rounded-sm">
                        {item.imageUrl ? (
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full" />
                        )}
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cocoa-900 text-white text-[9px] flex items-center justify-center leading-none">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-xs tracking-wide uppercase text-cocoa-900 leading-tight pr-2">{item.name}</p>
                          <button onClick={() => removeItem(item.variantId)} className="text-text-muted hover:text-cocoa-900 transition-colors flex-shrink-0" aria-label="Eliminar">
                            <X size={14} />
                          </button>
                        </div>
                        {item.variantName && item.variantName !== 'Default' && (
                          <p className="text-xs text-text-muted mb-3">{item.variantName}</p>
                        )}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-sand-400 rounded-full overflow-hidden">
                            <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="px-3 py-1.5 text-text-muted hover:text-cocoa-900 transition-colors" aria-label="Reducir">
                              <Minus size={11} />
                            </button>
                            <span className="px-2 text-xs text-cocoa-900 min-w-[1.5rem] text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="px-3 py-1.5 text-text-muted hover:text-cocoa-900 transition-colors" aria-label="Aumentar">
                              <Plus size={11} />
                            </button>
                          </div>
                          <p className="text-sm text-cocoa-900">{formatPrice(item.priceCents * item.quantity)}</p>
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
                  <span className="text-xs text-text-muted uppercase tracking-[0.15em]">Subtotal</span>
                  <span className="text-base text-cocoa-900">{formatPrice(totalCents())}</span>
                </div>
                <p className="text-[10px] text-text-muted">Gastos de envío calculados al finalizar la compra</p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full bg-cocoa-900 text-white text-xs tracking-[0.2em] uppercase text-center py-4 rounded-full hover:bg-cocoa-800 transition-colors"
                >
                  Finalizar compra
                </Link>
                <button
                  onClick={closeCart}
                  className="block w-full text-center text-xs text-text-muted hover:text-cocoa-900 transition-colors underline underline-offset-2"
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
