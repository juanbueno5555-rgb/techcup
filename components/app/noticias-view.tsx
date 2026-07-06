import { Overline } from './ui'

const news = [
  {
    fecha: '14 Feb 2026',
    titulo: 'Ingeniería vence a Sistemas en un partidazo',
    resumen: 'Con un gol de Juan Pérez al minuto 71, Ingeniería se quedó con la victoria 2-1 en el clásico de la jornada.',
    categoria: 'Partidos',
  },
  {
    fecha: '12 Feb 2026',
    titulo: 'Arranca la fecha 5 de la Liga Interna',
    resumen: 'Con 4 partidos programados para el fin de semana, la emoción del torneo sigue al máximo.',
    categoria: 'Calendario',
  },
  {
    fecha: '8 Feb 2026',
    titulo: 'Convocatoria abierta para nuevos equipos',
    resumen: 'La Decanatura invita a los programas académicos a inscribir sus equipos para la próxima edición.',
    categoria: 'Comunicados',
  },
  {
    fecha: '1 Feb 2026',
    titulo: 'Copa DOSW Tech: inscripciones hasta marzo',
    resumen: 'El torneo interuniversitario abre sus inscripciones para todas las facultades de ingeniería.',
    categoria: 'Torneos',
  },
  {
    fecha: '20 Ene 2026',
    titulo: 'Resultados de la fecha 4: jornada emocionante',
    resumen: 'Ciencias goleó 3-1 a Diseño, mientras que Administración cayó 4-0 frente a Ingeniería.',
    categoria: 'Resultados',
  },
]

export function NoticiasView() {
  return (
    <main className="app-page">
      <div className="app-page__header">
        <h1 className="app-page__title">Noticias</h1>
        <p className="app-page__subtitle">
          Últimas novedades, resultados y comunicados del torneo.
        </p>
      </div>

      {news.length === 0 ? (
        <div className="content-card" style={{ textAlign: 'center', padding: 40 }}>
          <p style={{ color: 'var(--tc-text-muted)', margin: 0 }}>
            No hay noticias publicadas aún. Vuelve pronto.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {news.map((item, i) => (
            <article
              key={i}
              className="tc-card"
              style={{
                padding: 18, cursor: 'default',
                transition: 'border-color 150ms ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '0.08em', color: 'var(--tc-dorado)',
                  padding: '2px 8px', borderRadius: 6,
                  background: 'rgba(245, 158, 11, 0.12)',
                }}>
                  {item.categoria}
                </span>
                <span style={{ fontSize: 12, color: 'var(--tc-text-muted)', marginLeft: 'auto' }}>
                  {item.fecha}
                </span>
              </div>
              <h2 style={{
                margin: '0 0 6px', fontSize: 16, fontWeight: 700,
                color: 'var(--tc-text-primary)',
              }}>
                {item.titulo}
              </h2>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--tc-text-secondary)', lineHeight: 1.6 }}>
                {item.resumen}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
