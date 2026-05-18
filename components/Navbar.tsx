'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 900) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      {/* Promo bar */}
      <div className="bg-carbon-900 text-cream-100 text-[11px] tracking-[0.22em] py-3 px-6 text-center uppercase font-medium">
        <strong className="text-brand-200 font-medium">Estética consciente</strong>
        {' '}· Envío gratuito desde 80 € · Diagnóstico médico incluido con tu primera compra
      </div>

      {/* Nav */}
      <header
        className={`sticky top-0 z-30 bg-cream-200 transition-all duration-300 ${
          scrolled
            ? 'border-b border-cream-400'
            : 'border-b border-transparent'
        }`}
        style={{
          background: scrolled ? 'rgba(245, 242, 236, 0.94)' : '#f5f2ec',
          backdropFilter: scrolled ? 'blur(12px)' : undefined,
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : undefined,
        }}
      >
        <div
          className={`grid items-center px-9 max-w-[1600px] mx-auto transition-all duration-[200ms] ${
            scrolled ? 'py-3' : 'py-[22px]'
          }`}
          style={{ gridTemplateColumns: '1fr auto 1fr', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
        >
          {/* Left nav links */}
          <nav className="hidden md:flex gap-[30px] text-[13px] items-center">
            <a href="#treatments" className="relative py-1.5 text-carbon-700 hover:text-brand-600 transition-colors duration-200 tracking-[0.01em] will-change-[color]" style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}>
              Tratamientos
            </a>
            <Link href="/shop" className="relative py-1.5 text-carbon-700 hover:text-brand-600 transition-colors duration-200 tracking-[0.01em] will-change-[color]" style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}>
              Tienda
            </Link>
            <a href="#booking" className="inline-flex items-center px-5 py-2 rounded-full bg-brand-600 text-cream-50 font-medium tracking-[0.02em] transition-all duration-200 hover:bg-brand-700 hover:-translate-y-0.5 active:scale-[0.97] will-change-transform" style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}>
              Reservar cita
            </a>
          </nav>

          {/* Center wordmark */}
          <Link href="/" className="inline-flex items-center gap-[14px]">
            <span className="font-serif font-bold text-[28px] leading-none text-carbon-900 tracking-[0.04em]">
              QUEVI
            </span>
            <span
              className="inline-flex flex-col items-start pl-[14px] leading-[1.2]"
              style={{ borderLeft: '1px solid #ddd8cc' }}
            >
              <span className="text-[9px] tracking-[0.26em] uppercase text-carbon-500">Wellness Clinic</span>
            </span>
          </Link>

          {/* Right icons */}
          <div className="hidden md:flex items-center gap-[22px] justify-end text-[13px]">
            <button aria-label="Buscar" className="group">
              <svg className="w-[18px] h-[18px] group-hover:[stroke:#355539] transition-colors" viewBox="0 0 24 24" fill="none" stroke="#1e1e1e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <button aria-label="Cuenta" className="group">
              <svg className="w-[18px] h-[18px] group-hover:[stroke:#355539] transition-colors" viewBox="0 0 24 24" fill="none" stroke="#1e1e1e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
              </svg>
            </button>
            <Link href="/shop" className="relative w-[30px] h-[30px] inline-flex items-center justify-center" aria-label="Bolsa">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="#1e1e1e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 7h12l-1 13H7L6 7z" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
              <span className="absolute -top-1 -right-2 bg-terra-500 text-white rounded-full text-[9px] font-semibold min-w-[16px] h-4 px-1 inline-flex items-center justify-center">
                3
              </span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden justify-end">
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="p-2 rounded-lg text-carbon-700 hover:bg-cream-300 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 z-40 backdrop-blur-md shadow-xl border-b border-cream-400 md:hidden"
            style={{ top: '88px', background: 'rgba(245,242,236,0.98)' }}
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              <a href="#treatments" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-base font-medium text-carbon-700 hover:text-brand-600 hover:bg-cream-300 rounded-xl transition-colors">
                Tratamientos
              </a>
              <Link href="/shop" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-base font-medium text-carbon-700 hover:text-brand-600 hover:bg-cream-300 rounded-xl transition-colors">
                Tienda
              </Link>
              <a href="#booking" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-base font-medium text-cream-50 bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors text-center">
                Reservar cita
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
