'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="w-full flex flex-col md:flex-row min-h-[580px]">
      {/* Left: text */}
      <motion.div
        className="flex-1 bg-sand-100 flex flex-col justify-center px-12 py-16 md:py-24 md:px-16 lg:px-24"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-light text-cocoa-900 leading-tight mb-4"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          Alchemy and
          <br />
          Longevity
        </h1>
        <p className="text-sm text-text-muted tracking-wider mb-10 font-sans font-light">
          Supplementing with science
        </p>
        <Link
          href="/productos"
          className="inline-block border border-cocoa-900 text-cocoa-900 text-xs tracking-[0.2em] uppercase px-8 py-3 font-sans hover:bg-cocoa-900 hover:text-sand-100 transition-colors duration-300 w-fit"
        >
          Comprar ahora
        </Link>
      </motion.div>

      {/* Right: image */}
      <motion.div
        className="flex-1 relative min-h-[360px] md:min-h-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=900&q=85"
          alt="Dall'Ó — Alchemy and Longevity"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>
    </section>
  )
}
