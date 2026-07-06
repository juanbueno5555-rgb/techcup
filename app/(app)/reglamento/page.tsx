import type { Metadata } from 'next'
import { rules } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Reglamento — TechCup',
  description: 'Reglamento oficial del torneo TechCup Fútbol.',
}

export default function ReglamentoPage() {
  return (
    <main className="app-page">
      <div className="app-page__header">
        <h1 className="app-page__title">Reglamento</h1>
        <p className="app-page__subtitle">Normativa técnica y disciplinaria del torneo TechCup Fútbol.</p>
      </div>

      <div style={{ maxWidth: 860 }}>
        {rules.map((section) => (
          <section key={section.id} style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--tc-violeta), var(--tc-morado))',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {section.numero}
              </div>
              <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: 'var(--tc-text-primary)' }}>
                {section.titulo}
              </h2>
            </div>

            <p style={{ margin: '0 0 20px 48px', color: 'var(--tc-text-secondary)', fontSize: 15, lineHeight: 1.6 }}>
              {section.intro}
            </p>

            {section.articulos.map((art) => (
              <div
                key={art.titulo}
                style={{
                  marginLeft: 48,
                  marginBottom: 16,
                  paddingLeft: 16,
                  borderLeft: '2px solid var(--tc-border-strong)',
                }}
              >
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--tc-dorado)', marginBottom: 6 }}>
                  {art.titulo}
                </h3>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--tc-text-secondary)', lineHeight: 1.6 }}>
                  {art.texto}
                </p>
              </div>
            ))}
          </section>
        ))}
      </div>
    </main>
  )
}
