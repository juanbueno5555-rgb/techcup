import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Campus — TechCup',
  description: 'Conoce las instalaciones y sedes de TechCup Fútbol.',
}

export default function CampusPage() {
  return (
    <main className="app-page">
      <div className="app-page__header">
        <h1 className="app-page__title">Campus</h1>
        <p className="app-page__subtitle">Instalaciones deportivas y espacios de competencia.</p>
      </div>

      <div style={{ maxWidth: 860, color: 'var(--tc-text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
        <p>
          El campus deportivo de TechCup dispone de canchas modernas, equipadas con las mejores infraestructuras
          para competencias de fútbol 7 de nivel universitario.
        </p>
        <p>Secciones en construcción: horarios, reservas, reglas de acceso y mantenimiento de instalaciones.</p>
      </div>
    </main>
  )
}
