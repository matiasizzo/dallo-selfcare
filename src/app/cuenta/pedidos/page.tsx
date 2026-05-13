import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { createClient } from '@supabase/supabase-js'
import { formatPrice } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Mis pedidos',
}

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type OrderItem = {
  name: string
  variantName?: string
  quantity: number
  priceCents: number
}

type Order = {
  id: string
  stripe_payment_intent_id: string
  status: string
  total_cents: number
  items: OrderItem[]
  shipping_name: string
  shipping_address: string
  shipping_city: string
  shipping_postal_code: string
  shipping_country: string
  created_at: string
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  paid:      { label: 'Pagado',    color: 'text-green-700 bg-green-50 border-green-200' },
  shipped:   { label: 'Enviado',   color: 'text-blue-700 bg-blue-50 border-blue-200' },
  delivered: { label: 'Entregado', color: 'text-cocoa-900 bg-sand-100 border-sand-300' },
  cancelled: { label: 'Cancelado', color: 'text-red-700 bg-red-50 border-red-200' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function orderRef(piId: string) {
  return piId.replace('pi_', '').slice(-8).toUpperCase()
}

export default async function OrdersPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/cuenta/login')

  const { data: orders } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('shipping_email', user.email)
    .order('created_at', { ascending: false })

  const list = (orders ?? []) as Order[]

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen bg-cream">
        <div className="max-w-screen-xl mx-auto px-8 pt-20 pb-6 border-b border-sand-300">
          <Link href="/cuenta" className="text-[10px] tracking-[0.2em] uppercase text-text-muted hover:text-cocoa-900 transition-colors">
            ← Mi cuenta
          </Link>
          <h1 className="font-cormorant text-6xl font-light text-cocoa-900 mt-4 mb-2">
            Mis pedidos
          </h1>
          <p className="text-xs tracking-[0.15em] uppercase text-text-muted">
            {list.length} {list.length === 1 ? 'pedido' : 'pedidos'}
          </p>
        </div>

        <div className="max-w-screen-xl mx-auto px-8 py-16">
          {list.length === 0 ? (
            <div className="max-w-md border border-sand-300 p-12 text-center">
              <p className="font-cormorant text-2xl font-light text-cocoa-900 mb-3">
                Sin pedidos aún
              </p>
              <p className="text-xs text-text-muted mb-8 leading-relaxed">
                Cuando realices tu primera compra aparecerá aquí.
              </p>
              <Link
                href="/productos"
                className="inline-block border border-cocoa-900 text-cocoa-900 text-[10px] tracking-[0.2em] uppercase px-8 py-3 hover:bg-cocoa-900 hover:text-white transition-colors"
              >
                Ver productos
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {list.map((order) => {
                const status = STATUS_LABELS[order.status] ?? STATUS_LABELS.paid
                return (
                  <div key={order.id} className="border border-sand-300 overflow-hidden">
                    {/* Order header */}
                    <div className="bg-sand-100 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-sand-300">
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-[9px] tracking-[0.2em] uppercase text-text-muted mb-0.5">Referencia</p>
                          <p className="text-xs font-medium text-cocoa-900 font-mono">#{orderRef(order.stripe_payment_intent_id)}</p>
                        </div>
                        <div>
                          <p className="text-[9px] tracking-[0.2em] uppercase text-text-muted mb-0.5">Fecha</p>
                          <p className="text-xs text-cocoa-900">{formatDate(order.created_at)}</p>
                        </div>
                        <div>
                          <p className="text-[9px] tracking-[0.2em] uppercase text-text-muted mb-0.5">Total</p>
                          <p className="text-xs font-medium text-cocoa-900">{formatPrice(order.total_cents)}</p>
                        </div>
                      </div>
                      <span className={`text-[9px] tracking-[0.15em] uppercase px-3 py-1 border ${status.color}`}>
                        {status.label}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="px-6 py-5 divide-y divide-sand-200">
                      {(order.items ?? []).map((item, i) => (
                        <div key={i} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                          <div>
                            <p className="text-sm text-cocoa-900">{item.name}</p>
                            {item.variantName && item.variantName !== 'Default' && (
                              <p className="text-xs text-text-muted mt-0.5">{item.variantName}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-text-muted">× {item.quantity}</p>
                            <p className="text-xs text-cocoa-900 mt-0.5">{formatPrice(item.priceCents * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping */}
                    <div className="px-6 py-4 bg-sand-50 border-t border-sand-200">
                      <p className="text-[9px] tracking-[0.2em] uppercase text-text-muted mb-1">Dirección de envío</p>
                      <p className="text-xs text-text-muted">
                        {order.shipping_name} — {order.shipping_address}, {order.shipping_city} {order.shipping_postal_code}, {order.shipping_country}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
