'use client'

import Link from 'next/link'
import { Overline, MSymbol } from './ui'
import { standings, teams } from '@/lib/data'

const teamColors: Record<string, string> = {
  ingenieria: '#7c3aed',
  sistemas: '#f59e0b',
  arquitectura: '#22c55e',
  ciencias: '#ef4444',
  diseno: '#38bdf8',
  admin: '#e879f9',
}

export function EquiposView() {
  return (
    <main className="app-page">
      <div className="app-page__header">
        <h1 className="app-page__title">Equipos</h1>
        <p className="app-page__subtitle">
          {standings.length} equipos compitiendo en el torneo TechCup.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16,
      }}>
        {standings.map((s) => {
          const key = Object.entries(teams).find(
            ([, v]) => v.nombre === s.equipo,
          )?.[0] || 'ingenieria'
          const color = teamColors[key] || '#7c3aed'

          return (
            <Link
              key={s.posicion}
              href="/posiciones"
              className="tc-card"
              style={{
                display: 'flex', flexDirection: 'column', gap: 12, padding: 20,
                textDecoration: 'none', color: 'inherit',
                transition: 'border-color 150ms ease, transform 150ms ease',
                border: '1px solid var(--tc-border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${color}66`
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--tc-border)'
                e.currentTarget.style.transform = 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 52, height: 52, borderRadius: 999,
                    display: 'grid', placeItems: 'center',
                    background: `radial-gradient(circle at 30% 25%, ${color}, rgba(0,0,0,0.35))`,
                    color: '#fff', fontWeight: 700, fontSize: 20,
                    fontFamily: 'var(--md-ref-typeface-brand)',
                    border: '2px solid rgba(255,255,255,0.15)',
                    flexShrink: 0,
                  }}
                >
                  {s.equipo.slice(0, 3).toUpperCase()}
                </span>
                <div style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontWeight: 700, fontSize: 16 }}>
                    {s.equipo}
                  </span>
                  <span style={{ display: 'block', fontSize: 12, color: 'var(--tc-text-muted)' }}>
                    {s.pj} partidos jugados
                  </span>
                </div>
              </div>

              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
                marginTop: 4,
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div className="tc-num" style={{ fontWeight: 700, color: 'var(--tc-dorado)' }}>{s.pts}</div>
                  <div style={{ fontSize: 11, color: 'var(--tc-text-muted)' }}>Pts</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div className="tc-num" style={{ fontWeight: 700 }}>{s.pg}</div>
                  <div style={{ fontSize: 11, color: 'var(--tc-text-muted)' }}>PG</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div className="tc-num" style={{
                    fontWeight: 700,
                    color: s.dg >= 0 ? 'var(--tc-success)' : 'var(--tc-live-red)',
                  }}>
                    {s.dg > 0 ? `+${s.dg}` : s.dg}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--tc-text-muted)' }}>DG</div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
