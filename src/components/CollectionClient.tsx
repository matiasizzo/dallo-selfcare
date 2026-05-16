'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus } from 'lucide-react'
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

interface Props {
  products: Product[]
}

export default function CollectionClient({ products }: Props) {
  const { addItem } = useCart()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [sort, setSort] = useState('featured')

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
            <Link href="/" className="transition-colors hover:text-cocoa-900">Inicio</Link>
            <span className="text-[#8a7a6c]">/</span>
            <span className="text-[#8a7a6c]">Todos los productos</span>
          </nav>
          <h1
            className="font-cormorant font-[400] text-cocoa-900 leading-[0.98] tracking-[-0.015em] m-0 mb-[18px]"
            style={{ fontSize: 'clamp(44px, 6vw, 88px)' }}
          >
            Todos los productos
          </h1>
          <p className="text-[16px] text-[#5a4a3d] max-w-[600px] m-0 leading-[1.55]">
            Fórmulas magistrales — preparadas bajo pedido en Barcelona y enviadas en frío al mundo.
          </p>
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
            {categories.map((cat) => {
              const gradient = CAT_GRADIENTS[cat.slug] ?? DEFAULT_GRADIENT
              const isActive = activeCategory === cat.slug
              return (
                <button
                  key={cat.slug}
                  onClick={() => {
                    setActiveCategory(isActive ? null : cat.slug)
                    setTimeout(scrollToGrid, 50)
                  }}
                  className="relative overflow-hidden flex flex-col justify-end text-left border-0 cursor-pointer transition-transform duration-300 hover:-translate-y-[3px]"
                  style={{
                    aspectRatio: '4/5',
                    outline: isActive ? '2px solid #553b2e' : 'none',
                    outlineOffset: 2,
                  }}
                >
                  {/* Gradient bg */}
                  <div className="absolute inset-0" style={{ background: gradient }} />
                  {/* Grain */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: 0.18, mixBlendMode: 'overlay', backgroundImage: GRAIN_SVG }}
                  />
                  {/* Dark bottom gradient */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(43,32,23,0.65) 0%, rgba(43,32,23,0.05) 60%, transparent 100%)' }}
                  />
                  {/* Label */}
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
                </button>
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
          {/* Category chips */}
          <div className="flex gap-2 flex-wrap flex-1 min-w-0">
            <button
              onClick={() => setActiveCategory(null)}
              className={`inline-flex items-center px-4 py-2 text-[13px] font-[500] border rounded-full cursor-pointer whitespace-nowrap transition-all duration-200 ${
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
                  className={`inline-flex items-center px-4 py-2 text-[13px] font-[500] border rounded-full cursor-pointer whitespace-nowrap transition-all duration-200 ${
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

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none bg-transparent border border-[#ddd1bd] rounded-full px-4 py-2 text-[13px] text-cocoa-900 cursor-pointer hover:border-cocoa-900 focus:outline-none focus:border-[#553b2e] transition-colors"
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
            {activeCategory && (
              <button
                onClick={() => setActiveCategory(null)}
                className="inline-flex items-center gap-[6px] text-[12px] tracking-[0.06em] text-cocoa-900 border-b border-cocoa-900 cursor-pointer hover:text-[#553b2e] hover:border-[#553b2e] transition-colors"
              >
                Limpiar filtros ×
              </button>
            )}
          </div>

          {/* Empty state */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-cormorant text-[22px] italic text-[#5a4a3d] m-0 mb-6">
                Ninguna fórmula coincide con esos filtros.
              </p>
              <button
                onClick={() => setActiveCategory(null)}
                className="inline-flex items-center justify-center px-[26px] py-3 text-[13px] tracking-[0.02em] border border-cocoa-900 text-cocoa-900 rounded-full bg-transparent hover:bg-cocoa-900 hover:text-cream transition-all duration-300"
              >
                Mostrar todo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((product) => {
                const variant = getDefaultVariant(product)
                return (
                  <Link
                    key={product.id}
                    href={`/productos/${product.slug}`}
                    className="group block cursor-pointer"
                  >
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
                        className="absolute bottom-4 left-4 right-4 bg-white text-cocoa-900 border border-[#e8dccb] rounded-full py-[11px] px-4 text-[12px] font-[500] tracking-[0.02em] flex items-center justify-center gap-2 opacity-0 translate-y-[10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[350ms] hover:bg-cocoa-900 hover:text-cream hover:border-cocoa-900"
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
          <a
            href="#"
            className="inline-flex items-center justify-center px-[30px] py-[14px] text-[13px] tracking-[0.02em] font-[500] border rounded-full transition-all duration-300"
            style={{
              borderColor: '#553b2e',
              background: '#553b2e',
              color: '#f6eee6',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#3c2920'
              ;(e.currentTarget as HTMLElement).style.borderColor = '#3c2920'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#553b2e'
              ;(e.currentTarget as HTMLElement).style.borderColor = '#553b2e'
            }}
          >
            Reservar consulta
          </a>
        </div>
      </section>
    </>
  )
}
