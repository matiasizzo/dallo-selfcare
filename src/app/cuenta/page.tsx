import { redirect } from 'next/navigation'
import Link from 'next/link'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import LogoutButton from './LogoutButton'

export const metadata = {
  title: "Mi cuenta — Dall'Ó Selfcare",
}

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/cuenta/login')

  const name = user.user_metadata?.full_name as string | undefined
  const email = user.email ?? ''

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen bg-sand-200">
        <div className="max-w-screen-xl mx-auto px-6 py-16">
          <div className="max-w-2xl">
            <h1
              className="font-cormorant text-5xl font-light text-cocoa-900 mb-2"
            >
              {name ? `Hola, ${name.split(' ')[0]}` : 'Mi cuenta'}
            </h1>
            <p className="text-sm text-text-muted font-sans mb-12">{email}</p>

            {/* Nav grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <Link
                href="/cuenta/pedidos"
                className="border border-sand-300 bg-sand-100 p-6 hover:border-cocoa-600 transition-colors group"
              >
                <p
                  className="font-cormorant text-xl font-light text-cocoa-900 mb-1 group-hover:text-cocoa-600 transition-colors"
                >
                  Mis pedidos
                </p>
                <p className="text-xs text-text-muted font-sans">Historial y estado de envíos</p>
              </Link>

              <Link
                href="/cuenta/direcciones"
                className="border border-sand-300 bg-sand-100 p-6 hover:border-cocoa-600 transition-colors group"
              >
                <p
                  className="font-cormorant text-xl font-light text-cocoa-900 mb-1 group-hover:text-cocoa-600 transition-colors"
                >
                  Direcciones
                </p>
                <p className="text-xs text-text-muted font-sans">Gestiona tus direcciones de envío</p>
              </Link>

              <Link
                href="/cuenta/perfil"
                className="border border-sand-300 bg-sand-100 p-6 hover:border-cocoa-600 transition-colors group"
              >
                <p
                  className="font-cormorant text-xl font-light text-cocoa-900 mb-1 group-hover:text-cocoa-600 transition-colors"
                >
                  Perfil
                </p>
                <p className="text-xs text-text-muted font-sans">Nombre, email y contraseña</p>
              </Link>

              <Link
                href="/productos"
                className="border border-sand-300 bg-sand-100 p-6 hover:border-cocoa-600 transition-colors group"
              >
                <p
                  className="font-cormorant text-xl font-light text-cocoa-900 mb-1 group-hover:text-cocoa-600 transition-colors"
                >
                  Seguir comprando
                </p>
                <p className="text-xs text-text-muted font-sans">Ver todos los productos</p>
              </Link>
            </div>

            <LogoutButton />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
