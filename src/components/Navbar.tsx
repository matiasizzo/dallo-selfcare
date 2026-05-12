'use client'

import Link from 'next/link'
import { Search, User, ShoppingBag, ChevronDown } from 'lucide-react'

export default function Navbar() {
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
          <button className="text-text hover:text-cocoa-600 transition-colors" aria-label="Search">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button className="text-text hover:text-cocoa-600 transition-colors" aria-label="Account">
            <User size={18} strokeWidth={1.5} />
          </button>
          <button className="text-text hover:text-cocoa-600 transition-colors relative" aria-label="Cart">
            <ShoppingBag size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </nav>
  )
}
