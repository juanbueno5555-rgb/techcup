import type { Formation } from '@/lib/data'

/** Football pitch with players positioned from a formation's normalized coords. */
export function Pitch({ formation, color }: { formation: Formation; color: string }) {
  return (
    <div className="md-pitch" role="img" aria-label={`Alineación en formación ${formation.nombre}`}>
      {/* Field markings */}
      <div className="md-pitch__line md-pitch__halfway" aria-hidden="true" />
      <div className="md-pitch__circle" aria-hidden="true" />
      <div className="md-pitch__box md-pitch__box--top" aria-hidden="true" />
      <div className="md-pitch__box md-pitch__box--bottom" aria-hidden="true" />

      {formation.posiciones.map((p) => (
        <div
          key={p.dorsal}
          className="md-pitch__player"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <span
            className="md-pitch__dot tc-num"
            style={{
              background: `radial-gradient(circle at 30% 25%, ${color}, rgba(0,0,0,0.4))`,
            }}
          >
            {p.dorsal}
          </span>
          <span className="md-pitch__pos">{p.pos}</span>
        </div>
      ))}
    </div>
  )
}
