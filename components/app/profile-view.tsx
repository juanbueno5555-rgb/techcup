'use client'

import { useRouter } from 'next/navigation'
import { MSymbol, Overline } from './ui'
import { useSession, clearSession, useTheme } from '@/lib/session'
import type { Player } from '@/lib/data'

export function ProfileView({ player }: { player: Player }) {
  const router = useRouter()
  const { session } = useSession()
  const { theme, toggle } = useTheme()
  const s = player.stats

  function logout() {
    clearSession()
    router.push('/login')
  }

  const primary = [
    { label: 'Goles', value: s.goles, icon: 'sports_soccer', color: 'var(--tc-success)' },
    { label: 'Asistencias', value: s.asistencias, icon: 'handshake', color: 'var(--tc-violeta-light)' },
    { label: 'Partidos', value: s.partidos, icon: 'stadium', color: 'var(--tc-dorado)' },
    { label: 'Minutos', value: s.minutos, icon: 'timer', color: 'var(--tc-text-primary)' },
  ]

  const discipline = [
    { label: 'Amarillas', value: s.amarillas, icon: 'square', color: '#f59e0b' },
    { label: 'Rojas', value: s.rojas, icon: 'square', color: 'var(--tc-live-red)' },
    { label: 'Faltas cometidas', value: s.faltasCometidas, icon: 'sports', color: 'var(--tc-text-secondary)' },
    { label: 'Faltas recibidas', value: s.faltasRecibidas, icon: 'personal_injury', color: 'var(--tc-text-secondary)' },
    { label: 'Sustituciones', value: s.sustituciones, icon: 'swap_horiz', color: 'var(--tc-violeta-light)' },
  ]

  return (
    <main className="app-page" style={{ maxWidth: 780 }}>
      <div className="app-page__header">
        <h1 className="app-page__title">{player.nombre}</h1>
        <p className="app-page__subtitle">{player.posicion} · {player.equipo}</p>
      </div>
        {/* Identity card */}
        <section
          className="tc-card"
          style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'grid',
              placeItems: 'center',
              width: 88,
              height: 88,
              borderRadius: 999,
              flexShrink: 0,
              color: '#fff',
              fontFamily: 'var(--md-ref-typeface-brand)',
              fontWeight: 700,
              fontSize: 34,
              background: `radial-gradient(circle at 30% 25%, ${player.equipoColor}, rgba(0,0,0,0.4))`,
              border: '2px solid var(--tc-border-strong)',
            }}
          >
            {player.dorsal}
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h1 className="tc-heading" style={{ margin: 0, fontSize: 26 }}>
              {player.nombre}
            </h1>
            <p style={{ margin: '4px 0 12px', color: 'var(--tc-text-secondary)' }}>
              {player.posicion} · {player.equipo}
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="profile-tag">
                <MSymbol name="tag" size={15} color="var(--tc-dorado)" />
                Dorsal <span className="tc-num">{player.dorsal}</span>
              </span>
              <span
                className="profile-tag"
                style={{
                  color: s.sancion ? 'var(--tc-live-red)' : 'var(--tc-success)',
                  borderColor: s.sancion ? 'rgba(239,68,68,0.4)' : 'rgba(34,197,94,0.4)',
                }}
              >
                <MSymbol
                  name={s.sancion ? 'gavel' : 'verified'}
                  size={15}
                  color={s.sancion ? 'var(--tc-live-red)' : 'var(--tc-success)'}
                  fill
                />
                {s.sancion ? 'Sancionado' : 'Habilitado'}
              </span>
            </div>
          </div>
        </section>

        {/* Primary stats */}
        <section style={{ marginTop: 24 }}>
          <Overline color="var(--tc-violeta-light)">Rendimiento</Overline>
          <div className="dash-stats">
            {primary.map((st) => (
              <div key={st.label} className="tc-card dash-stat">
                <MSymbol name={st.icon} size={22} color={st.color} fill />
                <span className="tc-num dash-stat__value">{st.value}</span>
                <span className="dash-stat__label">{st.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Discipline */}
        <section style={{ marginTop: 24 }}>
          <Overline color="var(--tc-dorado)">Disciplina</Overline>
          <div className="tc-card" style={{ padding: 8 }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {discipline.map((d, i) => (
                <li
                  key={d.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderBottom:
                      i < discipline.length - 1 ? '1px solid var(--tc-border)' : 'none',
                  }}
                >
                  <span
                    style={{
                      display: 'grid',
                      placeItems: 'center',
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <MSymbol name={d.icon} size={18} color={d.color} fill />
                  </span>
                  <span style={{ flex: 1, color: 'var(--tc-text-primary)', fontWeight: 500 }}>
                    {d.label}
                  </span>
                  <span className="tc-num" style={{ fontWeight: 700, fontSize: 18 }}>
                    {d.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Account */}
        <section style={{ marginTop: 24 }}>
          <Overline>Cuenta</Overline>
          <div className="tc-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--tc-text-secondary)' }}>
              <MSymbol name="mail" size={18} color="var(--tc-text-muted)" />
              {session?.email ?? 'Invitado'}
            </div>

            <button type="button" onClick={toggle} className="profile-row">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <MSymbol
                  name={theme === 'dark' ? 'dark_mode' : 'light_mode'}
                  size={18}
                  color="var(--tc-violeta-light)"
                  fill
                />
                Tema {theme === 'dark' ? 'oscuro' : 'claro'}
              </span>
              <MSymbol name="chevron_right" size={20} color="var(--tc-text-muted)" />
            </button>

            <button type="button" onClick={logout} className="profile-logout">
              <MSymbol name="logout" size={18} color="#fff" />
              Cerrar sesión
            </button>
          </div>
        </section>
    </main>
  )
}
