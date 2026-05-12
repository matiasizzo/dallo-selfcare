'use client'

import { useEffect } from 'react'
import CartDrawer from './CartDrawer'
import { useCart } from '@/store/cart'

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useCart.persist.rehydrate()
  }, [])

  return (
    <>
      {children}
      <CartDrawer />
    </>
  )
}
