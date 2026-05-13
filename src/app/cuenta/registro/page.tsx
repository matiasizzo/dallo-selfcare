'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import SocialLogin from '@/components/SocialLogin'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (password !== confirm) { setError('Las contraseñas no coinciden.'); return }
    if (password.length < 8) { setError('La contraseña debe tener al menos 8 caracteres.'); return }
    setLoading(true)
    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name }, emailRedirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) { setError(error.message); setLoading(false); return }
    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm px-8 py-10 text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/logo-nova-dallo-black.svg"
              alt="Dall'Ó Selfcare" width={100} height={34} className="h-8 w-auto"
            />
          </div>
          <h2 className="font-cormorant text-3xl font-light text-cocoa-900 mb-4">Revisa tu email</h2>
          <p className="text-sm text-text-muted mb-8 leading-relaxed">
            Te hemos enviado un enlace de confirmación a <strong className="text-cocoa-900">{email}</strong>.
          </p>
          <Link href="/" className="text-xs underline underline-offset-2 text-text-muted hover:text-cocoa-900">
            Volver al inicio
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm px-8 py-10">
        <div className="flex justify-center mb-8">
          <Image
            src="https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/logo-nova-dallo-black.svg"
            alt="Dall'Ó Selfcare" width={100} height={34} className="h-8 w-auto"
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="font-cormorant text-3xl font-light text-cocoa-900 mb-1">Crear cuenta</h1>
          <p className="text-xs text-text-muted">Únete a la comunidad Dall'Ó</p>
        </div>

        <SocialLogin />

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-sand-300" />
          <span className="text-[10px] tracking-[0.15em] uppercase text-text-muted">o</span>
          <div className="flex-1 h-px bg-sand-300" />
        </div>

        <form onSubmit={handleRegister} className="space-y-3">
          {[
            { placeholder: 'Nombre completo', value: name, onChange: setName, type: 'text', required: true },
            { placeholder: 'Correo electrónico', value: email, onChange: setEmail, type: 'email', required: true },
            { placeholder: 'Contraseña (mínimo 8 caracteres)', value: password, onChange: setPassword, type: 'password', required: true },
            { placeholder: 'Confirmar contraseña', value: confirm, onChange: setConfirm, type: 'password', required: true },
          ].map((f) => (
            <input
              key={f.placeholder}
              type={f.type}
              required={f.required}
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              placeholder={f.placeholder}
              className="w-full border border-sand-300 bg-sand-50 rounded-lg px-4 py-3 text-sm text-cocoa-900 placeholder:text-text-muted focus:outline-none focus:border-cocoa-900 transition-colors"
            />
          ))}

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-cocoa-900 text-white text-xs tracking-[0.15em] uppercase py-3.5 hover:bg-cocoa-800 transition-colors disabled:opacity-60 !mt-5"
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] text-text-muted">
          ¿Ya tienes cuenta?{' '}
          <Link href="/cuenta/login" className="underline underline-offset-2 hover:text-cocoa-900">
            Inicia sesión
          </Link>
        </p>
        <p className="mt-4 text-center text-[10px] text-text-muted">
          <Link href="/privacidad" className="underline underline-offset-2 hover:text-cocoa-900">Política de privacidad</Link>
          {' · '}
          <Link href="/terminos" className="underline underline-offset-2 hover:text-cocoa-900">Términos de uso</Link>
        </p>
      </div>
    </main>
  )
}
