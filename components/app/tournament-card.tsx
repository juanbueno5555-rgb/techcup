import Link from 'next/link'
import Image from 'next/image'
import type { Tournament } from '@/lib/data'
import { MSymbol, StatusBadge } from './ui'

// Map tournament id (or index) to the correct ball image
const ballImages: Record<string, string> = {
  '1': '/ball-apertura.png',
  '2': '/ball-clausura.png',
  '3': '/ball-edicion.png',
}

// First card uses the golden trophy logo instead of a ball
const firstCardId = '1'

export function TournamentCard({
  tournament,
  index = 0,
}: {
  tournament: Tournament
  index?: number
}) {
  const isOpen = tournament.estado === 'Activo'
  const isFirst = tournament.id === firstCardId || index === 0
  const ballSrc = ballImages[tournament.id] ?? ballImages['2']

  return (
    <article
      className="tc-tournament-card"
      tabIndex={0}
      role="group"
      aria-label={`Torneo ${tournament.nombre}, estado ${tournament.estado}`}
    >
      {/* Header: ball/logo + TECHCUP label + name */}
      <div className="tc-tournament-card__header">
        {isFirst ? (
          /* Golden trophy for the first (open) card */
          <div
            style={{
              width: 72,
              height: 72,
              flexShrink: 0,
              display: 'grid',
              placeItems: 'center',
              borderRadius: 14,
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.2)',
            }}
          >
            <Image
              src="/techcup-logo.png"
              alt=""
              width={52}
              height={52}
              style={{ objectFit: 'contain' }}
            />
          </div>
        ) : (
          /* Colorful soccer ball for upcoming tournaments */
          <div
            style={{
              width: 72,
              height: 72,
              flexShrink: 0,
              borderRadius: 14,
              overflow: 'hidden',
              background: 'rgba(124,58,237,0.1)',
            }}
          >
            <Image
              src={ballSrc}
              alt=""
              width={72}
              height={72}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        <div style={{ minWidth: 0 }}>
          <p
            className="tc-display"
            style={{
              margin: '0 0 1px',
              fontSize: 20,
              color: '#fff',
              lineHeight: 1,
            }}
          >
            <span style={{ color: '#fff' }}>TECH</span>
            <span style={{ color: 'var(--tc-violeta-light)' }}>CUP</span>
          </p>
          <h3
            className="tc-display"
            style={{
              margin: 0,
              fontSize: 19,
              color: 'var(--tc-dorado)',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {tournament.nombre}
          </h3>
        </div>
      </div>

      {/* Body: meta info */}
      <div className="tc-tournament-card__body">
        {tournament.equipos > 0 && (
          <div className="tc-tournament-card__meta">
            <MSymbol name="groups" size={15} color="var(--tc-text-muted)" />
            <span>{tournament.equipos} Equipos</span>
          </div>
        )}
        <div className="tc-tournament-card__meta">
          <MSymbol name="calendar_month" size={15} color="var(--tc-text-muted)" />
          <span>{isOpen ? 'Inscripciones abiertas' : 'Próximamente'}</span>
        </div>
        <div className="tc-tournament-card__meta">
          <MSymbol name="schedule" size={15} color="var(--tc-text-muted)" />
          <span>{isOpen ? 'Fase de grupos' : 'Inscripciones próximas'}</span>
        </div>
      </div>

      {/* Footer: badge + CTA */}
      <div className="tc-tournament-card__footer">
        <div>
          <StatusBadge estado={tournament.estado} />
        </div>
        <Link href="/tournaments" className="tc-tournament-card__btn">
          Ver detalles
          <MSymbol name="arrow_forward" size={18} color="var(--tc-dorado)" />
        </Link>
      </div>
    </article>
  )
}
