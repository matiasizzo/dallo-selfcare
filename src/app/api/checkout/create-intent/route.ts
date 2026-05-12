import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type { CartItem } from '@/store/cart'

export async function POST(req: NextRequest) {
  const { items, shippingDetails } = await req.json() as {
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
  }

  if (!items?.length) {
    return NextResponse.json({ error: 'El carrito está vacío' }, { status: 400 })
  }

  const totalCents = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0)

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
      shipping_name: shippingDetails.name,
      shipping_email: shippingDetails.email,
      shipping_phone: shippingDetails.phone ?? '',
      shipping_address: shippingDetails.address,
      shipping_city: shippingDetails.city,
      shipping_postal_code: shippingDetails.postalCode,
      shipping_country: shippingDetails.country,
    },
  })

  return NextResponse.json({ clientSecret: paymentIntent.client_secret })
}
