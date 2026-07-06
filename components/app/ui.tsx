import type { CSSProperties } from 'react'
import type { EstadoTorneo, TeamRef } from '@/lib/data'

/** Material Symbols icon. Decorative by default. */
export function MSymbol({
  name,
  size = 20,
  fill = false,
  color,
  style,
  label,
}: {
  name: string
  size?: number
  fill?: boolean
  color?: string
  style?: CSSProperties
  label?: string
}) {
  return (
    <span
      className="material-symbols-outlined"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      style={{
        fontFamily: 'Material Symbols Outlined',
        fontSize: size,
        lineHeight: 1,
        color,
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}`,
        ...style,
      }}
    >
      {name}
    </span>
  )
}

/** Circular team badge with abbreviation. */
export function TeamCrest({
  team,
  size = 40,
}: {
  team: TeamRef
  size?: number
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'grid',
        placeItems: 'center',
        width: size,
        height: size,
        borderRadius: 999,
        flexShrink: 0,
        color: '#fff',
        fontFamily: 'var(--md-ref-typeface-brand)',
        fontWeight: 700,
        fontSize: size * 0.34,
        background: `radial-gradient(circle at 30% 25%, ${team.color}, rgba(0,0,0,0.35))`,
        border: '1px solid var(--tc-border-strong)',
        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.15)',
      }}
    >
      {team.abbr}
    </span>
  )
}

const badgeConfig: Record<
  EstadoTorneo | 'En vivo',
  { dot: string; icon: string }
> = {
  Borrador: { dot: '#64748b', icon: 'edit_note' },
  Activo: { dot: '#f59e0b', icon: 'bolt' },
  'En progreso': { dot: '#22c55e', icon: 'sports_soccer' },
  Finalizado: { dot: '#475569', icon: 'flag' },
  'En vivo': { dot: '#ef4444', icon: 'sensors' },
}

/** Status badge: dot + text + icon (never color alone). */
export function StatusBadge({
  estado,
}: {
  estado: EstadoTorneo | 'En vivo'
}) {
  const cfg = badgeConfig[estado]
  const live = estado === 'En vivo'
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 999,
        border: '1px solid var(--tc-border-strong)',
        background: 'rgba(255,255,255,0.04)',
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--tc-text-primary)',
        fontFamily: 'var(--md-ref-typeface-brand)',
        letterSpacing: '0.02em',
      }}
    >
      {live ? (
        <span className="live-dot" aria-hidden="true" />
      ) : (
        <span
          aria-hidden="true"
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: cfg.dot,
          }}
        />
      )}
      <span>{estado}</span>
      <MSymbol name={cfg.icon} size={14} color={cfg.dot} />
    </span>
  )
}

/** Small uppercase overline used above section headings. */
export function Overline({
  children,
  color = 'var(--tc-dorado)',
}: {
  children: React.ReactNode
  color?: string
}) {
  return (
    <p className="tc-overline" style={{ color, margin: '0 0 12px' }}>
      {children}
    </p>
  )
}
