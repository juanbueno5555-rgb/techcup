import { Overline, StatusBadge } from './ui'
import { matches, tournaments } from '@/lib/data'

const finishedMatches = matches.filter((m) => m.estado === 'Finalizado')
const pastTournaments = tournaments.filter((t) => t.estado === 'Finalizado')

export function HistorialView() {
  return (
    <main className="app-page">
      <div className="app-page__header">
        <h1 className="app-page__title">Historial</h1>
        <p className="app-page__subtitle">
          Partidos finalizados y ediciones anteriores del torneo.
        </p>
      </div>

      <div className="content-cols">
        {/* Partidos finalizados */}
        <section>
          <Overline color="var(--tc-text-muted)">Partidos finalizados</Overline>

          {finishedMatches.length === 0 ? (
            <div className="content-card" style={{ textAlign: 'center', padding: 32 }}>
              <p style={{ color: 'var(--tc-text-muted)', margin: 0 }}>
                No hay partidos finalizados registrados.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {finishedMatches.map((m) => (
                <div key={m.id} className="tc-card" style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                }}>
                  <div style={{ textAlign: 'right', flex: 1 }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{m.local.nombre}</span>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontFamily: 'var(--md-ref-typeface-brand)', fontWeight: 700,
                    fontSize: 20, color: 'var(--tc-text-primary)',
                  }}>
                    <span>{m.golesLocal}</span>
                    <span style={{ fontSize: 13, color: 'var(--tc-text-muted)' }}>—</span>
                    <span>{m.golesVisitante}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{m.visitante.nombre}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--tc-text-muted)', textAlign: 'right', minWidth: 80 }}>
                    {m.fecha || '—'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Ediciones anteriores */}
        <section>
          <Overline color="var(--tc-text-muted)">Ediciones anteriores</Overline>

          {pastTournaments.length === 0 ? (
            <div className="content-card" style={{ textAlign: 'center', padding: 32 }}>
              <p style={{ color: 'var(--tc-text-muted)', margin: 0 }}>
                No hay ediciones anteriores registradas.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pastTournaments.map((t) => (
                <div key={t.id} className="tc-card" style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{t.nombre}</span>
                    <StatusBadge estado={t.estado} />
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--tc-text-secondary)' }}>
                    {t.equipos} equipos · {t.fecha}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
