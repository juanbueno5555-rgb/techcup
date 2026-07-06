import { standings } from '@/lib/data'
import { Overline } from '@/components/app/ui'
import { Ambient } from '@/components/landing/decor'

const columns = [
  { key: 'pj', label: 'PJ' },
  { key: 'pg', label: 'G' },
  { key: 'pe', label: 'E' },
  { key: 'pp', label: 'P' },
  { key: 'gf', label: 'GF' },
  { key: 'gc', label: 'GC' },
  { key: 'dg', label: 'DG' },
  { key: 'pts', label: 'PTS' },
] as const

function rowBg(pos: number) {
  if (pos === 1) return 'rgba(245,158,11,0.12)'
  if (pos === 2 || pos === 3) return 'rgba(124,58,237,0.12)'
  return 'transparent'
}

export function Standings() {
  return (
    <section
      id="posiciones"
      className="tc-section"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <Ambient lines={false} particles={false} orbs="violet-gold" />
      <div className="tc-container" style={{ position: 'relative', zIndex: 1 }}>
        <Overline>Rumbo a la gloria</Overline>
        <h2
          className="tc-heading"
          style={{ fontSize: 'clamp(28px, 5vw, 36px)', margin: '10px 0 16px' }}
        >
          Tabla de posiciones
        </h2>
        <div className="tc-gradient-bar" style={{ marginBottom: 28 }} />

        <div className="tc-gradient-border" style={{ overflowX: 'auto', padding: 4 }}>
          <table
            style={{
              width: '100%',
              minWidth: 560,
              borderCollapse: 'collapse',
              fontSize: 14,
            }}
          >
            <caption className="sr-only">
              Tabla de posiciones del torneo. Columnas: posición, equipo, partidos
              jugados, ganados, empatados, perdidos, goles a favor, goles en contra,
              diferencia de gol y puntos.
            </caption>
            <thead>
              <tr style={{ textAlign: 'right', color: 'var(--tc-text-muted)' }}>
                <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: 600 }}>#</th>
                <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: 600 }}>
                  Equipo
                </th>
                {columns.map((c) => (
                  <th
                    key={c.key}
                    className="tc-num"
                    style={{ padding: '14px 12px', fontWeight: 600 }}
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {standings.map((s) => (
                <tr
                  key={s.posicion}
                  style={{
                    background: rowBg(s.posicion),
                    borderTop: '1px solid var(--tc-border)',
                  }}
                >
                  <td
                    className="tc-num"
                    style={{
                      padding: '14px 16px',
                      fontWeight: 700,
                      color:
                        s.posicion === 1
                          ? 'var(--tc-dorado)'
                          : s.posicion <= 3
                            ? 'var(--tc-violeta-light)'
                            : 'var(--tc-text-secondary)',
                    }}
                  >
                    {s.posicion}
                  </td>
                  <td
                    className="tc-heading"
                    style={{ padding: '14px 16px', fontSize: 15, whiteSpace: 'nowrap' }}
                  >
                    {s.equipo}
                  </td>
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className="tc-num"
                      style={{
                        padding: '14px 12px',
                        textAlign: 'right',
                        fontWeight: c.key === 'pts' ? 700 : 500,
                        color:
                          c.key === 'dg'
                            ? s.dg > 0
                              ? 'var(--tc-success)'
                              : s.dg < 0
                                ? 'var(--tc-live-red)'
                                : 'var(--tc-text-secondary)'
                            : c.key === 'pts'
                              ? 'var(--tc-text-primary)'
                              : 'var(--tc-text-secondary)',
                      }}
                    >
                      {c.key === 'dg' && s.dg > 0 ? `+${s.dg}` : s[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
