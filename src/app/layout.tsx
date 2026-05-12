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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dallo-selfcare.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dall'Ó Selfcare — Longevidad en salud",
    template: "%s | Dall'Ó Selfcare",
  },
  description: "Suplementación de precisión y cosmética de alto rendimiento. Ciencia aplicada al bienestar y la longevidad.",
  keywords: ['suplementos longevidad', 'cosmética lujo', 'bienestar', 'longevidad', 'dall o selfcare'],
  authors: [{ name: "Dall'Ó Selfcare" }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: "Dall'Ó Selfcare",
    title: "Dall'Ó Selfcare — Longevidad en salud",
    description: "Suplementación de precisión y cosmética de alto rendimiento.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dall'Ó Selfcare",
    description: "Suplementación de precisión y cosmética de alto rendimiento.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
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
