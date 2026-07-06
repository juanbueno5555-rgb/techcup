import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configuración — TechCup',
  description: 'Ajustes y preferencias de tu cuenta en TechCup.',
}

export default function ConfiguracionPage() {
  return (
    <main className="app-page">
      <div className="app-page__header">
        <h1 className="app-page__title">Configuración</h1>
        <p className="app-page__subtitle">Personaliza tu experiencia en TechCup.</p>
      </div>

      <div style={{ maxWidth: 640, color: 'var(--tc-text-secondary)', fontSize: 15 }}>
        <p>Secciones en construcción: notificaciones, privacidad, tema, idioma y cuenta.</p>
      </div>
    </main>
  )
}
