import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { getShippingCents, getDiscountCents } from '@/lib/shipping'
import type { CartItem } from '@/store/cart'

export async function POST(req: NextRequest) {
  const { items, shippingDetails, couponCode } = await req.json() as {
    items: CartItem[]
    shippingDetails: {
      name: string
      email: string
      phone?: string
      address: string
      city: string
      postalCode: string
      country: string
    }
    couponCode?: string
  }

  if (!items?.length) {
    return NextResponse.json({ error: 'El carrito está vacío' }, { status: 400 })
  }

  const subtotalCents = Math.round(
    items.reduce((sum, i) => sum + (Number(i.priceCents) || 0) * (Number(i.quantity) || 1), 0)
  )

  if (!subtotalCents || subtotalCents < 50) {
    return NextResponse.json(
      { error: `Importe inválido: ${subtotalCents} céntimos.` },
      { status: 400 }
    )
  }

  // Shipping
  const shippingCents = getShippingCents(subtotalCents)

  // Coupon — re-validate server-side
  let discountCents = 0
  let discountPercent = 0
  if (couponCode) {
    const { data } = await supabase
      .from('discount_codes')
      .select('discount_percent, max_uses, uses')
      .eq('code', couponCode.toUpperCase())
      .eq('active', true)
      .single()

    if (data && (data.max_uses === null || data.uses < data.max_uses)) {
      discountPercent = data.discount_percent
      discountCents = getDiscountCents(subtotalCents, discountPercent)
    }
  }

  const totalCents = Math.max(50, subtotalCents + shippingCents - discountCents)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCents,
    currency: 'eur',
    automatic_payment_methods: { enabled: true },
    metadata: {
      items: JSON.stringify(
        items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          name: i.name,
          variantName: i.variantName,
          priceCents: i.priceCents,
          quantity: i.quantity,
        }))
      ),
      subtotal_cents: subtotalCents,
      shipping_cents: shippingCents,
      discount_cents: discountCents,
      coupon_code: couponCode ?? '',
      shipping_name: shippingDetails.name,
      shipping_email: shippingDetails.email,
      shipping_phone: shippingDetails.phone ?? '',
      shipping_address: shippingDetails.address,
      shipping_city: shippingDetails.city,
      shipping_postal_code: shippingDetails.postalCode,
      shipping_country: shippingDetails.country,
    },
  })

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    totalCents,
    shippingCents,
    discountCents,
  })
}
