'use client'

import { useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

interface Props {
  name: string
  email: string
}

export default function ProfileForm({ name: initialName, email }: Props) {
  const [name, setName] = useState(initialName)
  const [nameLoading, setNameLoading] = useState(false)
  const [nameMsg, setNameMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const [resetLoading, setResetLoading] = useState(false)
  const [resetMsg, setResetMsg] = useState<{ ok: boolean; text: string } | null>(null)

  async function handleSaveName(e: React.FormEvent) {
    e.preventDefault()
    setNameLoading(true)
    setNameMsg(null)
    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.updateUser({ data: { full_name: name.trim() } })
    setNameMsg(error
      ? { ok: false, text: 'No se pudo guardar. Inténtalo de nuevo.' }
      : { ok: true, text: 'Nombre actualizado.' }
    )
    setNameLoading(false)
  }

  async function handlePasswordReset() {
    setResetLoading(true)
    setResetMsg(null)
    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/cuenta/perfil`,
    })
    setResetMsg(error
      ? { ok: false, text: 'No se pudo enviar el email. Inténtalo de nuevo.' }
      : { ok: true, text: `Email enviado a ${email}. Revisa tu bandeja de entrada.` }
    )
    setResetLoading(false)
  }

  return (
    <div className="space-y-10 max-w-md">

      {/* Name */}
      <section>
        <h2 className="font-cormorant text-2xl font-light text-cocoa-900 mb-6">Nombre</h2>
        <form onSubmit={handleSaveName} className="space-y-4">
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-text-muted mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-sand-300 bg-sand-50 px-4 py-3 text-sm text-cocoa-900 placeholder:text-text-muted focus:outline-none focus:border-cocoa-900 transition-colors"
            />
          </div>
          {nameMsg && (
            <p className={`text-xs ${nameMsg.ok ? 'text-green-700' : 'text-red-600'}`}>
              {nameMsg.text}
            </p>
          )}
          <button
            type="submit"
            disabled={nameLoading}
            className="border border-cocoa-900 text-cocoa-900 text-[10px] tracking-[0.2em] uppercase px-8 py-3 hover:bg-cocoa-900 hover:text-white transition-colors disabled:opacity-50"
          >
            {nameLoading ? 'Guardando...' : 'Guardar'}
          </button>
        </form>
      </section>

      <div className="border-t border-sand-300" />

      {/* Email (read-only) */}
      <section>
        <h2 className="font-cormorant text-2xl font-light text-cocoa-900 mb-6">Email</h2>
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-text-muted mb-2">
            Correo electrónico
          </label>
          <p className="text-sm text-cocoa-900 py-3 border-b border-sand-300">{email}</p>
        </div>
      </section>

      <div className="border-t border-sand-300" />

      {/* Password reset */}
      <section>
        <h2 className="font-cormorant text-2xl font-light text-cocoa-900 mb-2">Contraseña</h2>
        <p className="text-xs text-text-muted mb-6">
          Te enviaremos un email para que puedas establecer una nueva contraseña.
        </p>
        {resetMsg && (
          <p className={`text-xs mb-4 ${resetMsg.ok ? 'text-green-700' : 'text-red-600'}`}>
            {resetMsg.text}
          </p>
        )}
        <button
          onClick={handlePasswordReset}
          disabled={resetLoading || resetMsg?.ok === true}
          className="border border-cocoa-900 text-cocoa-900 text-[10px] tracking-[0.2em] uppercase px-8 py-3 hover:bg-cocoa-900 hover:text-white transition-colors disabled:opacity-50"
        >
          {resetLoading ? 'Enviando...' : 'Enviar email de cambio'}
        </button>
      </section>

    </div>
  )
}
