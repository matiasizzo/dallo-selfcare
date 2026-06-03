'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

const FALLBACK_PRODUCTS = [
  { id: 'longevity-mousse', slug: 'd-longevity-mousse', name: 'D-LONGEVITY Mousse',  vol: '150 ml', price: 0, was: null, badge: null,   stripe: '#83a886', tipo: 'limpiador', code: 'D-LON-150', image_url: null },
  { id: 'senolytic-serum',  slug: 'd-senolytic-serum',  name: 'D-Senolytic Serum',   vol: '20 ml',  price: 0, was: null, badge: 'best', stripe: '#c4876a', tipo: 'serum',    code: 'D-SEN-20',  image_url: null },
  { id: 'evenglow-serum',   slug: 'd-evenglow-serum',   name: 'D-EVENGLOW Serum',    vol: '20 ml',  price: 0, was: null, badge: 'new',  stripe: '#d49070', tipo: 'serum',    code: 'D-EVG-20',  image_url: null },
  { id: 'rescue-serum',     slug: 'd-rescue-serum',     name: 'D-RESCUE Serum',      vol: '20 ml',  price: 0, was: null, badge: null,   stripe: '#c4876a', tipo: 'serum',    code: 'D-RES-20',  image_url: null },
  { id: 'aox-oil',          slug: 'd-aox-oil',          name: 'D-AOX Oil',           vol: '20 ml',  price: 0, was: null, badge: 'lim',  stripe: '#2c472f', tipo: 'aceite',   code: 'D-AOX-20',  image_url: null },
  { id: 'purifying-mousse', slug: 'd-purifying-mousse', name: 'D-PURIFYING Mousse',  vol: '150 ml', price: 0, was: null, badge: null,   stripe: '#83a886', tipo: 'limpiador', code: 'D-PUR-150', image_url: null },
]

type Product = {
  id: string
  slug: string
  name: string
  vol: string
  price: number
  was: number | null
  badge: string | null
  stripe: string
  tipo: string
  code: string
  image_url: string | null
}

const TIPO_LABELS: Record<string, string> = {
  serum: 'Sérum', limpiador: 'Limpiador', aceite: 'Aceite', crema: 'Crema',
}
const BADGE_LABELS: Record<string, string> = {
  new: 'Nuevo', best: 'Best-seller', lim: 'Edición limitada',
}
const BADGE_CLASSES: Record<string, string> = {
  new: 'bg-brand-600 text-cream-100',
  best: 'bg-terra-500 text-white',
  lim: 'bg-carbon-900 text-cream-100',
}
const STRIPE_BY_TIPO: Record<string, string> = {
  limpiador: '#83a886', serum: '#c4876a', aceite: '#2c472f', crema: '#d49070',
}

function PackSVG({ id, vol, stripe, name, code }: { id: string; vol: string; stripe: string; name: string; code: string }) {
  return (
    <svg className="w-[76%]" viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`ptop-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ede9e0" />
        </linearGradient>
        <linearGradient id={`pfront-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf8f1" />
          <stop offset="1" stopColor="#ede9e0" />
        </linearGradient>
        <linearGradient id={`pside-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d6cdb8" />
          <stop offset="1" stopColor="#b9ae93" />
        </linearGradient>
        <filter id={`psh-${id}`} x="-15%" y="-15%" width="130%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
          <feOffset dx="0" dy="20" />
          <feComponentTransfer><feFuncA type="linear" slope="0.18" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g filter={`url(#psh-${id})`}>
        <path d="M 320 105 L 380 75 L 380 235 L 320 265 Z" fill={`url(#pside-${id})`} />
        <path d="M 60 105 L 320 105 L 380 75 L 120 75 Z" fill={`url(#ptop-${id})`} opacity="0.86" />
        <circle cx="345" cy="92" r="6" fill="none" stroke="#9a8c70" strokeWidth="0.6" />
        <text x="345" y="94.5" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="5.5" fill="#9a8c70">{vol.replace(/ /g, '')}</text>
        <path d="M 60 105 L 320 105 L 320 265 L 60 265 Z" fill={`url(#pfront-${id})`} stroke="#cfc4a8" strokeWidth="0.5" />
        <path d="M 300 105 L 320 105 L 320 265 L 300 265 Z" fill="#000" opacity="0.04" />
        <text x="190" y="148" textAnchor="middle" fontFamily="Playfair Display, serif" fontWeight="700" fontSize="26" fill="#1e1e1e" letterSpacing="4">QUEVI</text>
        <line x1="148" y1="158" x2="232" y2="158" stroke="#9a8c70" strokeWidth="0.5" />
        <text x="190" y="172" textAnchor="middle" fontFamily="Playfair Display, serif" fontStyle="italic" fontSize="11" fill="#2c472f" letterSpacing="2">Dall&apos;O Skin</text>
        <text x="190" y="188" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" letterSpacing="2.5" fill="#7a6a52">CLINICAL COSMETICS · BARCELONA</text>
        <rect x="78" y="230" width="76" height="6" fill={stripe} />
        <text x="78" y="252" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="11" letterSpacing="2.5" fill="#1e1e1e">{name.toUpperCase().slice(0, 22)}</text>
        <text x="78" y="262" fontFamily="Inter, sans-serif" fontSize="6" letterSpacing="1.6" fill="#7a6a52">{code}</text>
        <line x1="320" y1="105" x2="320" y2="265" stroke="#000" strokeOpacity="0.06" strokeWidth="0.5" />
      </g>
    </svg>
  )
}

function priceFmt(n: number) {
  if (n === 0) return 'Consultar'
  return n.toFixed(2).replace('.', ',').replace(/,00$/, '') + ' €'
}

export default function ProductsPreview() {
  const { ref, isInView } = useScrollAnimation()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      if (!supabase) {
        setProducts(FALLBACK_PRODUCTS)
        setLoading(false)
        return
      }
      try {
        // Get category IDs for skin lines
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: cats, error: catsErr } = await (supabase as any)
          .from('categories')
          .select('id, slug')
          .in('slug', ['limpiadores', 'serums', 'aceites'])

        if (catsErr || !cats || cats.length === 0) {
          setProducts(FALLBACK_PRODUCTS)
          setLoading(false)
          return
        }

        const catIds = (cats as Array<{ id: string; slug: string }>).map((c) => c.id)

        const { data, error } = await supabase
          .from('products')
          .select(`id, name, slug, volume_ml, image_url, product_variants (price_cents, compare_at_cents, is_default, active)`)
          .eq('active', true)
          .in('category_id', catIds)
          .order('featured', { ascending: false })
          .limit(6)

        if (error || !data) {
          setProducts(FALLBACK_PRODUCTS)
          setLoading(false)
          return
        }

        const mapped: Product[] = (data as Array<{
          id: string; name: string; slug: string; volume_ml: number | null; image_url: string | null
          product_variants: Array<{ price_cents: number; compare_at_cents: number | null; is_default: boolean; active: boolean }>
        }>).map((p) => {
          const defaultVariant = p.product_variants?.find((v) => v.is_default && v.active)
            ?? p.product_variants?.find((v) => v.active)
          const price = defaultVariant ? defaultVariant.price_cents / 100 : 0
          const was = defaultVariant?.compare_at_cents ? defaultVariant.compare_at_cents / 100 : null
          const tipo = p.slug.includes('mousse') || p.slug.includes('limpi') ? 'limpiador'
            : p.slug.includes('oil') || p.slug.includes('aceite') ? 'aceite'
            : 'serum'
          return {
            id: p.id, slug: p.slug, name: p.name,
            vol: p.volume_ml ? `${p.volume_ml} ml` : '—',
            price, was, badge: null,
            stripe: STRIPE_BY_TIPO[tipo] ?? '#83a886',
            tipo, code: p.slug.toUpperCase().slice(0, 10),
            image_url: p.image_url ?? null,
          }
        })

        setProducts(mapped.length > 0 ? mapped : FALLBACK_PRODUCTS)
      } catch {
        setProducts(FALLBACK_PRODUCTS)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const displayProducts = products.slice(0, 6)

  return (
    <section className="bg-cream-200 py-24 border-t border-cream-400">
      <div ref={ref} className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-9">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            <motion.span variants={fadeUp} className="text-[11px] tracking-[0.32em] uppercase text-carbon-400 block mb-4">
              — Cosmética médica de precisión
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-serif font-normal leading-[1] tracking-[-0.018em] m-0 text-carbon-900"
              style={{ fontSize: 'clamp(38px, 4.8vw, 68px)' }}
            >
              Dall&apos;O <em className="italic text-brand-600">Skin</em>
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-[22px] py-3 text-carbon-900 rounded-full font-medium text-[13px] tracking-[0.02em] border border-carbon-300 bg-transparent transition-all duration-200 hover:bg-cream-300 hover:-translate-y-0.5 active:scale-[0.97] will-change-transform whitespace-nowrap"
              style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
            >
              Ver toda la tienda
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Product grid */}
        {loading ? (
          <div className="grid gap-[14px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-cream-300 animate-pulse" style={{ aspectRatio: '3/4' }} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid gap-[14px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          >
            {displayProducts.map((p) => (
              <motion.div key={p.id} variants={fadeUp}>
                <Link
                  href={`/shop#${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-cream-400 bg-cream-100 overflow-hidden transition-all duration-300 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-100/40 hover:-translate-y-1 will-change-transform"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                >
                  {/* Product image */}
                  <div className="relative bg-cream-100" style={{ aspectRatio: '1/1' }}>
                    {p.badge && (
                      <span className={`absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-[0.06em] ${BADGE_CLASSES[p.badge] ?? 'bg-carbon-200 text-carbon-700'}`}>
                        {BADGE_LABELS[p.badge] ?? p.badge}
                      </span>
                    )}
                    {p.image_url ? (
                      <Image
                        src={p.image_url}
                        alt={p.name}
                        fill
                        className="object-contain p-5 group-hover:-translate-y-1 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                        style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PackSVG id={p.id} vol={p.vol} stripe={p.stripe} name={p.name} code={p.code} />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1 px-4 pb-5 pt-2">
                    <span className="text-[10px] tracking-[0.18em] uppercase font-medium" style={{ color: p.stripe }}>
                      {TIPO_LABELS[p.tipo] ?? p.tipo}
                    </span>
                    <h3 className="font-serif font-medium text-[14px] text-carbon-900 leading-[1.3] m-0">
                      {p.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-serif text-[15px] text-carbon-900">
                        {priceFmt(p.price)}
                      </span>
                      {p.was && (
                        <span className="text-[12px] text-carbon-400 line-through">
                          {priceFmt(p.was)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
