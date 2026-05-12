'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface Collection {
  id: string
  label: string
  slug: string
  image: string
}

const COLLECTIONS: Collection[] = [
  {
    id: 'balance',
    label: 'Línea Balance',
    slug: 'balance',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=75',
  },
  {
    id: 'energy',
    label: 'Línea Energy',
    slug: 'energy',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=75',
  },
  {
    id: 'metabolism',
    label: 'Línea Metabolism',
    slug: 'metabolism',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=75',
  },
  {
    id: 'protection',
    label: 'Línea Protection',
    slug: 'protection',
    image: 'https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?w=600&q=75',
  },
  {
    id: 'senolytic',
    label: 'Línea Senolytic',
    slug: 'senolytic',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=75',
  },
  {
    id: 'nutri',
    label: 'Todos los productos Dall\'Ó Nutri',
    slug: 'nutri',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=75',
  },
]

function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <Link href={`/coleccion/${collection.slug}`} className="group block relative">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={collection.image}
            alt={collection.label}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-cocoa-900/10 group-hover:bg-cocoa-900/20 transition-colors duration-300" />
        </div>
        <p className="mt-3 text-xs tracking-[0.15em] uppercase text-text font-sans text-center">
          {collection.label}
        </p>
      </Link>
    </motion.div>
  )
}

export default function Collections() {
  return (
    <section className="w-full py-16 px-6 bg-sand-100">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          {COLLECTIONS.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  )
}
