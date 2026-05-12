'use client'

import Link from 'next/link'
import { Twitter, Instagram } from 'lucide-react'

const nutriLinks = [
  { label: 'Dall\'Ó Nutri', href: '/coleccion/nutri' },
  { label: 'Metabolism', href: '/coleccion/metabolism' },
  { label: 'Balance', href: '/coleccion/balance' },
  { label: 'Protection', href: '/coleccion/protection' },
  { label: 'Energy', href: '/coleccion/energy' },
  { label: 'Senolytic', href: '/coleccion/senolytic' },
]

const brandLinks = [
  { label: 'Sobre', href: '/sobre' },
  { label: 'Home', href: '/' },
  { label: 'Universe', href: '/universe' },
  { label: 'Dall\'Ó Nutri', href: '/coleccion/nutri' },
  { label: 'Dall\'Ó Skin', href: '/coleccion/skin' },
]

export default function Footer() {
  return (
    <footer className="w-full bg-sand-100 border-t border-sand-300">
      {/* Newsletter + links */}
      <div className="max-w-screen-xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Newsletter */}
        <div>
          <h3
            className="text-xl font-light text-cocoa-900 mb-2 leading-snug"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Faça parte da comunidade Dall'Ó
          </h3>
          <p className="text-xs text-text-muted font-sans mb-6 leading-relaxed">
            Fique por dentro das novidades e lançamentos
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-0"
          >
            <input
              type="email"
              placeholder="Dirección de correo electrónico"
              className="flex-1 border border-sand-400 bg-transparent px-4 py-2.5 text-xs font-sans text-text placeholder:text-text-muted focus:outline-none focus:border-cocoa-600"
            />
            <button
              type="submit"
              className="bg-cocoa-900 text-sand-100 text-xs tracking-[0.15em] uppercase px-5 py-2.5 font-sans hover:bg-cocoa-800 transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Nutri links */}
        <div>
          <ul className="space-y-2.5">
            {nutriLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs tracking-[0.1em] uppercase text-text-muted font-sans hover:text-cocoa-900 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand links */}
        <div>
          <ul className="space-y-2.5">
            {brandLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs tracking-[0.1em] uppercase text-text-muted font-sans hover:text-cocoa-900 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright row */}
      <div className="border-t border-sand-300 max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        <p className="text-[10px] text-text-muted font-sans tracking-wide">
          © 2026 DALL'Ó SELFCARE. Tecnologia de Shopify
        </p>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Instagram" className="text-text-muted hover:text-cocoa-900 transition-colors">
            <Instagram size={14} strokeWidth={1.5} />
          </a>
          <a href="#" aria-label="Twitter/X" className="text-text-muted hover:text-cocoa-900 transition-colors">
            <Twitter size={14} strokeWidth={1.5} />
          </a>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="w-full bg-cocoa-900 overflow-hidden py-8">
        <p
          className="text-center text-[18vw] leading-none font-light text-sand-200 select-none tracking-tight"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          DALL'Ó
        </p>
      </div>
    </footer>
  )
}
