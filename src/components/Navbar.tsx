'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, User, ShoppingBag } from 'lucide-react'
import { useCart } from '@/store/cart'

export default function Navbar() {
  const { openCart, totalItems } = useCart()
  const count = totalItems()

  return (
    <nav className="w-full sticky top-0 z-50 border-b border-line-soft" style={{ background: 'rgba(239,232,219,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
      <div className="max-w-[1600px] mx-auto px-10 py-[22px] grid grid-cols-[1fr_auto_1fr] items-center">

        {/* Left nav */}
        <div className="hidden md:flex items-center gap-9">
          {[
            { label: 'Tienda', href: '/productos' },
            { label: 'Dallo Skin', href: '/coleccion/skin' },
            { label: 'Dallo Nutri', href: '/coleccion/nutri' },
            { label: 'Filosofía', href: '/sobre' },
          ].map(({ label, href }) => (
            <Link key={href} href={href} className="relative text-[13px] tracking-[0.04em] text-ink py-1.5 group">
              {label}
              <span className="absolute left-0 right-0 bottom-0 h-px bg-accent scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        {/* Center logo */}
        <Link href="/" className="justify-self-center">
          <Image
            src="https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/logo-nova-dallo-black.svg"
            alt="Dall'Ó Selfcare"
            width={110}
            height={36}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Right */}
        <div className="flex items-center gap-[26px] justify-end text-[13px]">
          <button className="text-ink hover:text-accent transition-colors" aria-label="Buscar">
            <Search size={18} strokeWidth={1.2} />
          </button>
          <Link href="/cuenta" className="text-ink hover:text-accent transition-colors" aria-label="Mi cuenta">
            <User size={18} strokeWidth={1.2} />
          </Link>
          <button
            onClick={openCart}
            className="inline-flex items-center gap-2 border border-ink rounded-full px-[14px] py-2 text-[13px] tracking-[0.02em] text-ink hover:bg-ink hover:text-paper transition-all duration-300"
            aria-label="Carrito"
          >
            <ShoppingBag size={16} strokeWidth={1.2} />
            Bolsa · {count}
          </button>
        </div>
      </div>
    </nav>
  )
}
