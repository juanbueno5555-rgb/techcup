'use client'

import { MSymbol } from '@/components/app/ui'

const roles = [
  { icon: 'school', label: 'Estudiantes' },
  { icon: 'manage_accounts', label: 'Administrativos' },
  { icon: 'workspace_premium', label: 'Graduados' },
  { icon: 'star', label: 'Invitados' },
]

export function CommunityStrip() {
  return (
    <section className="community-strip" aria-label="Plataforma para toda la comunidad">
      <div className="tc-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="community-strip__inner">
          <div className="community-strip__lead">
            <span
              style={{
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.2)',
              }}
            >
              <MSymbol name="groups" size={28} color="var(--tc-dorado)" fill />
            </span>
            <div>
              <p
                style={{
                  margin: '0 0 2px',
                  fontWeight: 700,
                  fontSize: 15,
                  color: 'var(--tc-dorado)',
                }}
              >
                Plataforma para toda la comunidad
              </p>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--tc-text-muted)' }}>
                Únete según tu rol y forma parte de la competencia.
              </p>
            </div>
          </div>

          <div className="community-strip__roles">
            {roles.map((r) => (
              <button
                key={r.label}
                type="button"
                className="community-strip__role"
              >
                <span className="community-strip__role-icon">
                  <MSymbol name={r.icon} size={22} color="var(--tc-text-secondary)" />
                </span>
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
