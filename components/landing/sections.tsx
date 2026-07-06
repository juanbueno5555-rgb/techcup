import Link from 'next/link'
import { matches, tournaments } from '@/lib/data'
import { MSymbol, Overline } from '@/components/app/ui'
import { TournamentCard } from '@/components/app/tournament-card'
import { MatchCard } from '@/components/app/match-card'
import { Ambient } from '@/components/landing/decor'

export function TournamentsPreview() {
  const featured = tournaments.filter((t) => t.estado !== 'Borrador').slice(0, 3)
  return (
    <section
      className="tc-section"
      style={{ background: 'var(--tc-base)', position: 'relative', overflow: 'hidden' }}
    >
      <Ambient lines={false} orbs="violet" particles={false} />
      <div className="tc-container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 16,
            marginBottom: 32,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Overline color="var(--tc-violeta-light)">Compite al máximo</Overline>
            <h2
              className="tc-heading"
              style={{ fontSize: 'clamp(28px, 5vw, 38px)', margin: '8px 0 6px', color: '#fff' }}
            >
              Torneos disponibles
            </h2>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--tc-text-muted)' }}>
              Elige tu torneo y demuestra de qué estás hecho.
            </p>
          </div>
          <Link
            href="/tournaments"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 20px',
              borderRadius: 999,
              border: '1px solid rgba(124,58,237,0.5)',
              color: 'var(--tc-violeta-light)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 13,
              transition: 'border-color 180ms, background 180ms',
            }}
          >
            Ver todos los torneos
            <MSymbol name="arrow_forward" size={16} color="var(--tc-violeta-light)" />
          </Link>
        </div>

        <div className="grid-3">
          {featured.map((t, i) => (
            <TournamentCard key={t.id} tournament={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function LiveMatches() {
  const live = matches.filter((m) => m.estado === 'En vivo')
  return (
    <section className="tc-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <Ambient lines={false} orbs="violet-gold" />
      <div className="tc-container" style={{ position: 'relative', zIndex: 1 }}>
        <Overline color="var(--tc-live-red)">Acción al instante</Overline>
        <h2 className="tc-heading" style={{ fontSize: 'clamp(28px, 5vw, 36px)', margin: '10px 0 16px' }}>
          Partidos en vivo
        </h2>
        <div className="tc-gradient-bar" style={{ marginBottom: 28 }} />
        <div className="grid-2">
          {live.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </div>
    </section>
  )
}
