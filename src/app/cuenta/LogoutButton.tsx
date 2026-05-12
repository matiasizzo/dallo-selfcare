'use client'

import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="text-xs tracking-[0.15em] uppercase font-sans text-text-muted hover:text-cocoa-900 transition-colors underline underline-offset-4"
    >
      Cerrar sesión
    </button>
  )
}
