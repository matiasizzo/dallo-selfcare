'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCart } from '@/store/cart'
import CheckoutForm from '@/components/CheckoutForm'
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
  const [loadingIntent, setLoadingIntent] = useState(false)

  async function handleShippingConfirmed(details: ShippingDetails) {
    setLoadingIntent(true)
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
      setLoadingIntent(false)
    }
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
        {!clientSecret ? (
          <CheckoutForm
            onShippingConfirmed={handleShippingConfirmed}
            loading={loadingIntent}
            error={error}
          />
        ) : (
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
                  borderRadius: '0px',
                  fontSizeBase: '13px',
                },
                rules: {
                  '.Input': { border: '1px solid #D6CBBC', padding: '12px 16px' },
                  '.Input:focus': { border: '1px solid #1E1108', boxShadow: 'none' },
                  '.Label': {
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#7A736C',
                    marginBottom: '4px',
                  },
                },
              },
            }}
          >
            <CheckoutForm
              clientSecret={clientSecret}
              shipping={shipping!}
              onShippingConfirmed={handleShippingConfirmed}
              loading={loadingIntent}
              error={error}
            />
          </Elements>
        )}
      </main>
    </>
  )
}
