import { redirect } from 'next/navigation'
import Link from 'next/link'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export const metadata = {
  title: "Mis pedidos — Dall'Ó Selfcare",
}

export default async function OrdersPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/cuenta/login')

  // TODO: query orders table when Stripe is connected
  const orders: unknown[] = []

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen bg-sand-200">
        <div className="max-w-screen-xl mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-12">
            <Link
              href="/cuenta"
              className="text-xs tracking-[0.15em] uppercase font-sans text-text-muted hover:text-cocoa-900 transition-colors"
            >
              ← Mi cuenta
            </Link>
          </div>

          <h1
            className="font-cormorant text-5xl font-light text-cocoa-900 mb-10"
          >
            Mis pedidos
          </h1>

          {orders.length === 0 ? (
            <div className="border border-sand-300 bg-sand-100 p-12 text-center max-w-md">
              <p className="text-sm text-text-muted font-sans mb-6">
                Aún no has realizado ningún pedido.
              </p>
              <Link
                href="/productos"
                className="inline-block border border-cocoa-900 text-cocoa-900 text-xs tracking-[0.2em] uppercase px-8 py-3 font-sans hover:bg-cocoa-900 hover:text-sand-100 transition-colors"
              >
                Ver productos
              </Link>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  )
}
