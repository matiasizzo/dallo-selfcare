'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus } from 'lucide-react'
import { useCart } from '@/store/cart'
import { formatPrice } from '@/lib/products'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalCents } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(43,32,23,0.35)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={closeCart}
          />

          <motion.aside
            className="fixed right-0 top-0 h-full z-50 flex flex-col bg-bg"
            style={{
              width: 'min(440px, 95vw)',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.12)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-line-soft">
              <h3 className="font-cormorant font-[400] text-[24px] text-ink m-0">
                Tu bolsa
              </h3>
              <button
                onClick={closeCart}
                className="text-ink-soft hover:text-ink transition-colors duration-200 active:scale-[0.88]"
                aria-label="Cerrar carrito"
              >
                <X size={20} strokeWidth={1.4} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-7 py-2">
              {items.length === 0 ? (
                <div className="text-center py-[80px]">
                  <h4 className="font-cormorant font-[400] text-[22px] text-ink m-0 mb-3">Tu bolsa está vacía</h4>
                  <p className="text-[13px] text-ink-soft m-0 mb-6">
                    ¿Tienes una cuenta?{' '}
                    <Link href="/cuenta/login" onClick={closeCart} className="underline underline-offset-2 hover:text-ink transition-colors duration-200">
                      Inicia sesión
                    </Link>{' '}
                    para pagar más rápido.
                  </p>
                  <button
                    onClick={closeCart}
                    className="inline-flex items-center justify-center px-8 py-3 text-[13px] border border-brown bg-brown text-bg rounded-full hover:bg-brown-deep hover:border-brown-deep transition-all duration-300 active:scale-[0.97]"
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                <ul className="list-none p-0 m-0">
                  {items.map((item) => (
                    <motion.li
                      key={item.variantId}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                      className="grid gap-4 py-4 border-b border-line-soft last:border-0"
                      style={{ gridTemplateColumns: '64px 1fr auto', alignItems: 'center' }}
                    >
                      {/* Product image */}
                      <div className="w-16 h-16 bg-bg-gray flex-shrink-0 overflow-hidden relative rounded-lg">
                        {item.imageUrl ? (
                          <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-1" />
                        ) : (
                          <div className="w-full h-full" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-[13px] font-[500] text-ink m-0 mb-[2px] truncate">{item.name}</p>
                        {item.variantName && item.variantName !== 'Default' && (
                          <p className="text-[11px] text-ink-mute m-0">{item.variantName}</p>
                        )}
                        <div className="flex items-center border border-line-soft rounded-full overflow-hidden mt-2 w-fit">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="px-3 py-1.5 text-ink-mute hover:text-ink transition-colors duration-200 active:scale-[0.85]"
                            aria-label="Reducir"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="px-2 text-xs text-ink min-w-[1.5rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="px-3 py-1.5 text-ink-mute hover:text-ink transition-colors duration-200 active:scale-[0.85]"
                            aria-label="Aumentar"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-[13px] text-ink m-0 mb-1">{formatPrice(item.priceCents * item.quantity)}</p>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-[11px] text-ink-mute underline underline-offset-2 hover:text-ink transition-colors duration-200"
                        >
                          Quitar
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-7 py-6 border-t border-line-soft space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-[13px] text-ink-soft">Subtotal</span>
                  <span className="font-cormorant text-[20px] font-[400] text-ink">{formatPrice(totalCents())}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center w-full py-[14px] text-[13px] font-[500] tracking-[0.02em] bg-brown text-bg border border-brown rounded-full hover:bg-brown-deep hover:border-brown-deep transition-all duration-300 active:scale-[0.97]"
                >
                  Tramitar pedido
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
