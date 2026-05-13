'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '@/store/cart'
import { formatPrice } from '@/lib/products'
import type { ShippingDetails } from '@/app/checkout/page'

interface Props {
  clientSecret: string
  shipping: ShippingDetails
  onEditShipping: () => void
}

export default function PaymentForm({ clientSecret, shipping, onEditShipping }: Props) {
  const stripe = useStripe()
  const elements = useElements()
  const { items, totalCents } = useCart()
  const [error, setError] = useState<string | null>(null)
  const [paying, setPaying] = useState(false)
  const total = totalCents()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setPaying(true)
    setError(null)

    const { error: submitError } = await elements.submit()
    if (submitError) { setError(submitError.message ?? 'Error'); setPaying(false); return }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        payment_method_data: {
          billing_details: {
            name: shipping.name,
            email: shipping.email,
            phone: shipping.phone || undefined,
            address: { line1: shipping.address, city: shipping.city, postal_code: shipping.postalCode, country: shipping.country, state: '' },
          },
        },
      },
    })

    if (confirmError) { setError(confirmError.message ?? 'Error al confirmar el pago'); setPaying(false) }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col lg:flex-row">

      {/* LEFT: payment form */}
      <div className="flex-1 px-6 py-10 lg:px-14 lg:py-16 lg:max-w-2xl">
        <Link href="/" className="block mb-10">
          <Image
            src="https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/logo-nova-dallo-black.svg"
            alt="Dall'Ó Selfcare" width={100} height={34} className="h-8 w-auto"
          />
        </Link>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8 text-[10px] tracking-[0.2em] uppercase">
          <button onClick={onEditShipping} className="text-text-muted hover:text-cocoa-900 transition-colors">Envío</button>
          <span className="text-sand-400">›</span>
          <span className="text-cocoa-900 font-medium">Pago</span>
        </div>

        {/* Shipping summary */}
        <div className="border border-sand-300 rounded-lg divide-y divide-sand-300 mb-8 text-sm">
          <div className="flex justify-between px-4 py-3 text-text-muted">
            <span>Contacto</span>
            <span className="text-cocoa-900">{shipping.email}</span>
          </div>
          <div className="flex justify-between px-4 py-3 text-text-muted">
            <span>Envía a</span>
            <span className="text-cocoa-900 text-right">{shipping.address}, {shipping.city} {shipping.postalCode}</span>
          </div>
          <div className="flex justify-between px-4 py-3 text-text-muted">
            <span>Método</span>
            <span className="text-cocoa-900">Estándar · Calculado al pagar</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="font-cormorant text-2xl font-light text-cocoa-900 mb-2">Pago</h2>
          <p className="text-xs text-text-muted -mt-3">Todas las transacciones son seguras y están encriptadas.</p>

          <PaymentElement options={{ layout: 'tabs', fields: { billingDetails: 'never' } }} />

          {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">{error}</p>}

          <button
            type="submit"
            disabled={!stripe || !elements || paying}
            className="w-full rounded-full bg-cocoa-900 text-white text-xs tracking-[0.2em] uppercase py-4 hover:bg-cocoa-800 transition-colors disabled:opacity-50"
          >
            {paying ? 'Procesando...' : `Pagar ${formatPrice(total)}`}
          </button>

          <p className="text-[10px] text-text-muted text-center">Pago seguro gestionado por Stripe</p>
        </form>
      </div>

      {/* RIGHT: order summary */}
      <div className="lg:w-[420px] bg-sand-100 border-t lg:border-t-0 lg:border-l border-sand-300 px-6 py-10 lg:px-10 lg:py-16">
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.variantId} className="flex gap-4 items-start">
              <div className="relative w-16 h-16 flex-shrink-0 bg-sand-200 overflow-hidden rounded-sm">
                {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />}
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cocoa-900 text-white text-[9px] flex items-center justify-center leading-none">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 flex justify-between items-start">
                <div>
                  <p className="text-sm text-cocoa-900">{item.name}</p>
                  {item.variantName && item.variantName !== 'Default' && (
                    <p className="text-xs text-text-muted">{item.variantName}</p>
                  )}
                </div>
                <p className="text-sm text-cocoa-900 ml-4">{formatPrice(item.priceCents * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-sand-300 space-y-3">
          <div className="flex justify-between text-sm text-text-muted">
            <span>Subtotal</span><span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-sm text-text-muted">
            <span>Envío</span><span>Calculado al pagar</span>
          </div>
          <div className="flex justify-between text-base text-cocoa-900 pt-3 border-t border-sand-300 font-medium">
            <span>Total</span>
            <div className="text-right">
              <span className="text-xs text-text-muted mr-1">EUR</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
