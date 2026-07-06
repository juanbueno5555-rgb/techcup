'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MSymbol } from './ui'

/** Sticky in-app header with navbar for desktop. Either a greeting/title on the left, or a back link. */
export function AppHeader({
  title,
  greeting,
  backHref,
  notifications = 3,
}: {
  title?: string
  greeting?: string
  backHref?: string
  notifications?: number
}) {
  const pathname = usePathname()

  const navLinks = [
    { href: '/tournaments', label: 'Torneos', icon: 'emoji_events' },
    { href: '/dashboard', label: 'Resultados', icon: 'sports_score' },
    { href: '/', label: 'Noticias', icon: 'newspaper' },
    { href: '/perfil/10', label: 'Perfil', icon: 'person' },
  ]

  return (
    <>
      {/* Desktop navbar */}
      <nav
        data-desktop-nav
        className="glass-darker app-navbar"
        style={{
          display: 'none',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          gap: 0,
          padding: '12px 40px',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--tc-border)',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
            color: 'var(--tc-text-primary)',
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          <img src="/techcup-logo.png" alt="TechCup" style={{ height: 32 }} />
          <span>TechCup</span>
        </Link>

        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href.split('/')[1])
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  borderRadius: 10,
                  textDecoration: 'none',
                  color: active ? 'var(--tc-dorado)' : 'var(--tc-text-secondary)',
                  fontWeight: 600,
                  fontSize: 14,
                  transition: 'color 150ms ease-out, background 150ms ease-out',
                  background: active ? 'rgba(245,158,11,0.12)' : 'transparent',
                }}
              >
                <MSymbol name={link.icon} size={18} />
                {link.label}
              </Link>
            )
          })}
        </div>

        <button
          type="button"
          aria-label="Notificaciones y configuración"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: 8,
            borderRadius: 10,
            border: '1px solid var(--tc-border)',
            background: 'rgba(255,255,255,0.04)',
            color: 'var(--tc-text-primary)',
            cursor: 'pointer',
          }}
        >
          <MSymbol name="notifications" size={20} />
          <MSymbol name="settings" size={20} />
        </button>
      </nav>

      {/* Mobile header */}
      <header
        className="glass-darker"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '14px 20px',
          borderBottom: '1px solid var(--tc-border)',
        }}
      >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        {backHref && (
          <Link
            href={backHref}
            aria-label="Volver"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--tc-text-secondary)',
              textDecoration: 'none',
              fontWeight: 600,
              minHeight: 44,
            }}
          >
            <MSymbol name="arrow_back" size={22} />
            <span>Volver</span>
          </Link>
        )}
        {greeting && (
          <div style={{ minWidth: 0 }}>
            <p
              className="tc-overline"
              style={{ margin: 0, color: 'var(--tc-violeta-light)', fontSize: 11 }}
            >
              Bienvenido
            </p>
            <p
              className="tc-heading"
              style={{
                margin: 0,
                fontSize: 20,
                color: 'var(--tc-text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {greeting}
            </p>
          </div>
        )}
        {title && !greeting && (
          <p
            className="tc-heading"
            style={{ margin: 0, fontSize: 22, color: 'var(--tc-text-primary)' }}
          >
            {title}
          </p>
        )}
      </div>

      <button
        type="button"
        aria-label={`${notifications} notificaciones`}
        style={{
          position: 'relative',
          display: 'grid',
          placeItems: 'center',
          width: 44,
          height: 44,
          borderRadius: 999,
          border: '1px solid var(--tc-border)',
          background: 'rgba(255,255,255,0.04)',
          color: 'var(--tc-text-primary)',
          cursor: 'pointer',
        }}
      >
        <MSymbol name="notifications" size={22} />
        {notifications > 0 && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              minWidth: 16,
              height: 16,
              padding: '0 4px',
              borderRadius: 999,
              background: 'var(--tc-live-red)',
              color: '#fff',
              fontSize: 10,
              fontWeight: 700,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {notifications}
          </span>
        )}
      </button>
      </header>
    </>
  )
}
