import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import type Stripe from 'stripe'

export const dynamic = 'force-dynamic'

// Disable Next.js body parsing so Stripe signature verification works
export const config = {
  api: {
    bodyParser: false,
  },
}

function getSupabaseServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) return null

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  })
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event: Stripe.Event

  if (webhookSecret && signature) {
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret)
    } catch (err) {
      console.error('[webhook/stripe] Signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
  } else {
    console.warn('[webhook/stripe] STRIPE_WEBHOOK_SECRET not set — skipping signature verification')
    try {
      event = JSON.parse(body) as Stripe.Event
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const { name, phone, service, appointment_date, appointment_time, notes } = session.metadata ?? {}
    const customerEmail = session.customer_email ?? session.customer_details?.email ?? ''
    const paymentIntentId =
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : (session.payment_intent?.id ?? null)

    const supabase = getSupabaseServiceClient()
    if (supabase) {
      // Try to update by stripe_session_id first (if already inserted)
      const { data: existing } = await supabase
        .from('appointments')
        .select('id')
        .eq('stripe_session_id', session.id)
        .maybeSingle()

      if (existing) {
        const { error } = await supabase
          .from('appointments')
          .update({
            status: 'paid',
            stripe_payment_intent_id: paymentIntentId,
          })
          .eq('stripe_session_id', session.id)

        if (error) console.error('[webhook/stripe] Update error:', error)
      } else {
        // Insert fresh record if it wasn't pre-inserted
        const { error } = await supabase.from('appointments').insert({
          name: name ?? '',
          email: customerEmail,
          phone: phone ?? null,
          service: service ?? '',
          appointment_date: appointment_date ?? '',
          appointment_time: appointment_time ?? '',
          notes: notes ?? null,
          amount_cents: session.amount_total ?? 5000,
          status: 'paid',
          stripe_session_id: session.id,
          stripe_payment_intent_id: paymentIntentId,
        })
        if (error) console.error('[webhook/stripe] Insert error:', error)
      }
    } else {
      console.warn('[webhook/stripe] Supabase service client unavailable — skipping DB update')
    }
  }

  return NextResponse.json({ received: true })
}
