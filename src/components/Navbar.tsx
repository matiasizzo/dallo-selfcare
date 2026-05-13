'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/store/cart'

const NAV_LINKS = [
  { label: 'Todos los productos', href: '/productos' },
  { label: 'Dallo Nutri', href: '/coleccion/nutri' },
  { label: 'Dallo Skin', href: '/coleccion/skin' },
  { label: 'Filosofía', href: '/sobre' },
]

export default function Navbar() {
  const { openCart, totalItems } = useCart()
  const count = totalItems()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="w-full sticky top-0 z-50 bg-bg border-b border-line-soft">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 py-4 md:py-5 grid grid-cols-[1fr_auto_1fr] items-center">

          {/* Left: desktop nav / mobile hamburger */}
          <div className="flex items-center gap-7">
            <div className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[13px] tracking-[0.01em] text-ink hover:text-brown transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
            <button
              className="md:hidden text-ink hover:text-brown transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={20} strokeWidth={1.4} />
            </button>
          </div>

          {/* Center logo */}
          <Link href="/" className="justify-self-center">
            <Image
              src="https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/logo-nova-dallo-black.svg"
              alt="Dall'Ó Selfcare"
              width={110}
              height={36}
              className="h-7 md:h-8 w-auto"
              priority
            />
          </Link>

          {/* Right: icons */}
          <div className="flex items-center gap-4 md:gap-[22px] justify-end">
            <span className="hidden md:flex items-center gap-1 text-[13px] text-ink cursor-pointer select-none">
              EUR
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </span>
            <button className="hidden md:block text-ink hover:text-brown transition-colors" aria-label="Buscar">
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

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-bg flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-line-soft">
              <Image
                src="https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/logo-nova-dallo-black.svg"
                alt="Dall'Ó Selfcare"
                width={90}
                height={30}
                className="h-6 w-auto"
              />
              <button
                onClick={() => setMenuOpen(false)}
                className="text-ink-soft hover:text-ink transition-colors"
                aria-label="Cerrar menú"
              >
                <X size={20} strokeWidth={1.4} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col px-6 py-6 gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[16px] text-ink py-3 border-b border-line-soft last:border-0 hover:text-brown transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Bottom */}
            <div className="mt-auto px-6 pb-8 flex flex-col gap-3">
              <Link
                href="/cuenta"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-[13px] text-ink-soft hover:text-ink transition-colors"
              >
                <User size={16} strokeWidth={1.3} />
                Mi cuenta
              </Link>
              <button
                onClick={() => { setMenuOpen(false); openCart() }}
                className="flex items-center gap-3 text-[13px] text-ink-soft hover:text-ink transition-colors"
              >
                <ShoppingBag size={16} strokeWidth={1.3} />
                Bolsa {count > 0 && `(${count})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
