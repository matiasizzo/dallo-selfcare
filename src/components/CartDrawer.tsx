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
            style={{ background: 'rgba(44,33,24,0.4)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          <motion.aside
            className="fixed right-0 top-0 h-full z-50 flex flex-col"
            style={{
              width: 'min(440px, 95vw)',
              background: '#faf6ed',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.15)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-7 border-b border-line">
              <h3 className="font-cormorant font-light text-[28px] text-ink m-0">
                Tu bolsa
                {totalItems() > 0 && (
                  <span className="ml-2 text-[14px] text-ink-mute font-[400] font-sans">({totalItems()})</span>
                )}
              </h3>
              <button
                onClick={closeCart}
                className="text-[12px] tracking-[0.2em] uppercase text-ink-soft hover:text-ink transition-colors flex items-center gap-2"
                aria-label="Cerrar carrito"
              >
                Cerrar <X size={14} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-3">
              {items.length === 0 ? (
                <p className="font-cormorant text-[18px] italic text-ink-soft text-center py-[60px] leading-relaxed">
                  Tu bolsa está vacía.<br />Las fórmulas frescas te esperan.
                </p>
              ) : (
                <ul className="list-none p-0 m-0">
                  {items.map((item) => (
                    <li key={item.variantId} className="grid gap-4 py-[18px] border-b border-line-soft last:border-0"
                      style={{ gridTemplateColumns: '70px 1fr auto', alignItems: 'center' }}>
                      <div className="relative w-[70px] h-[70px] bg-bg-card flex-shrink-0 rounded-sm overflow-hidden">
                        {item.imageUrl ? (
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="font-cormorant text-[18px] text-ink leading-tight m-0 mb-1">{item.name}</p>
                        <p className="text-[11px] tracking-[0.18em] uppercase text-ink-mute">
                          {item.variantName && item.variantName !== 'Default' ? item.variantName : ''} ×{item.quantity}
                        </p>
                        <div className="flex items-center border border-line rounded-full overflow-hidden mt-3 w-fit">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="px-3 py-1.5 text-ink-mute hover:text-ink transition-colors"
                            aria-label="Reducir"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="px-2 text-xs text-ink min-w-[1.5rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="px-3 py-1.5 text-ink-mute hover:text-ink transition-colors"
                            aria-label="Aumentar"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-[14px] text-ink mb-1">{formatPrice(item.priceCents * item.quantity)}</p>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-[11px] text-ink-mute underline underline-offset-2 hover:text-ink transition-colors"
                        >
                          Quitar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-8 py-6 border-t border-line space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-ink-soft">Subtotal</span>
                  <span className="font-cormorant text-[22px] font-light text-ink">{formatPrice(totalCents())}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-[10px] w-full py-[14px] text-[13px] tracking-[0.12em] uppercase border border-ink bg-ink text-paper rounded-full hover:bg-accent-deep hover:border-accent-deep transition-all duration-300"
                >
                  Tramitar pedido
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <p className="text-[11px] text-ink-mute text-center tracking-[0.06em]">
                  Pago seguro · Envío fresco refrigerado · Tu fórmula firmada por el Dr. Dall&apos;Ó
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
