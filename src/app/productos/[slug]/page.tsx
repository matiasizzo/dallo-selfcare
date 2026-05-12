import { notFound } from 'next/navigation'
import Image from 'next/image'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getProductBySlug, LINE_COLORS, formatPrice, getDefaultVariant } from '@/lib/products'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} — Dall'Ó Selfcare`,
    description: product.tagline ?? product.description ?? undefined,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const category = product.categories
  const lineColor = LINE_COLORS[category?.slug ?? ''] ?? '#C9A96E'
  const defaultVariant = getDefaultVariant(product)
  const activeVariants = (product.product_variants ?? []).filter((v) => v.active)

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen bg-sand-200">
        <div className="max-w-screen-xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Image */}
            <div className="relative aspect-square bg-sand-300 overflow-hidden">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-text-muted text-sm font-sans">Sin imagen</span>
                </div>
              )}
              {/* Line color bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ backgroundColor: lineColor }} />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              {category && (
                <p className="text-xs tracking-[0.2em] uppercase text-text-muted font-sans mb-3">
                  {category.name}
                </p>
              )}
              <h1
                className="text-4xl md:text-5xl font-light text-cocoa-900 mb-3 leading-tight"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {product.name}
              </h1>
              {product.tagline && (
                <p className="text-base text-text-muted font-sans font-light mb-6">{product.tagline}</p>
              )}

              {/* Price */}
              {defaultVariant && (
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-xl font-sans text-cocoa-900">
                    {formatPrice(defaultVariant.price_cents)}
                  </span>
                  {defaultVariant.compare_at_cents && defaultVariant.compare_at_cents > defaultVariant.price_cents && (
                    <span className="text-sm font-sans text-text-muted line-through">
                      {formatPrice(defaultVariant.compare_at_cents)}
                    </span>
                  )}
                </div>
              )}

              {/* Variants */}
              {activeVariants.length > 1 && (
                <div className="mb-8">
                  <p className="text-xs tracking-widest uppercase text-text-muted font-sans mb-3">Formato</p>
                  <div className="flex flex-wrap gap-2">
                    {activeVariants.map((v) => (
                      <button
                        key={v.id}
                        className="border border-sand-400 px-4 py-2 text-xs font-sans text-text hover:border-cocoa-900 transition-colors"
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to cart */}
              <button
                className="w-full border border-cocoa-900 bg-cocoa-900 text-sand-100 text-xs tracking-[0.2em] uppercase py-4 font-sans hover:bg-cocoa-800 transition-colors mb-4"
              >
                Añadir al carrito
              </button>

              {/* Description */}
              {product.description && (
                <div className="mt-10 border-t border-sand-300 pt-8">
                  <p className="text-sm font-sans text-text leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Details grid */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {product.dosage && (
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-text-muted font-sans mb-1">Dosis</p>
                    <p className="text-xs font-sans text-text">{product.dosage}</p>
                  </div>
                )}
                {product.frequency && (
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-text-muted font-sans mb-1">Frecuencia</p>
                    <p className="text-xs font-sans text-text">{product.frequency}</p>
                  </div>
                )}
                {product.volume_ml && (
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-text-muted font-sans mb-1">Volumen</p>
                    <p className="text-xs font-sans text-text">{product.volume_ml} ml</p>
                  </div>
                )}
                {product.shelf_life_months && (
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-text-muted font-sans mb-1">Caducidad</p>
                    <p className="text-xs font-sans text-text">{product.shelf_life_months} meses</p>
                  </div>
                )}
              </div>

              {/* Ingredients */}
              {product.ingredients && (
                <div className="mt-8 border-t border-sand-300 pt-8">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-text-muted font-sans mb-2">Ingredientes</p>
                  <p className="text-xs font-sans text-text leading-relaxed">{product.ingredients}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
