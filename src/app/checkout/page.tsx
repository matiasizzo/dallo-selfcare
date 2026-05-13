'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCart } from '@/store/cart'
import ShippingForm from '@/components/ShippingForm'
import PaymentForm from '@/components/PaymentForm'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export interface ShippingDetails {
  name: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
}

export default function CheckoutPage() {
  const { items } = useCart()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [shipping, setShipping] = useState<ShippingDetails | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleShippingConfirmed(details: ShippingDetails) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shippingDetails: details }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Error del servidor')
      setShipping(details)
      setClientSecret(data.clientSecret)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  function handleEditShipping() {
    setClientSecret(null)
    setShipping(null)
  }

  if (!items.length) {
    return (
      <>
        <AnnouncementBar />
        <Navbar />
        <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
          <p className="font-cormorant text-3xl font-light text-cocoa-900">Tu carrito está vacío</p>
          <Link href="/productos" className="text-xs tracking-[0.2em] uppercase text-text-muted hover:text-cocoa-900 transition-colors">
            Ver productos
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="bg-white min-h-screen">
        {/* Step 1: shipping — no Elements wrapper needed */}
        {!clientSecret && (
          <ShippingForm
            onConfirmed={handleShippingConfirmed}
            loading={loading}
            error={error}
          />
        )}

        {/* Step 2: payment — wrapped in Elements */}
        {clientSecret && shipping && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'flat',
                variables: {
                  colorPrimary: '#1E1108',
                  colorBackground: '#ffffff',
                  colorText: '#1C1C1C',
                  colorDanger: '#dc2626',
                  fontFamily: 'Inter, sans-serif',
                  borderRadius: '8px',
                  fontSizeBase: '13px',
                },
                rules: {
                  '.Input': { border: '1px solid #E8E0D5', padding: '12px 16px', backgroundColor: '#ffffff' },
                  '.Input:focus': { border: '1px solid #1E1108', boxShadow: 'none' },
                  '.Label': { fontSize: '11px', letterSpacing: '0.05em', color: '#7A736C', marginBottom: '6px' },
                  '.Tab': { border: '1px solid #E8E0D5', borderRadius: '8px' },
                  '.Tab--selected': { border: '1px solid #1E1108' },
                },
              },
            }}
          >
            <PaymentForm
              clientSecret={clientSecret}
              shipping={shipping}
              onEditShipping={handleEditShipping}
            />
          </Elements>
        )}
      </main>
    </>
  )
}
