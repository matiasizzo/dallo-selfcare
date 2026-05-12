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
      images: product.image_url
        ? [{ url: product.image_url, alt: product.name }]
        : [],
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
  const priceCents = defaultVariant.price_cents
  const priceFormatted = formatPrice(priceCents)
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
      price: (priceCents / 100).toFixed(2),
      priceCurrency: 'EUR',
      availability:
        defaultVariant.stock_quantity === 0
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      url: `${siteUrl}/productos/${product.slug}`,
    },
  }

  const nutritional = product.nutritional_info
  const hasNutritional =
    nutritional && nutritional.items && nutritional.items.length > 0

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnnouncementBar />
      <Navbar />

      <main className="min-h-screen bg-sand-50">
        {/* ── Product hero ── */}
        <section className="bg-sand-50">
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
            {/* Left: info */}
            <div className="flex flex-col justify-center px-8 py-16 md:px-14 lg:px-20 order-2 md:order-1">
              {product.categories && (
                <nav className="mb-6 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-text-muted font-sans">
                  <Link href="/productos" className="hover:text-cocoa-900 transition-colors">
                    Todos los productos
                  </Link>
                  <span>/</span>
                  <Link
                    href={`/coleccion/${product.categories.slug}`}
                    className="hover:text-cocoa-900 transition-colors"
                  >
                    {product.categories.name}
                  </Link>
                </nav>
              )}

              <h1
                className="text-4xl md:text-5xl font-light text-cocoa-900 mb-3 leading-tight"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {product.name}
              </h1>

              <div className="mb-1">
                <span className="text-lg font-sans text-cocoa-900">{priceFormatted}</span>
              </div>
              <p className="text-[11px] text-text-muted font-sans mb-8 tracking-wide">
                Envío calculado en el pago
              </p>

              <ProductActions product={product} defaultVariant={defaultVariant} />

              {/* Description */}
              {product.description && (
                <div className="mt-8 border-t border-sand-300 pt-6">
                  <p className="text-sm font-sans text-text leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Ingredients */}
              {product.ingredients && (
                <div className="mt-6">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-text-muted font-sans mb-1">
                    Ingredientes
                  </p>
                  <p className="text-xs font-sans text-text leading-relaxed">
                    {product.ingredients}
                  </p>
                </div>
              )}

              {/* Usage */}
              {product.usage_instructions && (
                <div className="mt-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-text-muted font-sans mb-1">
                    Modo de uso
                  </p>
                  <p className="text-xs font-sans text-text leading-relaxed">
                    {product.usage_instructions}
                  </p>
                </div>
              )}

              {/* Net weight / volume */}
              {(product.net_weight ?? product.volume_ml) && (
                <div className="mt-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-text-muted font-sans mb-1">
                    Peso neto
                  </p>
                  <p className="text-xs font-sans text-text">
                    {product.net_weight ?? `${product.volume_ml} ml`}
                  </p>
                </div>
              )}

              {/* Nutritional table */}
              {hasNutritional && (
                <div className="mt-8 border border-sand-400">
                  <div className="grid grid-cols-3 bg-cocoa-900 text-sand-100 text-[10px] tracking-[0.1em] uppercase font-sans px-3 py-2 gap-2">
                    <span>Información nutricional</span>
                    <span className="text-center">Por toma / Perserving</span>
                    <span className="text-right">%VRN* NRV*</span>
                  </div>
                  {nutritional.serving && (
                    <div className="px-3 py-2 border-b border-sand-300">
                      <span className="text-[11px] font-sans text-text">
                        Servicio/Serving: {nutritional.serving}
                      </span>
                    </div>
                  )}
                  {nutritional.items!.map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-3 px-3 py-2 border-b border-sand-300 last:border-0 text-xs font-sans text-text gap-2"
                    >
                      <span>{row.name}</span>
                      <span className="text-center">{row.amount}</span>
                      <span className="text-right">{row.nrv ?? '—'}</span>
                    </div>
                  ))}
                  <p className="px-3 py-2 text-[10px] text-text-muted font-sans">
                    *VRN=Valor de referencia de nutrientes/NRV= Nutrient reference value
                  </p>
                </div>
              )}
            </div>

            {/* Right: image */}
            <div className="relative min-h-[50vw] md:min-h-0 bg-sand-200 order-1 md:order-2">
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
                  <span className="text-text-muted text-sm font-sans">Sin imagen</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Editorial strip ── */}
        <section className="flex flex-col md:flex-row min-h-[420px] border-t border-sand-300">
          <div className="flex-1 relative min-h-[320px] md:min-h-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=900&q=80"
              alt="Dall'Ó — longevidad y bienestar"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center px-12 py-16 bg-sand-50 text-center">
            <p
              className="text-2xl md:text-3xl font-light text-cocoa-900 leading-snug italic max-w-xs"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Cuida tu cuerpo, realza tu belleza,
              <br />
              siéntete increíble cada día.
            </p>
          </div>
        </section>

        {/* ── Ticker ── */}
        <div className="w-full bg-cocoa-900 py-3 overflow-hidden">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: 'marquee 22s linear infinite' }}
          >
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex items-center gap-10 mr-10">
                {['Alchemy and longevity', 'Longevidad en salud', 'Supplementing with science'].map(
                  (text) => (
                    <span
                      key={text}
                      className="text-sand-100 text-xs tracking-[0.25em] uppercase font-sans"
                    >
                      {text}
                    </span>
                  )
                )}
              </span>
            ))}
          </div>
        </div>

        {/* ── Full-width editorial image ── */}
        <div className="relative w-full h-[55vw] max-h-[680px] min-h-[320px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80"
            alt="Dall'Ó — ciencia y naturaleza"
            fill
            className="object-cover object-center"
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
