'use client'

import { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '@/store/cart'
import { formatPrice } from '@/lib/products'
import type { ShippingDetails } from '@/app/checkout/page'

interface Props {
  clientSecret?: string
  shipping?: ShippingDetails
  onShippingConfirmed: (details: ShippingDetails) => void
  loading: boolean
  error: string | null
}

export default function CheckoutForm({ clientSecret, shipping, onShippingConfirmed, loading, error }: Props) {
  const stripe = useStripe()
  const elements = useElements()
  const { items, totalCents } = useCart()
  const [payError, setPayError] = useState<string | null>(null)
  const [paying, setPaying] = useState(false)

  const [form, setForm] = useState<ShippingDetails>({
    name: '', email: '', phone: '', address: '', city: '', postalCode: '', country: 'ES',
  })

  const total = totalCents()
  const step = clientSecret ? 'payment' : 'shipping'

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleShippingSubmit(e: React.FormEvent) {
    e.preventDefault()
    onShippingConfirmed(form)
  }

  async function handlePaymentSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setPaying(true)
    setPayError(null)

    const { error: submitError } = await elements.submit()
    if (submitError) { setPayError(submitError.message ?? 'Error'); setPaying(false); return }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret!,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        payment_method_data: {
          billing_details: {
            name: shipping!.name,
            email: shipping!.email,
            phone: shipping!.phone || undefined,
            address: {
              line1: shipping!.address,
              city: shipping!.city,
              postal_code: shipping!.postalCode,
              country: shipping!.country,
            },
          },
        },
      },
    })

    if (confirmError) { setPayError(confirmError.message ?? 'Error al confirmar'); setPaying(false) }
  }

  const inputClass = 'w-full border border-sand-400 bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-cocoa-900 transition-colors'
  const labelClass = 'block text-[10px] tracking-[0.2em] uppercase text-text-muted mb-1'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

      {/* LEFT: Order summary */}
      <div className="bg-sand-100 px-8 py-12 lg:px-14 lg:py-20 border-b lg:border-b-0 lg:border-r border-sand-300 order-2 lg:order-1">
        <h2 className="font-cormorant text-3xl font-light text-cocoa-900 mb-8">Tu pedido</h2>
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.variantId} className="flex gap-4">
              <div className="relative w-16 h-16 bg-sand-200 flex-shrink-0 overflow-hidden">
                {item.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                )}
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cocoa-900 text-sand-100 text-[10px] flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 flex justify-between items-start">
                <div>
                  <p className="text-sm text-text">{item.name}</p>
                  <p className="text-xs text-text-muted">{item.variantName}</p>
                </div>
                <p className="text-sm text-text">{formatPrice(item.priceCents * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-sand-300 space-y-2">
          <div className="flex justify-between text-sm text-text-muted">
            <span>Subtotal</span><span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-sm text-text-muted">
            <span>Envío</span><span>Calculado al pagar</span>
          </div>
          <div className="flex justify-between text-base text-cocoa-900 pt-2 border-t border-sand-300">
            <span>Total</span><span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Form */}
      <div className="bg-white px-8 py-12 lg:px-14 lg:py-20 order-1 lg:order-2">

        {/* Steps */}
        <div className="flex items-center gap-3 mb-10">
          <span className={`text-[10px] tracking-[0.2em] uppercase ${step === 'shipping' ? 'text-cocoa-900' : 'text-text-muted'}`}>
            1. Envío
          </span>
          <span className="text-sand-400 text-xs">›</span>
          <span className={`text-[10px] tracking-[0.2em] uppercase ${step === 'payment' ? 'text-cocoa-900' : 'text-text-muted'}`}>
            2. Pago
          </span>
        </div>

        {/* Shipping form */}
        {step === 'shipping' && (
          <form onSubmit={handleShippingSubmit} className="space-y-5">
            <h2 className="font-cormorant text-3xl font-light text-cocoa-900 mb-6">Datos de envío</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nombre completo *</label>
                <input name="name" required value={form.name} onChange={handleChange} placeholder="María García" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="maria@email.com" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Teléfono</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+34 600 000 000" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Dirección *</label>
              <input name="address" required value={form.address} onChange={handleChange} placeholder="Calle Mayor 1, 2ºA" className={inputClass} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Ciudad *</label>
                <input name="city" required value={form.city} onChange={handleChange} placeholder="Madrid" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Código postal *</label>
                <input name="postalCode" required value={form.postalCode} onChange={handleChange} placeholder="28001" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>País *</label>
              <select name="country" required value={form.country} onChange={handleChange} className={inputClass}>
                <option value="ES">España</option>
                <option value="PT">Portugal</option>
                <option value="FR">Francia</option>
                <option value="DE">Alemania</option>
                <option value="IT">Italia</option>
                <option value="GB">Reino Unido</option>
                <option value="US">Estados Unidos</option>
              </select>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-3 border border-red-200">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cocoa-900 text-sand-100 text-xs tracking-[0.2em] uppercase py-4 hover:bg-cocoa-800 transition-colors disabled:opacity-50 mt-4"
            >
              {loading ? 'Procesando...' : 'Continuar al pago'}
            </button>
          </form>
        )}

        {/* Payment form */}
        {step === 'payment' && stripe && elements && (
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <h2 className="font-cormorant text-3xl font-light text-cocoa-900 mb-2">Pago</h2>
            <p className="text-xs text-text-muted mb-6">
              Enviando a {shipping!.name} · {shipping!.address}, {shipping!.city}
              <button type="button" onClick={() => onShippingConfirmed(shipping!)} className="ml-2 underline hover:text-cocoa-900">Editar</button>
            </p>

            <PaymentElement options={{ layout: 'tabs', fields: { billingDetails: 'never' } }} />

            {(payError || error) && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-3 border border-red-200">{payError ?? error}</p>
            )}

            <button
              type="submit"
              disabled={paying}
              className="w-full bg-cocoa-900 text-sand-100 text-xs tracking-[0.2em] uppercase py-4 hover:bg-cocoa-800 transition-colors disabled:opacity-50"
            >
              {paying ? 'Procesando...' : `Pagar ${formatPrice(total)}`}
            </button>

            <p className="text-[10px] text-text-muted text-center tracking-wide">
              Pago seguro con cifrado SSL · Gestionado por Stripe
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
