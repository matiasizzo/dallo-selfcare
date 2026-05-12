'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/store/cart'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-12 h-12 rounded-full bg-sand-200 flex items-center justify-center mx-auto mb-8">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cocoa-900">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="font-cormorant text-4xl font-light text-cocoa-900 mb-4">
            ¡Pedido confirmado!
          </h1>
          <p className="text-sm text-text-muted leading-relaxed mb-10">
            Gracias por tu compra. Recibirás un email de confirmación en breve con los detalles de tu pedido.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/productos"
              className="w-full bg-cocoa-900 text-sand-100 text-xs tracking-[0.2em] uppercase py-4 hover:bg-cocoa-800 transition-colors text-center block"
            >
              Seguir comprando
            </Link>
            <Link
              href="/cuenta/pedidos"
              className="w-full border border-sand-400 text-xs tracking-[0.2em] uppercase py-4 hover:border-cocoa-900 transition-colors text-center block text-text"
            >
              Ver mis pedidos
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
