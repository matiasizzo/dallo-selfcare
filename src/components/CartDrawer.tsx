'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus } from 'lucide-react'
import { useCart } from '@/store/cart'
import { formatPrice } from '@/lib/products'
import { getShippingCents, getDiscountCents, FREE_SHIPPING_THRESHOLD_CENTS } from '@/lib/shipping'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalCents, coupon, setCoupon } = useCart()
  const [couponInput, setCouponInput] = useState('')
  const [couponLoading, setCouponLoading] = useState(false)
  const [couponError, setCouponError] = useState<string | null>(null)

  const subtotal = totalCents()
  const shippingCents = getShippingCents(subtotal)
  const discountCents = coupon ? getDiscountCents(subtotal, coupon.discountPercent) : 0
  const total = subtotal + shippingCents - discountCents
  const toFreeShipping = FREE_SHIPPING_THRESHOLD_CENTS - subtotal

  async function handleApplyCoupon() {
    if (!couponInput.trim()) return
    setCouponLoading(true)
    setCouponError(null)
    try {
      const res = await fetch('/api/checkout/validate-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput.trim() }),
      })
      const data = await res.json()
      if (data.valid) {
        setCoupon({ code: data.code, discountPercent: data.discountPercent })
        setCouponInput('')
      } else {
        setCouponError(data.error ?? 'Código no válido')
      }
    } catch {
      setCouponError('Error al validar el código')
    } finally {
      setCouponLoading(false)
    }
  }

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
            style={{ width: 'min(440px, 95vw)', boxShadow: '-20px 0 60px rgba(0,0,0,0.12)' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-line-soft">
              <h3 className="font-cormorant font-[400] text-[24px] text-ink m-0">Tu bolsa</h3>
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

                {/* Free shipping progress */}
                {toFreeShipping > 0 && (
                  <p className="text-[11px] text-ink-soft text-center">
                    Añade{' '}
                    <span className="text-ink font-[500]">{formatPrice(toFreeShipping)}</span>
                    {' '}más para conseguir envío gratis
                  </p>
                )}

                {/* Coupon input */}
                {!coupon ? (
                  <div className="flex gap-2">
                    <input
                      value={couponInput}
                      onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(null) }}
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      placeholder="Código de descuento"
                      className="flex-1 border border-line-soft bg-transparent px-3 py-2 text-[12px] text-ink placeholder:text-ink-mute focus:outline-none focus:border-ink transition-colors rounded-lg"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !couponInput.trim()}
                      className="px-4 py-2 text-[11px] tracking-[0.08em] uppercase border border-line-soft rounded-lg text-ink hover:border-ink transition-colors disabled:opacity-40"
                    >
                      {couponLoading ? '...' : 'Aplicar'}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-[rgba(80,130,80,0.08)] border border-[rgba(80,130,80,0.25)] rounded-lg px-3 py-2">
                    <span className="text-[12px] text-[#3a7a3a] font-[500]">
                      {coupon.code} · -{coupon.discountPercent}%
                    </span>
                    <button
                      onClick={() => setCoupon(null)}
                      className="text-[11px] text-ink-mute underline hover:text-ink transition-colors"
                    >
                      Quitar
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-500 -mt-2">{couponError}</p>
                )}

                {/* Price breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[12px] text-ink-soft">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {coupon && (
                    <div className="flex justify-between text-[12px] text-[#3a7a3a]">
                      <span>Descuento ({coupon.discountPercent}%)</span>
                      <span>-{formatPrice(discountCents)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[12px] text-ink-soft">
                    <span>Envío</span>
                    <span>{shippingCents === 0 ? <span className="text-[#3a7a3a]">Gratis</span> : formatPrice(shippingCents)}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-line-soft">
                    <span className="text-[13px] text-ink-soft">Total</span>
                    <span className="font-cormorant text-[22px] font-[400] text-ink">{formatPrice(total)}</span>
                  </div>
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
