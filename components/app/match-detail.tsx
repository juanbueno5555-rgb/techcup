'use client'

import { useState } from 'react'
import { MSymbol, Overline, StatusBadge, TeamCrest } from './ui'
import { TacticalPitch } from './tactical-pitch'
import type { Match, MatchEvent, MatchStat, Formation } from '@/lib/data'

type Tab = 'resumen' | 'alineacion' | 'estadisticas'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'resumen', label: 'Resumen', icon: 'timeline' },
  { id: 'alineacion', label: 'Alineación', icon: 'grid_view' },
  { id: 'estadisticas', label: 'Estadísticas', icon: 'bar_chart' },
]

const eventConfig: Record<MatchEvent['tipo'], { icon: string; color: string; label: string }> = {
  gol: { icon: 'sports_soccer', color: 'var(--tc-success)', label: 'Gol' },
  amarilla: { icon: 'square', color: '#f59e0b', label: 'Tarjeta amarilla' },
  roja: { icon: 'square', color: 'var(--tc-live-red)', label: 'Tarjeta roja' },
  sustitucion: { icon: 'swap_horiz', color: 'var(--tc-violeta-light)', label: 'Sustitución' },
}

export function MatchDetail({
  match,
  events,
  stats,
  formation,
}: {
  match: Match
  events: MatchEvent[]
  stats: MatchStat[]
  formation: Formation
}) {
  const [tab, setTab] = useState<Tab>('resumen')
  const live = match.estado === 'En vivo'
  const sorted = [...events].sort((a, b) => a.minuto - b.minuto)

  return (
    <main className="app-page">
      <div className="app-page__header">
        <h1 className="app-page__title">{match.local.nombre} vs {match.visitante.nombre}</h1>
        <p className="app-page__subtitle">{match.campo}</p>
      </div>
        {/* Scoreboard */}
        <section className="tc-card md-scoreboard" aria-label="Marcador">
          <div className="md-scoreboard__head">
            <StatusBadge estado={live ? 'En vivo' : match.estado === 'Finalizado' ? 'Finalizado' : 'Activo'} />
            <span className="md-scoreboard__field">
              <MSymbol name="stadium" size={16} color="var(--tc-text-muted)" />
              {match.campo}
            </span>
          </div>

          <div className="md-scoreboard__grid">
            <div className="md-scoreboard__team">
              <TeamCrest team={match.local} size={64} />
              <span className="md-scoreboard__name">{match.local.nombre}</span>
            </div>

            <div className="md-scoreboard__center">
              <div className="md-scoreboard__score">
                <span className="tc-num">{match.golesLocal}</span>
                <span className="md-scoreboard__dash">–</span>
                <span className="tc-num">{match.golesVisitante}</span>
              </div>
              {live ? (
                <span className="md-scoreboard__minute">
                  <span className="live-dot" aria-hidden="true" />
                  {match.minuto}&apos;
                </span>
              ) : (
                <span className="md-scoreboard__minute md-scoreboard__minute--muted">
                  {match.estado === 'Finalizado' ? 'Final' : match.fecha ?? 'Por jugar'}
                </span>
              )}
            </div>

            <div className="md-scoreboard__team">
              <TeamCrest team={match.visitante} size={64} />
              <span className="md-scoreboard__name">{match.visitante.nombre}</span>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="dash-tabs" role="tablist" aria-label="Secciones del partido" style={{ marginTop: 20 }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`dash-tab${tab === t.id ? ' dash-tab--active' : ''}`}
            >
              <MSymbol name={t.icon} size={18} fill={tab === t.id} />
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'resumen' && (
          <div role="tabpanel">
            <Overline color="var(--tc-violeta-light)">Cronología del partido</Overline>
            {sorted.length === 0 ? (
              <div className="tc-card" style={{ textAlign: 'center', color: 'var(--tc-text-secondary)' }}>
                Aún no hay eventos registrados.
              </div>
            ) : (
              <ol className="md-timeline">
                {sorted.map((ev) => {
                  const cfg = eventConfig[ev.tipo]
                  return (
                    <li key={ev.id} className="md-timeline__item">
                      <span className="md-timeline__minute tc-num">{ev.minuto}&apos;</span>
                      <span
                        className="md-timeline__icon"
                        style={{ background: `color-mix(in srgb, ${cfg.color} 18%, transparent)` }}
                      >
                        <MSymbol name={cfg.icon} size={18} color={cfg.color} fill label={cfg.label} />
                      </span>
                      <span className="md-timeline__body">
                        <span className="md-timeline__player">{ev.jugador}</span>
                        <span className="md-timeline__detail">{ev.detalle ?? cfg.label}</span>
                      </span>
                    </li>
                  )
                })}
              </ol>
            )}
          </div>
        )}

        {tab === 'alineacion' && (
          <div role="tabpanel">
            <TacticalPitch />
          </div>
        )}

        {tab === 'estadisticas' && (
          <div role="tabpanel">
            <Overline>Comparativa del partido</Overline>
            <div className="tc-card md-stats">
              {stats.map((s) => {
                const total = s.local + s.visitante || 1
                const localPct = (s.local / total) * 100
                return (
                  <div key={s.label} className="md-stat">
                    <div className="md-stat__row">
                      <span className="tc-num md-stat__val">
                        {s.local}
                        {s.unidad}
                      </span>
                      <span className="md-stat__label">{s.label}</span>
                      <span className="tc-num md-stat__val">
                        {s.visitante}
                        {s.unidad}
                      </span>
                    </div>
                    <div className="md-stat__bar" aria-hidden="true">
                      <span
                        className="md-stat__bar-local"
                        style={{ width: `${localPct}%`, background: match.local.color }}
                      />
                      <span
                        className="md-stat__bar-visit"
                        style={{ width: `${100 - localPct}%`, background: match.visitante.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
    </main>
  )
}
