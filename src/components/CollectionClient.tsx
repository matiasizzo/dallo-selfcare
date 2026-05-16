'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '@/lib/supabase'
import { formatPrice, getDefaultVariant } from '@/lib/products'
import { useCart } from '@/store/cart'

const CAT_GRADIENTS: Record<string, string> = {
  skin:       'linear-gradient(160deg, #cf9a72 0%, #5d3a23 100%)',
  balance:    'linear-gradient(160deg, #e6c376 0%, #8a5a20 100%)',
  energy:     'linear-gradient(160deg, #d4a987 0%, #6b3722 100%)',
  metabolism: 'linear-gradient(160deg, #c98a6e 0%, #5e3a23 100%)',
  detox:      'linear-gradient(160deg, #b7a07a 0%, #4a3220 100%)',
  nutri:      'linear-gradient(160deg, #d6c79a 0%, #7a5e36 100%)',
}
const DEFAULT_GRADIENT = 'linear-gradient(160deg, #d6c79a 0%, #7a5e36 100%)'

const GRAIN_SVG = `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyMDAnIGhlaWdodD0nMjAwJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC44NScgbnVtT2N0YXZlcz0nMicvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwLjIgIDAgMCAwIDAgMC4xNSAgMCAwIDAgMCAwLjEgIDAgMCAwIDAuNiAwJy8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsdGVyPSd1cmwoI24pJy8+PC9zdmc+")`

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

interface Props {
  products: Product[]
}

export default function CollectionClient({ products }: Props) {
  const { addItem } = useCart()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [sort, setSort] = useState('featured')
  const gridObserver = useInView(0.05)

  const categories = useMemo(() => {
    const seen = new Map<string, { slug: string; name: string }>()
    products.forEach((p) => {
      if (p.categories && !seen.has(p.categories.slug)) {
        seen.set(p.categories.slug, { slug: p.categories.slug, name: p.categories.name })
      }
    })
    return Array.from(seen.values())
  }, [products])

  const filtered = useMemo(() => {
    let r = activeCategory
      ? products.filter((p) => p.categories?.slug === activeCategory)
      : [...products]
    if (sort === 'price-asc')
      r = [...r].sort((a, b) => (getDefaultVariant(a)?.price_cents ?? 0) - (getDefaultVariant(b)?.price_cents ?? 0))
    if (sort === 'price-desc')
      r = [...r].sort((a, b) => (getDefaultVariant(b)?.price_cents ?? 0) - (getDefaultVariant(a)?.price_cents ?? 0))
    if (sort === 'name')
      r = [...r].sort((a, b) => a.name.localeCompare(b.name, 'es'))
    return r
  }, [products, activeCategory, sort])

  function handleAddToCart(product: Product, e: React.MouseEvent) {
    e.preventDefault()
    const variant = getDefaultVariant(product)
    if (!variant) return
    addItem({
      variantId: variant.id,
      productId: product.id,
      name: product.name,
      variantName: variant.name,
      priceCents: variant.price_cents,
      imageUrl: product.image_url ?? null,
      lineColor: '#553b2e',
    })
  }

  function scrollToGrid() {
    document.getElementById('grid-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-[#f0e7dc] px-8 pt-20 pb-[70px] border-b border-[#e8dccb] relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-[2]">
          <nav className="flex gap-[10px] text-[12px] tracking-[0.06em] text-[#5a4a3d] mb-6">
            <Link href="/" className="transition-colors duration-200 hover:text-cocoa-900">Inicio</Link>
            <span className="text-[#8a7a6c]">/</span>
            <span className="text-[#8a7a6c]">Todos los productos</span>
          </nav>
          <motion.h1
            className="font-cormorant font-[400] text-cocoa-900 leading-[0.98] tracking-[-0.015em] m-0 mb-[18px]"
            style={{ fontSize: 'clamp(44px, 6vw, 88px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            Todos los productos
          </motion.h1>
          <motion.p
            className="text-[16px] text-[#5a4a3d] max-w-[600px] m-0 leading-[1.55]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 }}
          >
            Fórmulas magistrales — preparadas bajo pedido en Barcelona y enviadas en frío al mundo.
          </motion.p>
        </div>
      </section>

      {/* ── Quick-pick categoria cards ── */}
      {categories.length > 0 && (
        <div className="max-w-[1600px] mx-auto px-8 pt-[70px] pb-[30px]">
          <h2
            className="font-cormorant font-[400] text-cocoa-900 m-0 mb-6"
            style={{ fontSize: 'clamp(22px, 2.2vw, 28px)', letterSpacing: '-0.005em' }}
          >
            ¿Por dónde empezar?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[10px]">
            {categories.map((cat, i) => {
              const gradient = CAT_GRADIENTS[cat.slug] ?? DEFAULT_GRADIENT
              const isActive = activeCategory === cat.slug
              return (
                <motion.button
                  key={cat.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 + i * 0.06 }}
                  onClick={() => {
                    setActiveCategory(isActive ? null : cat.slug)
                    setTimeout(scrollToGrid, 50)
                  }}
                  className="relative overflow-hidden flex flex-col justify-end text-left border-0 cursor-pointer"
                  style={{
                    aspectRatio: '4/5',
                    outline: isActive ? '2px solid #553b2e' : 'none',
                    outlineOffset: 2,
                    transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0" style={{ background: gradient }} />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: 0.18, mixBlendMode: 'overlay', backgroundImage: GRAIN_SVG }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(43,32,23,0.65) 0%, rgba(43,32,23,0.05) 60%, transparent 100%)' }}
                  />
                  <div className="relative z-[2] p-5 flex flex-col gap-[2px]">
                    <span
                      className="font-cormorant font-[400] text-[#f6eee6] leading-tight"
                      style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', letterSpacing: '-0.005em' }}
                    >
                      {cat.name}
                    </span>
                    <span className="text-[11px] tracking-[0.06em] text-[rgba(246,238,230,0.78)]">
                      {products.filter((p) => p.categories?.slug === cat.slug).length} productos
                    </span>
                  </div>
                  {isActive && (
                    <span className="absolute top-[14px] right-[14px] z-[3] w-[22px] h-[22px] rounded-full bg-[#f6eee6] text-[#553b2e] text-[12px] font-[600] flex items-center justify-center">
                      ✓
                    </span>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Sticky filter bar ── */}
      <div
        className="sticky z-20 border-t border-b border-[#e8dccb]"
        id="grid-anchor"
        style={{
          top: 73,
          background: 'rgba(246, 238, 230, 0.94)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-8 py-[18px] flex items-center gap-6 flex-wrap">
          <div className="flex gap-2 flex-wrap flex-1 min-w-0">
            <button
              onClick={() => setActiveCategory(null)}
              className={`inline-flex items-center px-4 py-2 text-[13px] font-[500] border rounded-full cursor-pointer whitespace-nowrap transition-all duration-200 active:scale-[0.96] ${
                !activeCategory
                  ? 'bg-cocoa-900 text-cream border-cocoa-900'
                  : 'bg-transparent text-cocoa-900 border-[#ddd1bd] hover:border-cocoa-900'
              }`}
            >
              Todos · {products.length}
            </button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.categories?.slug === cat.slug).length
              const isActive = activeCategory === cat.slug
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(isActive ? null : cat.slug)}
                  className={`inline-flex items-center px-4 py-2 text-[13px] font-[500] border rounded-full cursor-pointer whitespace-nowrap transition-all duration-200 active:scale-[0.96] ${
                    isActive
                      ? 'bg-cocoa-900 text-cream border-cocoa-900'
                      : 'bg-transparent text-cocoa-900 border-[#ddd1bd] hover:border-cocoa-900'
                  }`}
                >
                  {cat.name} · {count}
                </button>
              )
            })}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none bg-transparent border border-[#ddd1bd] rounded-full px-4 py-2 text-[13px] text-cocoa-900 cursor-pointer hover:border-cocoa-900 focus:outline-none focus:border-[#553b2e] transition-colors duration-200"
            style={{
              paddingRight: '36px',
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none' stroke='%232b2017' stroke-width='1.4'><path d='m1 1.5 5 5 5-5'/></svg>")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 14px center',
            }}
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>
      </div>

      {/* ── Product grid ── */}
      <section className="py-10 px-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Summary */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#e8dccb] text-[13px] text-[#5a4a3d]">
            <span>
              {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
            </span>
            <AnimatePresence>
              {activeCategory && (
                <motion.button
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18, ease: EASE_OUT }}
                  onClick={() => setActiveCategory(null)}
                  className="inline-flex items-center gap-[6px] text-[12px] tracking-[0.06em] text-cocoa-900 border-b border-cocoa-900 cursor-pointer hover:text-[#553b2e] hover:border-[#553b2e] transition-colors duration-200"
                >
                  Limpiar filtros ×
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="font-cormorant text-[22px] italic text-[#5a4a3d] m-0 mb-6">
                Ninguna fórmula coincide con esos filtros.
              </p>
              <button
                onClick={() => setActiveCategory(null)}
                className="inline-flex items-center justify-center px-[26px] py-3 text-[13px] tracking-[0.02em] border border-cocoa-900 text-cocoa-900 rounded-full bg-transparent hover:bg-cocoa-900 hover:text-cream transition-all duration-300 active:scale-[0.97]"
              >
                Mostrar todo
              </button>
            </motion.div>
          ) : (
            <div
              ref={gridObserver.ref}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            >
              {filtered.map((product, i) => {
                const variant = getDefaultVariant(product)
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={gridObserver.visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: EASE_OUT, delay: Math.min(i * 0.04, 0.32) }}
                  >
                    <Link href={`/productos/${product.slug}`} className="group block cursor-pointer">
                      <div
                        className="relative aspect-square overflow-hidden flex items-center justify-center"
                        style={{ background: '#ebe7e0' }}
                      >
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-contain object-center transition-transform duration-500 group-hover:-translate-y-1"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full" />
                        )}
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className="absolute bottom-4 left-4 right-4 bg-white text-cocoa-900 border border-[#e8dccb] rounded-full py-[11px] px-4 text-[12px] font-[500] tracking-[0.02em] flex items-center justify-center gap-2 opacity-0 translate-y-[10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[220ms] hover:bg-cocoa-900 hover:text-cream hover:border-cocoa-900 active:scale-[0.97]"
                          style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
                          aria-label={`Añadir ${product.name}`}
                        >
                          <Plus size={14} strokeWidth={1.5} />
                          Añadir
                        </button>
                      </div>
                      <div className="px-1 pt-4 pb-2 flex flex-col gap-[2px]">
                        <h3 className="text-[14px] font-[500] tracking-[0.02em] text-cocoa-900 m-0">
                          {product.name}
                        </h3>
                        {variant && (
                          <p className="text-[13px] text-[#5a4a3d] mt-[2px]">
                            {formatPrice(variant.price_cents)}
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="bg-[#f0e7dc] py-20 px-8 text-center border-t border-[#e8dccb]">
        <div className="max-w-[640px] mx-auto">
          <h3
            className="font-cormorant font-[400] text-cocoa-900 leading-[1.1] m-0 mb-[14px]"
            style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', letterSpacing: '-0.005em' }}
          >
            ¿No sabes por dónde empezar?
          </h3>
          <p className="text-[15px] text-[#5a4a3d] m-0 mb-7">
            Reserva un diagnóstico con el Dr. Dall&apos;Ó. Diseñamos tu protocolo personalizado.
          </p>
          {/* Nested-arrow CTA */}
          <a
            href="#"
            className="group inline-flex items-center gap-2 pl-7 pr-2 py-2 text-[13px] font-[500] tracking-[0.02em] rounded-full border transition-all duration-300 active:scale-[0.97]"
            style={{ borderColor: '#553b2e', background: '#553b2e', color: '#f6eee6' }}
          >
            Reservar consulta
            <span className="w-8 h-8 rounded-full bg-[rgba(246,238,230,0.15)] group-hover:bg-[rgba(246,238,230,0.25)] flex items-center justify-center transition-colors duration-200">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform duration-150">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </span>
          </a>
        </div>
      </section>
    </>
  )
}
