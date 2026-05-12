'use client'

import CartDrawer from './CartDrawer'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartDrawer />
    </>
  )
}
