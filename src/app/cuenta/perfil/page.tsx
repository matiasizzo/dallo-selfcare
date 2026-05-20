import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import ProfileForm from './ProfileForm'

export const metadata: Metadata = {
  title: "Perfil — Dall'Ó Selfcare",
}

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/cuenta/login')

  const name = (user.user_metadata?.full_name as string | undefined) ?? ''
  const email = user.email ?? ''

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen bg-cream">
        <div className="max-w-screen-xl mx-auto px-8 pt-20 pb-6 border-b border-sand-300">
          <Link
            href="/cuenta"
            className="text-[10px] tracking-[0.2em] uppercase text-text-muted hover:text-cocoa-900 transition-colors"
          >
            ← Mi cuenta
          </Link>
          <h1 className="font-cormorant text-6xl font-light text-cocoa-900 mt-4 mb-2">
            Perfil
          </h1>
        </div>

        <div className="max-w-screen-xl mx-auto px-8 py-16">
          <ProfileForm name={name} email={email} />
        </div>
      </main>
      <Footer />
    </>
  )
}
