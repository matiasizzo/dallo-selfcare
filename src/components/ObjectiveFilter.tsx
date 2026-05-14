'use client'

import { useState } from 'react'
import type { Product } from '@/lib/supabase'
import ProductGrid from '@/components/ProductGrid'

const OBJECTIVES = [
  { label: 'Anti-aging',   slugs: ['skin', 'senolytic'] },
  { label: 'Energía',      slugs: ['energy'] },
  { label: 'Metabolismo',  slugs: ['metabolism'] },
  { label: 'Detox',        slugs: ['balance', 'protection'] },
]

interface Props {
  products: Product[]
}

export default function ObjectiveFilter({ products }: Props) {
  const [active, setActive] = useState<string | null>(null)

  const filtered = active
    ? products.filter(p => {
        const obj = OBJECTIVES.find(o => o.label === active)
        return obj?.slugs.includes(p.categories?.slug ?? '')
      })
    : []

  return (
    <section className="bg-cream pt-12 pb-4">
      {/* Filter bar */}
      <div className="px-6 mb-6">
        <p className="text-[10px] tracking-[0.25em] uppercase text-text-muted mb-4">
          Encuentra tu objetivo →
        </p>
        <div className="flex flex-wrap gap-2">
          {OBJECTIVES.map(({ label }) => (
            <button
              key={label}
              onClick={() => setActive(active === label ? null : label)}
              className={`px-4 py-2 rounded-full text-[12px] tracking-[0.04em] border transition-all duration-200 ${
                active === label
                  ? 'bg-cocoa-900 text-sand-100 border-cocoa-900'
                  : 'bg-transparent text-ink border-line-soft hover:border-cocoa-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Products — only visible when a filter is active */}
      {active && filtered.length > 0 && (
        <ProductGrid
          products={filtered}
          title={active}
          showViewAll={false}
        />
      )}
    </section>
  )
}
