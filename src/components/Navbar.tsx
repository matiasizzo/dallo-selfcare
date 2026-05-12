'use client'

import Link from 'next/link'
import { Search, User, ShoppingBag, ChevronDown } from 'lucide-react'
import { useCart } from '@/store/cart'

export default function Navbar() {
  const { openCart, totalItems } = useCart()
  const count = totalItems()

  return (
    <nav className="w-full bg-sand-200 border-b border-sand-300 px-6 py-4 relative z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Left nav */}
        <div className="flex items-center gap-6">
          <Link
            href="/productos"
            className="text-xs tracking-widest uppercase text-text font-sans hover:text-cocoa-600 transition-colors"
          >
            Todos los productos
          </Link>
          <Link
            href="/coleccion/nutri"
            className="text-xs tracking-widest uppercase text-text font-sans hover:text-cocoa-600 transition-colors"
          >
            Dall'Ó Nutri
          </Link>
          <Link
            href="/coleccion/skin"
            className="text-xs tracking-widest uppercase text-text font-sans hover:text-cocoa-600 transition-colors"
          >
            Dall'Ó Skin
          </Link>
        </div>

        {/* Center logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <span
            className="text-2xl font-light tracking-[0.15em] text-cocoa-900 select-none"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            DALL'Ó
          </span>
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-xs tracking-widest uppercase text-text font-sans hover:text-cocoa-600 transition-colors">
            EUR
            <ChevronDown size={12} />
          </button>
          <button className="text-text hover:text-cocoa-600 transition-colors" aria-label="Buscar">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <Link href="/cuenta" className="text-text hover:text-cocoa-600 transition-colors" aria-label="Mi cuenta">
            <User size={18} strokeWidth={1.5} />
          </Link>
          <button
            onClick={openCart}
            className="text-text hover:text-cocoa-600 transition-colors relative"
            aria-label="Carrito"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-cocoa-900 text-sand-100 text-[9px] font-sans rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
