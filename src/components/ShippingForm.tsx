'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/store/cart'
import { formatPrice } from '@/lib/products'
import type { ShippingDetails } from '@/app/checkout/page'

interface Props {
  onConfirmed: (details: ShippingDetails) => void
  loading: boolean
  error: string | null
}

export default function ShippingForm({ onConfirmed, loading, error }: Props) {
  const { items, totalCents } = useCart()
  const total = totalCents()

  const [form, setForm] = useState<ShippingDetails>({
    name: '', email: '', phone: '', address: '', city: '', postalCode: '', country: 'ES',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onConfirmed(form)
  }

  const inputClass = 'w-full border border-sand-300 bg-white rounded-lg px-4 py-3 text-sm text-cocoa-900 placeholder:text-text-muted focus:outline-none focus:border-cocoa-900 transition-colors'

  return (
    <div className="min-h-screen bg-cream flex flex-col lg:flex-row">

      {/* LEFT: form */}
      <div className="flex-1 px-6 py-10 lg:px-14 lg:py-16 lg:max-w-2xl">
        {/* Logo */}
        <Link href="/" className="block mb-10">
          <Image
            src="https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/logo-nova-dallo-black.svg"
            alt="Dall'Ó Selfcare" width={100} height={34} className="h-8 w-auto"
          />
        </Link>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8 text-[10px] tracking-[0.2em] uppercase">
          <span className="text-cocoa-900 font-medium">Envío</span>
          <span className="text-sand-400">›</span>
          <span className="text-text-muted">Pago</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="font-cormorant text-2xl font-light text-cocoa-900 mb-2">Contacto</h2>

          <input name="email" type="email" required value={form.email} onChange={handleChange}
            placeholder="Correo electrónico" className={inputClass} />

          <h2 className="font-cormorant text-2xl font-light text-cocoa-900 pt-4 mb-2">Entrega</h2>

          <select name="country" required value={form.country} onChange={handleChange} className={inputClass}>
            <option value="ES">España</option>
            <option value="PT">Portugal</option>
            <option value="FR">Francia</option>
            <option value="DE">Alemania</option>
            <option value="IT">Italia</option>
            <option value="GB">Reino Unido</option>
            <option value="US">Estados Unidos</option>
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input name="name" required value={form.name} onChange={handleChange}
              placeholder="Nombre" className={inputClass} />
            <input name="phone" type="tel" value={form.phone} onChange={handleChange}
              placeholder="Apellidos" className={inputClass} />
          </div>

          <input name="address" required value={form.address} onChange={handleChange}
            placeholder="Dirección" className={inputClass} />

          <div className="grid grid-cols-2 gap-3">
            <input name="postalCode" required value={form.postalCode} onChange={handleChange}
              placeholder="Código postal" className={inputClass} />
            <input name="city" required value={form.city} onChange={handleChange}
              placeholder="Ciudad" className={inputClass} />
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-cocoa-900 text-white text-xs tracking-[0.2em] uppercase py-4 hover:bg-cocoa-800 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Procesando...' : 'Continuar al pago'}
          </button>
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
