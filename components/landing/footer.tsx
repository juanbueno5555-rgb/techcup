'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MSymbol } from '@/components/app/ui'

const enlaces = ['Inicio', 'Torneos', 'Equipos', 'Calendario', 'Noticias']
const masInfo = [
  'Reglamento',
  'Preguntas frecuentes',
  'Términos y condiciones',
  'Política de privacidad',
]

export function Footer() {
  return (
    <footer
      style={{
        background: '#080c18',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle purple glow top-left */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '-5%',
          width: 360,
          height: 200,
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.12), transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      <div className="tc-container" style={{ paddingBlock: 52, position: 'relative', zIndex: 1 }}>
        <div className="footer-grid">
          {/* Brand */}
          <div style={{ maxWidth: 260 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Image
                src="/techcup-logo.png"
                alt="TechCup"
                width={38}
                height={38}
                style={{ borderRadius: 8 }}
              />
            </div>
            <p
              style={{ fontSize: 12, lineHeight: 1.65, color: 'var(--tc-text-muted)', margin: '0 0 20px' }}
            >
              Plataforma oficial de torneos de fútbol de la Decanatura de Ingeniería de Sistemas.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {(['facebook', 'link', 'alternate_email', 'play_circle'] as const).map((icon) => (
                <a
                  key={icon}
                  href="#"
                  aria-label={icon}
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)',
                    transition: 'border-color 180ms, background 180ms',
                  }}
                >
                  <MSymbol name={icon} size={16} color="var(--tc-text-muted)" />
                </a>
              ))}
            </div>
          </div>

          {/* ENLACES */}
          <nav aria-label="Enlaces">
            <h3
              className="tc-overline"
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--tc-text-secondary)', margin: '0 0 16px' }}
            >
              ENLACES
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {enlaces.map((l) => (
                <li key={l}>
                  <Link
                    href="/tournaments"
                    style={{ fontSize: 13, color: 'var(--tc-text-muted)', textDecoration: 'none' }}
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* MAS INFORMACION */}
          <nav aria-label="Mas informacion">
            <h3
              className="tc-overline"
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--tc-text-secondary)', margin: '0 0 16px' }}
            >
              MAS INFORMACION
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {masInfo.map((l) => (
                <li key={l}>
                  <Link
                    href="#"
                    style={{ fontSize: 13, color: 'var(--tc-text-muted)', textDecoration: 'none' }}
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div>
            <h3
              className="tc-overline"
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--tc-text-secondary)', margin: '0 0 10px' }}
            >
              MANTENTE AL DIA
            </h3>
            <p style={{ fontSize: 12, color: 'var(--tc-text-muted)', margin: '0 0 14px', lineHeight: 1.5 }}>
              Recibe noticias y actualizaciones de nuestros torneos.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'flex', gap: 6 }}
            >
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                aria-label="Correo electrónico"
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                aria-label="Suscribirse"
                style={{
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: 'none',
                  background: 'linear-gradient(135deg, var(--tc-dorado-light), var(--tc-dorado))',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <MSymbol name="arrow_forward" size={18} color="#241a00" />
              </button>
            </form>
          </div>
        </div>

        <div
          style={{
            marginTop: 44,
            paddingTop: 20,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            fontSize: 12,
            color: 'var(--tc-text-muted)',
          }}
        >
          © 2026 TechCup · Decanatura de Ingeniería de Sistemas
        </div>
      </div>
    </footer>
  )
}
