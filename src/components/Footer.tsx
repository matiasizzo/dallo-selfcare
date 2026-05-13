'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram } from 'lucide-react'

const nutriLinks = [
  { label: 'Dall\'Ó Nutri', href: '/coleccion/nutri' },
  { label: 'Metabolism', href: '/coleccion/metabolism' },
  { label: 'Balance', href: '/coleccion/balance' },
  { label: 'Protection', href: '/coleccion/protection' },
  { label: 'Energy', href: '/coleccion/energy' },
  { label: 'Senolytic', href: '/coleccion/senolytic' },
]

const brandLinks = [
  { label: 'Sobre nosotros', href: '/sobre' },
  { label: 'Dall\'Ó Nutri', href: '/coleccion/nutri' },
  { label: 'Dall\'Ó Skin', href: '/coleccion/skin' },
  { label: 'Mi cuenta', href: '/cuenta' },
  { label: 'Mis pedidos', href: '/cuenta/pedidos' },
]

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-sand-300">

      {/* Newsletter + links */}
      <div className="max-w-screen-xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-16">

        {/* Newsletter */}
        <div>
          <h3 className="font-cormorant text-2xl font-light text-cocoa-900 mb-2 leading-snug">
            Únete a la comunidad Dall'Ó
          </h3>
          <p className="text-xs text-text-muted mb-8 leading-relaxed">
            Novedades, lanzamientos y contenido exclusivo.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 border border-sand-400 bg-transparent px-4 py-3 text-xs text-text placeholder:text-text-muted focus:outline-none focus:border-cocoa-900 transition-colors"
            />
            <button
              type="submit"
              className="bg-cocoa-900 text-white text-[10px] tracking-[0.2em] uppercase px-5 py-3 hover:bg-cocoa-800 transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Nutri links */}
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-text-muted mb-6">Líneas</p>
          <ul className="space-y-3">
            {nutriLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs tracking-[0.1em] uppercase text-text-muted hover:text-cocoa-900 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand links */}
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-text-muted mb-6">Información</p>
          <ul className="space-y-3">
            {brandLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs tracking-[0.1em] uppercase text-text-muted hover:text-cocoa-900 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sand-300 max-w-screen-xl mx-auto px-8 py-5 flex items-center justify-between">
        <p className="text-[10px] text-text-muted tracking-wide">
          © {new Date().getFullYear()} DALL'Ó SELFCARE. Todos los derechos reservados.
        </p>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-text-muted hover:text-cocoa-900 transition-colors">
          <Instagram size={15} strokeWidth={1.5} />
        </a>
      </div>

      {/* Giant logo */}
      <div className="w-full bg-cocoa-900 overflow-hidden py-14 flex items-center justify-center">
        <Image
          src="https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/logo-nova-dallo-dark.webp"
          alt="Dall'Ó Selfcare"
          width={400}
          height={120}
          className="w-[40vw] max-w-sm h-auto opacity-90"
        />
      </div>
    </footer>
  )
}
