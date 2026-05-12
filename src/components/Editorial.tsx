'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const blocks = [
  {
    id: 1,
    title: 'Longevidad es salud',
    body: 'Nuestro compromiso con la excelencia se refleja en cada detalle.',
    image: 'https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?w=800&q=80',
    imageAlt: 'Gold capsules — longevidad',
    reverse: false,
  },
  {
    id: 2,
    title: 'Alchemy and Longevity',
    body: 'Supplementing with science',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    imageAlt: 'Dall\'Ó model',
    reverse: true,
  },
]

interface Block {
  id: number
  title: string
  body: string
  image: string
  imageAlt: string
  reverse: boolean
}

function EditorialBlock({ block }: { block: Block }) {
  const textSide = (
    <motion.div
      className="flex-1 flex flex-col justify-center px-12 py-16 lg:px-20 bg-sand-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h2
        className="text-3xl md:text-4xl font-light text-cocoa-900 mb-4 leading-snug"
        style={{ fontFamily: 'var(--font-cormorant)' }}
      >
        {block.title}
      </h2>
      <p className="text-sm text-text-muted font-sans font-light leading-relaxed max-w-xs">
        {block.body}
      </p>
    </motion.div>
  )

  const imageSide = (
    <motion.div
      className="flex-1 relative min-h-[320px] overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
    >
      <Image
        src={block.image}
        alt={block.imageAlt}
        fill
        className="object-cover object-center"
      />
    </motion.div>
  )

  return (
    <div className="flex flex-col md:flex-row border-b border-sand-300">
      {block.reverse ? (
        <>
          {imageSide}
          {textSide}
        </>
      ) : (
        <>
          {textSide}
          {imageSide}
        </>
      )}
    </div>
  )
}

export default function Editorial() {
  return (
    <section className="w-full">
      {blocks.map((block) => (
        <EditorialBlock key={block.id} block={block} />
      ))}
    </section>
  )
}
