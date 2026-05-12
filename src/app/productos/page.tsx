import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductGrid from '@/components/ProductGrid'
import { getProducts } from '@/lib/products'

export const metadata = {
  title: "Todos los productos — Dall'Ó Selfcare",
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 pt-16 pb-4">
          <h1
            className="font-cormorant text-5xl font-light text-cocoa-900"
          >
            Todos los productos
          </h1>
        </div>
        <ProductGrid products={products} showViewAll={false} title="" />
      </main>
      <Footer />
    </>
  )
}
