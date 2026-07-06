'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { MSymbol } from '@/components/app/ui'

const links = [
  { label: 'Inicio', href: '/' },
  { label: 'Torneos', href: '/tournaments' },
  { label: 'Equipos', href: '/tournaments' },
  { label: 'Posiciones', href: '/#posiciones' },
  { label: 'Stats', href: '/#stats' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        padding: '12px 0',
        transition: 'padding 220ms ease',
      }}
    >
      <div
        className="tc-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        {/* Logo only */}
        <Link
          href="/"
          aria-label="TechCup inicio"
          style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
        >
          <Image
            src="/techcup-logo.png"
            alt="TechCup"
            width={48}
            height={48}
            style={{ borderRadius: 8 }}
            priority
          />
        </Link>

        {/* Desktop glass-nav pill */}
        <nav
          className="glass-nav"
          aria-label="Navegación principal"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            padding: '6px 10px',
          }}
        >
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                padding: '7px 14px',
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                color: 'rgba(255,255,255,0.8)',
                borderRadius: 999,
                transition: 'color 160ms, background 160ms',
                whiteSpace: 'nowrap',
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: Ingresar button */}
        <Link
          href="/login"
          style={{
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            borderRadius: 999,
            background: 'linear-gradient(180deg, var(--tc-dorado-light), var(--tc-dorado))',
            color: '#241a00',
            fontWeight: 700,
            fontSize: 14,
            textDecoration: 'none',
            boxShadow: '0 4px 18px rgba(234,179,8,0.3)',
            transition: 'opacity 160ms',
          }}
        >
          <MSymbol name="login" size={18} color="#241a00" />
          Ingresar
        </Link>

        {/* Mobile toggle — hidden on desktop via CSS */}
        <button
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="glass-nav"
          style={{
            display: 'none',
            placeItems: 'center',
            width: 42,
            height: 42,
            border: 'none',
            borderRadius: 12,
            background: 'transparent',
            color: '#fff',
            cursor: 'pointer',
            padding: 0,
          }}
          data-mobile-toggle
        >
          <MSymbol name={open ? 'close' : 'menu'} size={22} color="#fff" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="tc-container"
          style={{ paddingTop: 8, paddingBottom: 12 }}
          data-mobile-menu
        >
          <nav
            aria-label="Navegación móvil"
            className="glass-darker"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderRadius: 16,
              padding: 10,
            }}
          >
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  padding: '11px 14px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              style={{
                marginTop: 6,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '11px 18px',
                borderRadius: 999,
                background: 'linear-gradient(180deg, var(--tc-dorado-light), var(--tc-dorado))',
                color: '#241a00',
                fontWeight: 700,
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              <MSymbol name="login" size={18} color="#241a00" />
              Ingresar
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
