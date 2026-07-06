'use client'

import { MSymbol } from '@/components/app/ui'

const features = [
  {
    icon: 'emoji_events',
    title: 'Torneos organizados',
    desc: 'Compite en torneos internos con reglas claras y justas.',
  },
  {
    icon: 'groups',
    title: 'Equipos comprometidos',
    desc: 'Crea o únete a un equipo y representa tu programa.',
  },
  {
    icon: 'calendar_month',
    title: 'Calendario actualizado',
    desc: 'Consulta fechas, horarios y resultados en tiempo real.',
  },
  {
    icon: 'insights',
    title: 'Estadísticas en vivo',
    desc: 'Sigue el rendimiento de los equipos y jugadores.',
  },
]

export function Features() {
  return (
    <section
      id="stats"
      style={{
        background: 'linear-gradient(to bottom, #0d0d1a 0%, #111124 22%, #111124 78%, #0d0d1a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle diagonal gold accent line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(100deg, rgba(245,158,11,0.04) 0%, transparent 40%, rgba(124,58,237,0.06) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div className="tc-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="features-bar">
          {features.map((f) => (
            <div key={f.title} className="features-bar__item">
              <span className="features-bar__icon">
                <MSymbol name={f.icon} size={26} color="var(--tc-dorado)" fill />
              </span>
              <div>
                <p className="features-bar__title">{f.title}</p>
                <p className="features-bar__desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
