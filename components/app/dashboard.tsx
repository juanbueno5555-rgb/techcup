'use client'

import Link from 'next/link'
import { MatchCard } from './match-card'
import { MSymbol, Overline } from './ui'
import { useSession } from '@/lib/session'
import { matches, standings, players } from '@/lib/data'

function nameFromEmail(email?: string) {
  if (!email) return 'Jugador'
  const base = email.split('@')[0].replace(/[._-]+/g, ' ')
  return base.charAt(0).toUpperCase() + base.slice(1)
}

export function Dashboard() {
  const { session } = useSession()
  const nombre = session ? nameFromEmail(session.email) : 'Jugador'

  const liveMatches = matches.filter((m) => m.estado === 'En vivo')
  const upcoming = matches.filter((m) => m.estado === 'Próximo')
  const topScorers = [...players].sort((a, b) => b.stats.goles - a.stats.goles).slice(0, 4)
  const nextMatch = upcoming[0]

  const stats = [
    { label: 'En vivo', value: liveMatches.length, icon: 'sensors', color: 'var(--tc-live-red)' },
    { label: 'Próximos', value: upcoming.length, icon: 'schedule', color: 'var(--tc-violeta-light)' },
    { label: 'Equipos', value: standings.length, icon: 'shield', color: 'var(--tc-dorado)' },
    { label: 'Torneos', value: 6, icon: 'emoji_events', color: 'var(--tc-success)' },
  ]

  return (
    <main className="app-page">
      <div className="app-page__header">
        <p className="tc-overline" style={{ color: 'var(--tc-violeta-light)', margin: 0 }}>Bienvenido de nuevo</p>
        <h1 className="app-page__title">{nombre}</h1>
      </div>

      {/* Manchas guide */}
      <div className="manchas-tip" style={{ marginBottom: 24 }}>
        <img src="/manchas.png" alt="Manchas, la mascota de TechCup" className="manchas-tip__avatar" />
        <div>
          <p style={{ margin: '0 0 2px', fontWeight: 700, color: 'var(--tc-text-primary)' }}>
            ¡Hola! Soy Manchas 🐾
          </p>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--tc-text-secondary)' }}>
            {nextMatch
              ? `Tu próximo partido: ${nextMatch.local.nombre} vs ${nextMatch.visitante.nombre} · ${nextMatch.fecha}.`
              : 'No tienes partidos programados por ahora. ¡Revisa la tabla de posiciones!'}
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <section aria-label="Resumen" style={{ marginBottom: 28 }}>
        <div className="dash-stats">
          {stats.map((s) => (
            <div key={s.label} className="tc-card dash-stat">
              <MSymbol name={s.icon} size={22} color={s.color} />
              <span className="tc-num dash-stat__value">{s.value}</span>
              <span className="dash-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {liveMatches.length > 0 && (
        <section style={{ marginBottom: 28 }}>
          <Overline color="var(--tc-live-red)">En vivo ahora</Overline>
          <div className="dash-grid">
            {liveMatches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      <section style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Overline color="var(--tc-violeta-light)">Próximos partidos</Overline>
          <Link href="/partidos" className="dash-viewall">
            Ver calendario <MSymbol name="arrow_forward" size={16} color="var(--tc-violeta-light)" />
          </Link>
        </div>
        <div className="dash-grid">
          {upcoming.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </section>

      <div className="content-cols">
        {/* Standings preview */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Overline color="var(--tc-dorado)">Tabla de posiciones</Overline>
            <Link href="/posiciones" className="dash-viewall">
              Ver todo <MSymbol name="arrow_forward" size={16} color="var(--tc-violeta-light)" />
            </Link>
          </div>
          <div className="tc-card" style={{ overflowX: 'auto', padding: 0 }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th scope="col" style={{ textAlign: 'left' }}>#</th>
                  <th scope="col" style={{ textAlign: 'left' }}>Equipo</th>
                  <th scope="col">PJ</th>
                  <th scope="col">DG</th>
                  <th scope="col">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.slice(0, 5).map((s) => (
                  <tr key={s.posicion}>
                    <td><span className={`dash-pos${s.posicion <= 2 ? ' dash-pos--top' : ''}`}>{s.posicion}</span></td>
                    <td style={{ textAlign: 'left', fontWeight: 600 }}>{s.equipo}</td>
                    <td className="tc-num">{s.pj}</td>
                    <td className="tc-num" style={{ color: s.dg >= 0 ? 'var(--tc-success)' : 'var(--tc-live-red)' }}>{s.dg > 0 ? `+${s.dg}` : s.dg}</td>
                    <td className="tc-num" style={{ fontWeight: 700, color: 'var(--tc-dorado)' }}>{s.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Top scorers */}
        <section>
          <Overline>Goleadores</Overline>
          <div className="content-card" style={{ padding: 8 }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {topScorers.map((p, i) => (
                <li key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderBottom: i < topScorers.length - 1 ? '1px solid var(--tc-border)' : 'none' }}>
                  <span className="tc-num" style={{ width: 20, color: 'var(--tc-text-muted)', fontWeight: 700 }}>{i + 1}</span>
                  <span aria-hidden="true" style={{ width: 34, height: 34, borderRadius: 999, display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700, fontSize: 13, background: `radial-gradient(circle at 30% 25%, ${p.equipoColor}, rgba(0,0,0,0.4))` }}>{p.dorsal}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontWeight: 600, fontSize: 14 }}>{p.nombre}</span>
                    <span style={{ display: 'block', fontSize: 12, color: 'var(--tc-text-muted)' }}>{p.equipo}</span>
                  </span>
                  <span className="tc-num" style={{ fontWeight: 700, fontSize: 18, color: 'var(--tc-dorado)' }}>{p.stats.goles}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
