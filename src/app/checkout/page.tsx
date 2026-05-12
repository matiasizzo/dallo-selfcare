'use client'

import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCart } from '@/store/cart'
import CheckoutForm from '@/components/CheckoutForm'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const { items, totalCents } = useCart()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const total = totalCents()

  useEffect(() => {
    if (!items.length) return

    // We create the PaymentIntent after shipping details are collected,
    // but we need a placeholder here. We'll create it on demand in the form.
    // For now, create a preliminary intent with cart total.
    fetch('/api/checkout/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items,
        shippingDetails: {
          name: 'Pendiente',
          email: 'pendiente@dallo.com',
          address: 'Pendiente',
          city: 'Pendiente',
          postalCode: '00000',
          country: 'ES',
        },
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.clientSecret) setClientSecret(d.clientSecret)
        else setError('Error al inicializar el pago')
      })
      .catch(() => setError('Error de conexión'))
  }, [items])

  if (!items.length) {
    return (
      <>
        <AnnouncementBar />
        <Navbar />
        <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
          <p className="font-cormorant text-3xl font-light text-cocoa-900">Tu carrito está vacío</p>
          <Link
            href="/productos"
            className="text-xs tracking-[0.2em] uppercase text-text-muted hover:text-cocoa-900 transition-colors"
          >
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
      <main className="bg-white">
        {error && (
          <div className="text-center py-10">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        {!clientSecret && !error && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-sand-400 border-t-cocoa-900 rounded-full animate-spin" />
          </div>
        )}
        {clientSecret && (
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
                  spacingUnit: '4px',
                  borderRadius: '0px',
                  fontSizeBase: '13px',
                },
                rules: {
                  '.Input': {
                    border: '1px solid #D6CBBC',
                    padding: '12px 16px',
                  },
                  '.Input:focus': {
                    border: '1px solid #1E1108',
                    boxShadow: 'none',
                  },
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
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        )}
      </main>
    </>
  )
}
