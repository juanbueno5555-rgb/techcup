import Link from 'next/link'
import type { Match } from '@/lib/data'
import { MSymbol, StatusBadge, TeamCrest } from './ui'

export function MatchCard({ match }: { match: Match }) {
  const live = match.estado === 'En vivo'
  const finished = match.estado === 'Finalizado'
  const showScore = live || finished

  return (
    <Link
      href={`/match/${match.id}`}
      className="tc-card"
      aria-label={`${match.local.nombre} contra ${match.visitante.nombre}. Ver detalles del partido.`}
      style={{
        display: 'block',
        padding: 20,
        textDecoration: 'none',
        color: 'inherit',
        boxShadow: live ? 'var(--tc-glow-red)' : undefined,
        borderColor: live ? 'rgba(239,68,68,0.35)' : undefined,
        transition: 'transform 160ms cubic-bezier(0.23,1,0.32,1), border-color 160ms ease-out',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        {live ? (
          <StatusBadge estado="En vivo" />
        ) : (
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--tc-text-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <MSymbol
              name={finished ? 'flag' : 'schedule'}
              size={14}
              color="var(--tc-text-secondary)"
            />
            {finished ? 'Finalizado' : match.fecha}
          </span>
        )}
        <span
          className="tc-num"
          style={{ fontSize: 12, color: 'var(--tc-text-muted)' }}
        >
          {live ? `${match.minuto}' · ` : ''}
          {match.campo}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <TeamCrest team={match.local} size={40} />
          <span
            className="tc-heading"
            style={{ fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {match.local.nombre}
          </span>
        </div>

        <div style={{ textAlign: 'center', minWidth: 64 }}>
          {showScore ? (
            <span
              className="tc-num"
              style={{ fontSize: 26, fontWeight: 700, color: 'var(--tc-text-primary)' }}
            >
              {match.golesLocal}
              <span style={{ color: 'var(--tc-text-muted)', margin: '0 6px' }}>-</span>
              {match.golesVisitante}
            </span>
          ) : (
            <span
              className="tc-heading"
              style={{ fontSize: 16, color: 'var(--tc-text-muted)' }}
            >
              VS
            </span>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            minWidth: 0,
            justifyContent: 'flex-end',
          }}
        >
          <span
            className="tc-heading"
            style={{ fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}
          >
            {match.visitante.nombre}
          </span>
          <TeamCrest team={match.visitante} size={40} />
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 4,
          color: 'var(--tc-violeta-light)',
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        Ver detalles
        <MSymbol name="arrow_forward" size={16} color="var(--tc-violeta-light)" />
      </div>
    </Link>
  )
}
