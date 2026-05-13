'use client'

import { type Product } from '@/lib/products'
import ProductCarousel from './ProductCarousel'

interface Props {
  skinProducts: Product[]
  nutriProducts: Product[]
}

export default function ProductCarousels({ skinProducts, nutriProducts }: Props) {
  return (
    <>
      <div className="border-t border-line-soft">
        <ProductCarousel
          products={skinProducts}
          eyebrow="Línea I · Topical"
          title="Dallo Skin"
          viewAllHref="/coleccion/skin"
          viewAllLabel="Ver Dallo Skin"
        />
      </div>
      <div className="border-t border-line-soft">
        <ProductCarousel
          products={nutriProducts}
          eyebrow="Línea II · Internal"
          title="Dallo Nutri"
          viewAllHref="/coleccion/nutri"
          viewAllLabel="Ver Dallo Nutri"
        />
      </div>
    </>
  )
}
