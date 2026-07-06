'use client'

import { Overline, MSymbol, TeamCrest } from './ui'
import { standings, players, teams } from '@/lib/data'

export function EstadisticasView() {
  const topScorers = [...players].sort((a, b) => b.stats.goles - a.stats.goles)
  const topAmarillas = [...players].sort((a, b) => b.stats.amarillas - a.stats.amarillas).slice(0, 5)
  const topRojas = [...players].sort((a, b) => b.stats.rojas - a.stats.rojas).slice(0, 5)

  return (
    <main className="app-page">
      <div className="app-page__header">
        <h1 className="app-page__title">Estadísticas</h1>
        <p className="app-page__subtitle">
          Rendimiento, goleo y disciplina del torneo TechCup.
        </p>
      </div>

      {/* Full standings table */}
      <section style={{ marginBottom: 32 }}>
        <Overline color="var(--tc-dorado)">Tabla de posiciones</Overline>
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
                  <td style={{ textAlign: 'left', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: 24, height: 24, borderRadius: 999,
                        background: `radial-gradient(circle at 30% 25%, ${teams[s.equipo.toLowerCase()]?.color || '#7c3aed'}, rgba(0,0,0,0.3))`,
                        display: 'inline-block', flexShrink: 0,
                      }}
                    />
                    {s.equipo}
                  </td>
                  <td className="tc-num">{s.pj}</td>
                  <td className="tc-num">{s.pg}</td>
                  <td className="tc-num">{s.pe}</td>
                  <td className="tc-num">{s.pp}</td>
                  <td className="tc-num">{s.gf}</td>
                  <td className="tc-num">{s.gc}</td>
                  <td className="tc-num" style={{ color: s.dg >= 0 ? 'var(--tc-success)' : 'var(--tc-live-red)' }}>
                    {s.dg > 0 ? `+${s.dg}` : s.dg}
                  </td>
                  <td className="tc-num" style={{ fontWeight: 700, color: 'var(--tc-dorado)' }}>{s.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="content-cols">
        {/* Goleadores */}
        <section>
          <Overline color="var(--tc-success)">Goleadores</Overline>
          <div className="content-card" style={{ padding: 8 }}>
            {topScorers.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--tc-text-muted)', padding: 20 }}>
                No hay goleadores registrados.
              </p>
            ) : (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {topScorers.map((p, i) => (
                  <li key={p.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                    borderBottom: i < topScorers.length - 1 ? '1px solid var(--tc-border)' : 'none',
                  }}>
                    <span className="tc-num" style={{ width: 20, color: 'var(--tc-text-muted)', fontWeight: 700 }}>{i + 1}</span>
                    <span aria-hidden="true" style={{
                      width: 34, height: 34, borderRadius: 999, display: 'grid', placeItems: 'center',
                      color: '#fff', fontWeight: 700, fontSize: 13,
                      background: `radial-gradient(circle at 30% 25%, ${p.equipoColor}, rgba(0,0,0,0.4))`,
                    }}>{p.dorsal}</span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'block', fontWeight: 600, fontSize: 14 }}>{p.nombre}</span>
                      <span style={{ display: 'block', fontSize: 12, color: 'var(--tc-text-muted)' }}>{p.equipo}</span>
                    </span>
                    <span className="tc-num" style={{ fontWeight: 700, fontSize: 18, color: 'var(--tc-dorado)' }}>{p.stats.goles}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Disciplina */}
        <section>
          <Overline color="var(--tc-live-red)">Disciplina</Overline>

          <div className="content-card" style={{ padding: 8, marginBottom: 16 }}>
            <p className="tc-overline" style={{
              color: 'var(--tc-dorado)', fontSize: 10, margin: '0 0 8px', padding: '0 12px',
            }}>
              Tarjetas amarillas
            </p>
            {topAmarillas.filter(p => p.stats.amarillas > 0).length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--tc-text-muted)', padding: 12, fontSize: 13 }}>
                Sin tarjetas amarillas registradas.
              </p>
            ) : (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {topAmarillas.filter(p => p.stats.amarillas > 0).map((p, i) => (
                  <li key={p.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                    borderBottom: i < topAmarillas.filter(x => x.stats.amarillas > 0).length - 1 ? '1px solid var(--tc-border)' : 'none',
                  }}>
                    <MSymbol name="credit_card" size={18} color="var(--tc-dorado)" />
                    <span style={{ flex: 1, fontWeight: 600, fontSize: 14 }}>{p.nombre}</span>
                    <span className="tc-num" style={{ color: 'var(--tc-dorado)', fontWeight: 700 }}>{p.stats.amarillas}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="content-card" style={{ padding: 8 }}>
            <p className="tc-overline" style={{
              color: 'var(--tc-live-red)', fontSize: 10, margin: '0 0 8px', padding: '0 12px',
            }}>
              Tarjetas rojas
            </p>
            {topRojas.filter(p => p.stats.rojas > 0).length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--tc-text-muted)', padding: 12, fontSize: 13 }}>
                Sin tarjetas rojas registradas.
              </p>
            ) : (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {topRojas.filter(p => p.stats.rojas > 0).map((p, i) => (
                  <li key={p.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                    borderBottom: i < topRojas.filter(x => x.stats.rojas > 0).length - 1 ? '1px solid var(--tc-border)' : 'none',
                  }}>
                    <MSymbol name="block" size={18} color="var(--tc-live-red)" />
                    <span style={{ flex: 1, fontWeight: 600, fontSize: 14 }}>{p.nombre}</span>
                    <span className="tc-num" style={{ color: 'var(--tc-live-red)', fontWeight: 700 }}>{p.stats.rojas}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
