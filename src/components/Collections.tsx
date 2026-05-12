'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Collection {
  id: string
  label: string
  sublabel: string
  slug: string
  image: string
}

const COLLECTIONS: Collection[] = [
  {
    id: 'nutri',
    label: 'Dall\'Ó Nutri',
    sublabel: 'Suplementación de precisión',
    slug: 'nutri',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=85',
  },
  {
    id: 'skin',
    label: 'Dall\'Ó Skin',
    sublabel: 'Cosmética de alto rendimiento',
    slug: 'skin',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=85',
  },
  {
    id: 'balance',
    label: 'Balance',
    sublabel: 'Equilibrio y bienestar',
    slug: 'balance',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=85',
  },
  {
    id: 'energy',
    label: 'Energy',
    sublabel: 'Vitalidad y rendimiento',
    slug: 'energy',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=85',
  },
]

export default function Collections() {
  return (
    <section className="w-full py-24 px-8 bg-white border-t border-sand-300">
      <div className="max-w-screen-xl mx-auto">

        <div className="flex items-end justify-between mb-12">
          <h2 className="font-cormorant text-4xl font-light text-cocoa-900">Nuestras líneas</h2>
          <Link href="/productos" className="text-[11px] tracking-[0.2em] uppercase text-text-muted hover:text-cocoa-900 transition-colors">
            Ver todo
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-sand-300">
          {COLLECTIONS.map((col) => (
            <Link key={col.id} href={`/coleccion/${col.slug}`} className="group block bg-white overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={col.image}
                  alt={col.label}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-cocoa-900/0 group-hover:bg-cocoa-900/10 transition-colors duration-500" />
              </div>
              <div className="px-4 py-5">
                <p className="text-[11px] tracking-[0.2em] uppercase text-cocoa-900 mb-1">{col.label}</p>
                <p className="text-xs text-text-muted">{col.sublabel}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
