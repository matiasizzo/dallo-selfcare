import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Dall'Ó Selfcare — Alchemy and Longevity",
  description: 'Suplementos de longevidad y cosmética de alta calidad. Supplementing with science.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
