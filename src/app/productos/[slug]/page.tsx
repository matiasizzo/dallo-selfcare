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
import ProductAccordion from '@/components/ProductAccordion'
import CrossSellBox from '@/components/CrossSellBox'
import type { AccordionItem } from '@/components/ProductAccordion'
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

const SKIN_SLUGS = ['skin']

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
  ])

  if (!product) notFound()

  const defaultVariant = getDefaultVariant(product)
  if (!defaultVariant) notFound()

  const isSkin = SKIN_SLUGS.includes(product.categories?.slug ?? '')

  // Related: same category, exclude current
  const related = allProducts
    .filter((p) => p.id !== product.id && p.categories?.slug === product.categories?.slug)
    .slice(0, 4)

  // Cross-sell: one product from the opposite line
  const crossSell = allProducts.find((p) =>
    p.id !== product.id &&
    getDefaultVariant(p) !== undefined &&
    (getDefaultVariant(p)?.price_cents ?? 0) > 0 &&
    (isSkin
      ? p.categories?.slug !== 'skin'
      : p.categories?.slug === 'skin')
  ) ?? null

  const sectionTitle = isSkin ? 'Otros Dallo Skin' : 'Otros Dallo Nutri'
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

  // Build accordion items — only sections with actual content
  const accordionItems: AccordionItem[] = []
  if (product.description) {
    accordionItems.push({ label: 'Descripción & Beneficios', content: product.description })
  }
  if (isSkin && product.dosage) {
    accordionItems.push({ label: 'Indicaciones', content: product.dosage })
  }
  if (product.ingredients) {
    accordionItems.push({ label: 'Ingredientes', content: product.ingredients })
  }
  if (isSkin) {
    if (product.usage_instructions) {
      accordionItems.push({ label: 'Modo de uso', content: product.usage_instructions })
    }
  } else {
    const usageParts = [product.usage_instructions, product.dosage, product.frequency].filter(Boolean) as string[]
    if (usageParts.length > 0) {
      accordionItems.push({ label: 'Modo de uso', content: usageParts.join('\n') })
    }
  }
  const nutritional = product.nutritional_info
  const hasNutritional = nutritional?.items && nutritional.items.length > 0
  if (hasNutritional) {
    const rows = nutritional!.items!.map(r => `${r.name}: ${r.amount}${r.nrv ? ` (${r.nrv}%VRN)` : ''}`).join('\n')
    const nutText = nutritional!.serving ? `Servicio: ${nutritional!.serving}\n${rows}` : rows
    accordionItems.push({ label: 'Información nutricional', content: nutText })
  }
  const storageParts = [
    product.storage,
    product.shelf_life_months ? `Caducidad: ${product.shelf_life_months} meses tras apertura` : null,
  ].filter(Boolean) as string[]
  if (storageParts.length > 0) {
    accordionItems.push({ label: 'Conservación & Caducidad', content: storageParts.join('\n') })
  }
  if (isSkin && product.frequency) {
    accordionItems.push({ label: 'Precauciones', content: product.frequency })
  }

  const crossSellVariant = crossSell ? getDefaultVariant(crossSell) : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnnouncementBar />
      <Navbar />

      <main className="min-h-screen bg-cream">

        {/* ── PDP: imagen izquierda sticky / info derecha ── */}
        <section className="flex flex-col md:flex-row">

          {/* IMAGEN — arriba en móvil, columna izquierda sticky en desktop */}
          <div className="md:w-1/2 md:sticky md:top-16 md:self-start">
            <div className="relative w-full aspect-square bg-sand-100">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-contain p-10 md:p-16"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-text-muted text-sm">Sin imagen</span>
                </div>
              )}
            </div>
          </div>

          {/* INFO — debajo en móvil, columna derecha en desktop */}
          <div className="md:w-1/2 flex flex-col px-8 py-12 lg:px-14 xl:px-20 bg-cream">

            {/* Breadcrumb */}
            {product.categories && (
              <nav className="mb-8 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-text-muted">
                <Link href="/productos" className="hover:text-cocoa-900 transition-colors">
                  Todos los productos
                </Link>
                <span className="opacity-40">/</span>
                <Link
                  href={`/coleccion/${product.categories.slug}`}
                  className="hover:text-cocoa-900 transition-colors"
                >
                  {product.categories.name}
                </Link>
              </nav>
            )}

            {/* Nombre */}
            <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light text-cocoa-900 leading-none tracking-wide mb-4">
              {product.name}
            </h1>

            {/* Tagline */}
            {product.tagline && (
              <p className="text-xs tracking-[0.15em] uppercase text-text-muted mb-4 leading-relaxed">
                {product.tagline}
              </p>
            )}

            {/* Peso / Volumen */}
            {(product.net_weight ?? product.volume_ml) && (
              <p className="text-[11px] text-text-muted tracking-wide mb-4">
                {product.net_weight ?? `${product.volume_ml} ml`}
              </p>
            )}

            {/* Precio */}
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

            {/* Variante + cantidad + añadir al carrito */}
            <ProductActions product={product} defaultVariant={defaultVariant} />

            {/* Acordeones de detalle */}
            {accordionItems.length > 0 && (
              <div className="mt-10">
                <ProductAccordion items={accordionItems} />
              </div>
            )}

            {/* ── Cross-sell: Completa tu ritual ── */}
            {crossSell && crossSellVariant && (
              <CrossSellBox
                currentProduct={product}
                crossSell={crossSell}
                crossSellVariant={crossSellVariant}
                isSkin={isSkin}
              />
            )}
          </div>
        </section>

        {/* ── Productos relacionados ── */}
        {related.length > 0 && (
          <div className="bg-sand-50">
            <ProductGrid products={related} title={sectionTitle} showViewAll={false} />
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
