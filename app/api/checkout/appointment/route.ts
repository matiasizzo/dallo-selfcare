import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

function getSupabaseServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) return null

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, date, time, notes } = body

    // Validate required fields
    if (!name || !email || !service || !date || !time) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: nombre, email, servicio, fecha y hora.' },
        { status: 400 }
      )
    }

    // Insert pending appointment in Supabase
    const supabase = getSupabaseServiceClient()
    if (supabase) {
      const { error: dbError } = await supabase.from('appointments').insert({
        name,
        email,
        phone: phone ?? null,
        service,
        appointment_date: date,
        appointment_time: time,
        notes: notes ?? null,
        amount_cents: 5000,
        status: 'pending',
      })
      if (dbError) {
        console.error('[checkout/appointment] Supabase insert error:', dbError)
      }
    } else {
      console.warn('[checkout/appointment] Supabase service client unavailable — skipping DB insert')
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: 5000,
            product_data: {
              name: 'Consulta médica QUEVI',
              description: `${service} — ${date} a las ${time}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/cita/confirmada?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#booking`,
      customer_email: email,
      metadata: {
        name,
        phone: phone ?? '',
        service,
        appointment_date: date,
        appointment_time: time,
        notes: notes ?? '',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[checkout/appointment] Error:', err)
    return NextResponse.json(
      { error: 'Error al crear la sesión de pago. Por favor, inténtalo de nuevo.' },
      { status: 500 }
    )
  }
}
