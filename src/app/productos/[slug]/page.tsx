export const revalidate = 60

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductActions from '@/components/ProductActions'
import ProductGrid from '@/components/ProductGrid'
import { getProductBySlug, getProducts, formatPrice, getDefaultVariant } from '@/lib/products'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}

  const defaultVariant = getDefaultVariant(product)
  const price = defaultVariant ? formatPrice(defaultVariant.price_cents) : ''
  const description =
    product.tagline ??
    product.description?.slice(0, 155) ??
    `${product.name} — Dall'Ó Selfcare`

  return {
    title: `${product.name}${price ? ` — ${price}` : ''} | Dall'Ó Selfcare`,
    description,
    openGraph: {
      title: `${product.name} | Dall'Ó Selfcare`,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/productos/${slug}`,
      images: product.image_url ? [{ url: product.image_url, alt: product.name }] : [],
      type: 'website',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/productos/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
  ])

  if (!product) notFound()

  const defaultVariant = getDefaultVariant(product)
  if (!defaultVariant) notFound()

  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 4)
  const priceFormatted = formatPrice(defaultVariant.price_cents)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? product.tagline ?? undefined,
    image: product.image_url ?? undefined,
    brand: { '@type': 'Brand', name: "Dall'Ó" },
    offers: {
      '@type': 'Offer',
      price: (defaultVariant.price_cents / 100).toFixed(2),
      priceCurrency: 'EUR',
      availability:
        defaultVariant.stock_quantity === 0
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      url: `${siteUrl}/productos/${product.slug}`,
    },
  }

  const nutritional = product.nutritional_info
  const hasNutritional = nutritional?.items && nutritional.items.length > 0

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnnouncementBar />
      <Navbar />

      <main className="min-h-screen bg-white">

        {/* ── Product hero: full-bleed 2-col ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[90vh]">

          {/* LEFT: info */}
          <div className="flex flex-col justify-center px-10 py-16 lg:px-20 xl:px-24 bg-white order-2 md:order-1">

            {/* Breadcrumb */}
            {product.categories && (
              <nav className="mb-8 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-text-muted">
                <Link href="/productos" className="hover:text-cocoa-900 transition-colors">
                  Todos los productos
                </Link>
                <span className="opacity-40">|</span>
                <Link
                  href={`/coleccion/${product.categories.slug}`}
                  className="hover:text-cocoa-900 transition-colors"
                >
                  {product.categories.name}
                </Link>
              </nav>
            )}

            {/* Name */}
            <h1 className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-light text-cocoa-900 leading-none tracking-wide mb-4">
              {product.name}
            </h1>

            {/* Tagline */}
            {product.tagline && (
              <p className="text-xs tracking-[0.15em] uppercase text-text-muted mb-6 max-w-xs leading-relaxed">
                {product.tagline}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-xl text-cocoa-900">{priceFormatted}</span>
              {defaultVariant.compare_at_cents &&
                defaultVariant.compare_at_cents > defaultVariant.price_cents && (
                  <span className="text-sm text-text-muted line-through">
                    {formatPrice(defaultVariant.compare_at_cents)}
                  </span>
                )}
            </div>
            <p className="text-[11px] text-text-muted tracking-wide mb-10">
              Envío calculado en el pago
            </p>

            {/* Variant selector + qty + add to cart */}
            <div className="max-w-sm">
              <ProductActions product={product} defaultVariant={defaultVariant} />
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-10 border-t border-sand-300 pt-8 max-w-sm">
                <p className="text-sm text-text leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Details grid */}
            <div className="mt-8 space-y-5 max-w-sm">
              {product.ingredients && (
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-text-muted mb-1">Ingredientes</p>
                  <p className="text-xs text-text leading-relaxed">{product.ingredients}</p>
                </div>
              )}
              {product.usage_instructions && (
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-text-muted mb-1">Modo de uso</p>
                  <p className="text-xs text-text leading-relaxed">{product.usage_instructions}</p>
                </div>
              )}
              {(product.net_weight ?? product.volume_ml) && (
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-text-muted mb-1">Peso neto</p>
                  <p className="text-xs text-text">
                    {product.net_weight ?? `${product.volume_ml} ml`}
                  </p>
                </div>
              )}
            </div>

            {/* Nutritional table */}
            {hasNutritional && (
              <div className="mt-10 border border-sand-400 max-w-sm">
                <div className="grid grid-cols-3 bg-cocoa-900 text-sand-100 text-[9px] tracking-[0.12em] uppercase px-3 py-2 gap-2">
                  <span>Información nutricional</span>
                  <span className="text-center">Por toma / Perserving</span>
                  <span className="text-right">%VRN* NRV*</span>
                </div>
                {nutritional!.serving && (
                  <div className="px-3 py-2 border-b border-sand-300">
                    <span className="text-[11px] text-text">Servicio/Serving: {nutritional!.serving}</span>
                  </div>
                )}
                {nutritional!.items!.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-3 px-3 py-2 border-b border-sand-300 last:border-0 text-xs text-text gap-2"
                  >
                    <span>{row.name}</span>
                    <span className="text-center">{row.amount}</span>
                    <span className="text-right">{row.nrv ?? '—'}</span>
                  </div>
                ))}
                <p className="px-3 py-2 text-[10px] text-text-muted">
                  *VRN=Valor de referencia de nutrientes / NRV=Nutrient reference value
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: image — full-bleed, no padding */}
          <div className="relative min-h-[60vw] md:min-h-0 bg-sand-200 order-1 md:order-2">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-text-muted text-sm">Sin imagen</span>
              </div>
            )}
          </div>
        </section>

        {/* ── Editorial strip ── */}
        <section className="flex flex-col md:flex-row border-t border-sand-300" style={{ minHeight: '440px' }}>
          <div className="flex-1 relative min-h-[320px] md:min-h-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=900&q=80"
              alt="Dall'Ó lifestyle"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center items-start px-12 py-16 lg:px-20 bg-white">
            <p className="font-cormorant text-3xl md:text-4xl font-light text-cocoa-900 leading-snug max-w-xs italic">
              Cuida tu cuerpo, realza tu belleza, siéntete increíble cada día.
            </p>
          </div>
        </section>

        {/* ── Ticker marquee ── */}
        <div className="w-full bg-cocoa-900 py-3.5 overflow-hidden">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: 'marquee 24s linear infinite' }}
          >
            {[0, 1].map((i) => (
              <span key={i} className="flex items-center">
                {['Alchemy and longevity', 'Longevidad en salud', 'Supplementing with science'].map(
                  (text, j) => (
                    <span key={j} className="flex items-center">
                      <span className="text-sand-100 text-[11px] tracking-[0.3em] uppercase mx-10">
                        {text}
                      </span>
                      <span className="text-gold text-xs opacity-60">·</span>
                    </span>
                  )
                )}
              </span>
            ))}
          </div>
        </div>

        {/* ── Full-width editorial image ── */}
        <div className="relative w-full overflow-hidden" style={{ height: 'min(58vw, 680px)' }}>
          <Image
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1800&q=80"
            alt="Dall'Ó — ciencia y longevidad"
            fill
            className="object-cover object-[center_30%]"
            sizes="100vw"
          />
        </div>

        {/* ── Related products ── */}
        <div className="bg-sand-50">
          <ProductGrid products={related} title="Todos los productos" showViewAll />
        </div>
      </main>

      <Footer />
    </>
  )
}
