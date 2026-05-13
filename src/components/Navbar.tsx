'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, User, ShoppingBag } from 'lucide-react'
import { useCart } from '@/store/cart'

export default function Navbar() {
  const { openCart, totalItems } = useCart()
  const count = totalItems()

  return (
    <nav className="w-full bg-white border-b border-sand-300 px-6 py-5 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">

        {/* Left nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/productos" className="text-[11px] tracking-[0.2em] uppercase text-text-muted hover:text-cocoa-900 transition-colors">
            Todos los productos
          </Link>
          <Link href="/coleccion/nutri" className="text-[11px] tracking-[0.2em] uppercase text-text-muted hover:text-cocoa-900 transition-colors">
            Dall'Ó Nutri
          </Link>
          <Link href="/coleccion/skin" className="text-[11px] tracking-[0.2em] uppercase text-text-muted hover:text-cocoa-900 transition-colors">
            Dall'Ó Skin
          </Link>
        </div>

        {/* Center logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/logo-nova-dallo-black.svg"
            alt="Dall'Ó Selfcare"
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-5 ml-auto">
          <button className="text-text-muted hover:text-cocoa-900 transition-colors" aria-label="Buscar">
            <Search size={17} strokeWidth={1.5} />
          </button>
          <Link href="/cuenta" className="text-text-muted hover:text-cocoa-900 transition-colors" aria-label="Mi cuenta">
            <User size={17} strokeWidth={1.5} />
          </Link>
          <button onClick={openCart} className="text-text-muted hover:text-cocoa-900 transition-colors relative" aria-label="Carrito">
            <ShoppingBag size={17} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-cocoa-900 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
