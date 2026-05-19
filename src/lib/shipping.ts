export const SHIPPING_CENTS = 500
export const FREE_SHIPPING_THRESHOLD_CENTS = 5000

export function getShippingCents(subtotalCents: number): number {
  return subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_CENTS
}

export function getDiscountCents(subtotalCents: number, discountPercent: number): number {
  return Math.round((subtotalCents * discountPercent) / 100)
}
