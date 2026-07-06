import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel Árbitro — TechCup',
  description: 'Panel de control para árbitros del torneo TechCup.',
}

export default function ArbitroPage() {
  return (
    <main className="app-page">
      <div className="app-page__header">
        <h1 className="app-page__title">Panel Árbitro</h1>
        <p className="app-page__subtitle">Control de partidos, tarjetas y eventos en tiempo real.</p>
      </div>

      <div style={{ maxWidth: 640, color: 'var(--tc-text-secondary)', fontSize: 15 }}>
        <p>Secciones en construcción: partidos asignados, registro de eventos, actas y reportes.</p>
      </div>
    </main>
  )
}
