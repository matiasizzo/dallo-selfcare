'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, User, ShoppingBag } from 'lucide-react'
import { useCart } from '@/store/cart'

export default function Navbar() {
  const { openCart, totalItems } = useCart()
  const count = totalItems()

  return (
    <nav className="w-full sticky top-0 z-50 bg-bg border-b border-transparent transition-[border-color] duration-300">
      <div className="max-w-[1600px] mx-auto px-8 py-5 grid grid-cols-[1fr_auto_1fr] items-center">

        {/* Left nav */}
        <div className="hidden md:flex items-center gap-7">
          {[
            { label: 'Todos los productos', href: '/productos' },
            { label: 'Dallo Nutri', href: '/coleccion/nutri' },
            { label: 'Dallo Skin', href: '/coleccion/skin' },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-[13px] tracking-[0.01em] text-ink hover:text-brown transition-colors duration-250"
            >
              {label}
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
        <div className="flex items-center gap-[22px] justify-end">
          <span className="hidden md:flex items-center gap-1 text-[13px] text-ink cursor-pointer select-none">
            EUR
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </span>
          <button className="text-ink hover:text-brown transition-colors" aria-label="Buscar">
            <Search size={18} strokeWidth={1.3} />
          </button>
          <Link href="/cuenta" className="text-ink hover:text-brown transition-colors" aria-label="Mi cuenta">
            <User size={18} strokeWidth={1.3} />
          </Link>
          <button
            onClick={openCart}
            className="relative text-ink hover:text-brown transition-colors"
            aria-label="Bolsa"
          >
            <ShoppingBag size={18} strokeWidth={1.3} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brown text-bg rounded-full text-[10px] font-[600] min-w-[16px] h-4 flex items-center justify-center px-1 leading-none">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
