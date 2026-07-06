import { Overline, MSymbol } from './ui'
import { standings } from '@/lib/data'

export function StandingsView() {
  const leader = standings[0]

  return (
    <main className="app-page">
      <div className="app-page__header">
        <h1 className="app-page__title">Posiciones</h1>
        <p className="app-page__subtitle">
          Tabla de la Liga Interna ECI 2026 · fase de grupos.
        </p>
      </div>

      {/* Leader highlight */}
      <div
        className="tc-card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: 24,
          borderColor: 'rgba(245,158,11,0.35)',
          boxShadow: 'var(--tc-glow-gold, 0 0 24px rgba(245,158,11,0.12))',
        }}
      >
        <span
          style={{
            display: 'grid',
            placeItems: 'center',
            width: 48,
            height: 48,
            borderRadius: 999,
            background: 'linear-gradient(135deg, var(--tc-dorado), #b45309)',
            flexShrink: 0,
          }}
        >
          <MSymbol name="trophy" size={26} color="#fff" fill />
        </span>
        <div style={{ minWidth: 0 }}>
          <p className="tc-overline" style={{ color: 'var(--tc-dorado)', margin: '0 0 2px' }}>
            Líder de la tabla
          </p>
          <p className="tc-heading" style={{ fontSize: 18, margin: 0 }}>
            {leader.equipo}
          </p>
        </div>
        <span
          className="tc-num"
          style={{ marginLeft: 'auto', fontSize: 28, fontWeight: 700, color: 'var(--tc-dorado)' }}
        >
          {leader.pts}
          <span style={{ fontSize: 13, color: 'var(--tc-text-muted)', marginLeft: 4 }}>pts</span>
        </span>
      </div>

      <section>
        <Overline color="var(--tc-violeta-light)">Clasificación completa</Overline>
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
