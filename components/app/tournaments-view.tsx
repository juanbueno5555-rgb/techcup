'use client'

import { useState } from 'react'
import { TournamentCard } from './tournament-card'
import { MSymbol, Overline } from './ui'
import { tournaments, standings } from '@/lib/data'
import type { EstadoTorneo } from '@/lib/data'

type Filter = 'Todos' | EstadoTorneo

const FILTERS: Filter[] = ['Todos', 'En progreso', 'Activo', 'Borrador', 'Finalizado']

export function TournamentsView() {
  const [filter, setFilter] = useState<Filter>('Todos')

  const visible =
    filter === 'Todos' ? tournaments : tournaments.filter((t) => t.estado === filter)

  return (
    <main className="app-page">
      <div className="app-page__header">
        <h1 className="app-page__title">Torneos</h1>
        <p className="app-page__subtitle">Descubre los torneos disponibles y sé parte de la competencia.</p>
      </div>

      {/* Filters */}
      <div className="tv-filters" role="tablist" aria-label="Filtrar torneos">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`tv-chip${filter === f ? ' tv-chip--active' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        <section style={{ marginBottom: 36 }}>
          <Overline color="var(--tc-violeta-light)">
            {visible.length} {visible.length === 1 ? 'torneo' : 'torneos'}
          </Overline>
          {visible.length === 0 ? (
            <div className="tc-card" style={{ textAlign: 'center', color: 'var(--tc-text-secondary)' }}>
              No hay torneos en esta categoría.
            </div>
          ) : (
            <div className="dash-grid dash-grid--tournaments">
              {visible.map((t) => (
                <TournamentCard key={t.id} tournament={t} />
              ))}
            </div>
          )}
        </section>

        {/* Standings */}
        <section>
          <Overline color="var(--tc-dorado)">Tabla de posiciones · Liga Interna ECI</Overline>
          <div className="tc-card" style={{ overflowX: 'auto', padding: 0 }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th scope="col" style={{ textAlign: 'left' }}>#</th>
                  <th scope="col" style={{ textAlign: 'left' }}>Equipo</th>
                  <th scope="col">PJ</th>
                  <th scope="col">PG</th>
                  <th scope="col">PE</th>
                  <th scope="col">PP</th>
                  <th scope="col">GF</th>
                  <th scope="col">GC</th>
                  <th scope="col">DG</th>
                  <th scope="col">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((s) => (
                  <tr key={s.posicion}>
                    <td>
                      <span className={`dash-pos${s.posicion <= 2 ? ' dash-pos--top' : ''}`}>
                        {s.posicion}
                      </span>
                    </td>
                    <td style={{ textAlign: 'left', fontWeight: 600 }}>{s.equipo}</td>
                    <td className="tc-num">{s.pj}</td>
                    <td className="tc-num">{s.pg}</td>
                    <td className="tc-num">{s.pe}</td>
                    <td className="tc-num">{s.pp}</td>
                    <td className="tc-num">{s.gf}</td>
                    <td className="tc-num">{s.gc}</td>
                    <td
                      className="tc-num"
                      style={{ color: s.dg >= 0 ? 'var(--tc-success)' : 'var(--tc-live-red)' }}
                    >
                      {s.dg > 0 ? `+${s.dg}` : s.dg}
                    </td>
                    <td className="tc-num" style={{ fontWeight: 700, color: 'var(--tc-dorado)' }}>
                      {s.pts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p
            style={{
              marginTop: 12,
              fontSize: 12,
              color: 'var(--tc-text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <MSymbol name="info" size={14} color="var(--tc-text-muted)" />
            PJ: jugados · PG/PE/PP: ganados, empatados, perdidos · DG: diferencia de gol
          </p>
        </section>
    </main>
  )
}
