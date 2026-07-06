import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel Organizador — TechCup',
  description: 'Panel de control para organizadores del torneo TechCup.',
}

export default function OrganizadorPage() {
  return (
    <main className="app-page">
      <div className="app-page__header">
        <h1 className="app-page__title">Panel Organizador</h1>
        <p className="app-page__subtitle">Gestión centralizada del torneo TechCup Fútbol.</p>
      </div>

      <div style={{ maxWidth: 640, color: 'var(--tc-text-secondary)', fontSize: 15 }}>
        <p>Secciones en construcción: gestión de torneos, equipos, árbitros, calendario, resultados y reportes.</p>
      </div>
    </main>
  )
}
