'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { saveSession } from '@/lib/session'
import { useMdText, useMdBool } from '@/lib/use-md-field'
import { ROLES, type Rol } from '@/lib/data'

export function LoginForm() {
  const router = useRouter()
  const email = useMdText('')
  const password = useMdText('')
  const remember = useMdBool(true, 'checked')
  const rolRef = useRef<HTMLElement & { value: string }>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    // Prototype mode: accept any input (or none)
    const mail = email.value.trim() || 'usuario@techcup.local'
    const rol = (rolRef.current?.value as Rol) ?? 'Jugador'
    setLoading(true)
    saveSession({ email: mail, rol })
    setTimeout(() => router.push('/dashboard'), 450)
  }

  return (
    <div className="auth-shell">
      {/* Left: imagery */}
      <aside className="auth-aside">
        <Image
          src="/login-stadium.png"
          alt="Estadio de fútbol iluminado de noche"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="auth-aside__overlay" />
        <div className="auth-aside__content">
          <Link href="/" className="auth-brand">
            <Image src="/techcup-logo.png" alt="" width={44} height={44} />
            <span
              className="md-typescale-title-large"
              style={{ fontFamily: 'var(--md-ref-typeface-brand)', fontWeight: 700 }}
            >
              TechCup
            </span>
          </Link>
          <div>
            <h1 className="md-typescale-display-small auth-aside__title">
              Ingresa y vive el torneo
            </h1>
            <p className="md-typescale-body-large auth-aside__sub">
              Sigue partidos en vivo, revisa la tabla de posiciones y gestiona tu
              equipo dentro de la TechCup de la Decanatura de Ingeniería de Sistemas.
            </p>
          </div>
          <span className="auth-aside__foot md-typescale-body-small">
            Plataforma oficial · Torneo interno de la ECI
          </span>
        </div>
      </aside>

      {/* Right: form */}
      <main className="auth-main">
        <div className="auth-card glass">
          <Link href="/" className="auth-card__brand" aria-label="Ir al inicio">
            <Image src="/techcup-logo.png" alt="" width={40} height={40} />
          </Link>
          <h2
            className="md-typescale-headline-medium"
            style={{ margin: 0, fontFamily: 'var(--md-ref-typeface-brand)' }}
          >
            Iniciar sesión
          </h2>
          <p className="md-typescale-body-medium auth-card__hint">
            Accede con tu correo institucional para continuar.
          </p>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <md-outlined-text-field
              ref={email.ref}
              label="Correo electrónico (opcional)"
              type="email"
              placeholder="O presiona Iniciar sesión"
            >
              <md-icon slot="leading-icon">mail</md-icon>
            </md-outlined-text-field>

            <md-outlined-text-field
              ref={password.ref}
              label="Contraseña (opcional)"
              type="password"
              placeholder="Cualquier cosa funciona"
            >
              <md-icon slot="leading-icon">lock</md-icon>
            </md-outlined-text-field>

            <md-outlined-select ref={rolRef} label="Rol en la plataforma">
              {ROLES.map((r, i) => (
                <md-select-option
                  key={r.value}
                  value={r.value}
                  selected={i === 0 ? true : undefined}
                >
                  <md-icon slot="start">{r.icon}</md-icon>
                  <div slot="headline">{r.value}</div>
                  <div slot="supporting-text">{r.desc}</div>
                </md-select-option>
              ))}
            </md-outlined-select>

            <div className="auth-row">
              <label className="auth-check">
                <md-checkbox ref={remember.ref} />
                <span className="md-typescale-body-medium">Recuérdame</span>
              </label>
              <a className="auth-link md-typescale-body-medium" href="#">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {error && (
              <p className="auth-error md-typescale-body-medium" role="alert">
                <md-icon>error</md-icon>
                {error}
              </p>
            )}

            <md-filled-button
              type="submit"
              disabled={loading ? true : undefined}
              class="auth-submit"
            >
              {loading ? 'Ingresando…' : 'Iniciar sesión'}
              <md-icon slot="icon">{loading ? 'hourglass_empty' : 'login'}</md-icon>
            </md-filled-button>
          </form>

          <p className="auth-signup md-typescale-body-medium">
            ¿No tienes cuenta?{' '}
            <a href="#" className="auth-link">
              Regístrate
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
