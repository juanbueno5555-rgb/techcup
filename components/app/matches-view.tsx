'use client'

import { useState } from 'react'
import { MatchCard } from './match-card'
import { Overline, MSymbol } from './ui'
import { matches } from '@/lib/data'
import type { EstadoPartido } from '@/lib/data'

type Filter = 'Todos' | EstadoPartido

const FILTERS: { value: Filter; icon: string }[] = [
  { value: 'Todos', icon: 'apps' },
  { value: 'En vivo', icon: 'sensors' },
  { value: 'Próximo', icon: 'schedule' },
  { value: 'Finalizado', icon: 'flag' },
]

export function MatchesView() {
  const [filter, setFilter] = useState<Filter>('Todos')

  const visible = filter === 'Todos' ? matches : matches.filter((m) => m.estado === filter)
  const live = matches.filter((m) => m.estado === 'En vivo').length

  return (
    <main className="app-page">
      <div className="app-page__header">
        <h1 className="app-page__title">Partidos</h1>
        <p className="app-page__subtitle">
          Calendario, resultados en vivo y próximos encuentros del torneo.
        </p>
      </div>

      <div className="tv-filters" role="tablist" aria-label="Filtrar partidos">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            role="tab"
            aria-selected={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={`tv-chip${filter === f.value ? ' tv-chip--active' : ''}`}
          >
            <MSymbol
              name={f.icon}
              size={16}
              color={filter === f.value ? '#fff' : 'var(--tc-text-secondary)'}
            />
            {f.value}
            {f.value === 'En vivo' && live > 0 && (
              <span className="tv-chip__count">{live}</span>
            )}
          </button>
        ))}
      </div>

      <section>
        <Overline color="var(--tc-violeta-light)">
          {visible.length} {visible.length === 1 ? 'partido' : 'partidos'}
        </Overline>
        {visible.length === 0 ? (
          <div className="tc-card" style={{ textAlign: 'center', color: 'var(--tc-text-secondary)' }}>
            No hay partidos en esta categoría.
          </div>
        ) : (
          <div className="dash-grid dash-grid--matches">
            {visible.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
