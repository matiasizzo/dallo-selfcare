import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Webhook signature invalid' }, { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object
    const meta = pi.metadata

    const items = JSON.parse(meta.items ?? '[]')
    const totalCents = pi.amount

    await supabaseAdmin.from('orders').insert({
      stripe_payment_intent_id: pi.id,
      status: 'paid',
      shipping_name: meta.shipping_name,
      shipping_email: meta.shipping_email,
      shipping_phone: meta.shipping_phone || null,
      shipping_address: meta.shipping_address,
      shipping_city: meta.shipping_city,
      shipping_postal_code: meta.shipping_postal_code,
      shipping_country: meta.shipping_country,
      items,
      subtotal_cents: totalCents,
      total_cents: totalCents,
    })
  }

  return NextResponse.json({ received: true })
}
