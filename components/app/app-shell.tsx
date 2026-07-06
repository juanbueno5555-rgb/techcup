'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MSymbol } from './ui'
import { PRIMARY_NAV, SECONDARY_NAV, ACCOUNT_NAV, titleForPath, type NavItem } from './nav-config'
import { useRole, useSession } from '@/lib/session'
import { conversations } from '@/lib/data'

const unread = conversations.reduce((sum, c) => sum + c.noLeidos, 0)

function isActive(pathname: string, href: string) {
  if (href === '/dashboard') return pathname === '/dashboard'
  return pathname === href || pathname.startsWith(href.split('/').slice(0, 2).join('/') + '/')
}

function badgeFor(href: string) {
  return href === '/chat' && unread > 0 ? unread : undefined
}

function SidebarLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActive(pathname, item.href)
  const badge = badgeFor(item.href)
  return (
    <Link
      href={item.href}
      className={`app-nav-link${active ? ' app-nav-link--active' : ''}`}
      aria-current={active ? 'page' : undefined}
    >
      <MSymbol name={item.icon} size={20} fill={active} />
      <span>{item.label}</span>
      {badge ? <span className="app-nav-link__badge">{badge}</span> : null}
    </Link>
  )
}

function nameFromEmail(email?: string) {
  if (!email) return 'Invitado'
  const base = email.split('@')[0].replace(/[._-]+/g, ' ')
  return base.charAt(0).toUpperCase() + base.slice(1)
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { rol } = useRole()
  const { session } = useSession()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  const accountVisible = ACCOUNT_NAV.filter((i) => !i.roles || i.roles.includes(rol))
  const title = titleForPath(pathname)
  const userName = nameFromEmail(session?.email)

  return (
    <div className="app-shell">
      {/* ---------- Desktop sidebar ---------- */}
      <aside className="app-sidebar" aria-label="Navegación lateral">
        <Link href="/dashboard" className="app-sidebar__brand">
          <img src="/manchas.png" alt="" />
          <span>
            <span className="app-sidebar__brand-name">TechCup</span>
            <span className="app-sidebar__brand-sub">Fútbol · Ing. Sistemas</span>
          </span>
        </Link>

        <nav aria-label="Principal">
          {PRIMARY_NAV.map((item) => (
            <SidebarLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <p className="app-nav-group__label">Explorar</p>
        <nav aria-label="Explorar">
          {SECONDARY_NAV.map((item) => (
            <SidebarLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <p className="app-nav-group__label">Cuenta</p>
        <nav aria-label="Cuenta">
          {accountVisible.map((item) => (
            <SidebarLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="app-sidebar__promo">
          <p>
            La pasión nos une, <span className="accent">la ingeniería</span> nos impulsa.
          </p>
          <Link href="/tournaments" className="app-sidebar__promo-btn">
            Conoce más
            <MSymbol name="arrow_forward" size={16} />
          </Link>
        </div>

        <div className="app-sidebar__user">
          <span className="app-sidebar__user-avatar">{userName.charAt(0)}</span>
          <span style={{ minWidth: 0 }}>
            <span style={{ display: 'block', fontWeight: 700, fontSize: 14, color: 'var(--tc-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {userName}
            </span>
            <span style={{ display: 'block', fontSize: 12, color: 'var(--tc-text-muted)' }}>{rol}</span>
          </span>
        </div>
      </aside>

      {/* ---------- Content column ---------- */}
      <div className="app-shell__content">
        {/* Mobile header */}
        <header className="app-mobile-header glass-darker">
          <button
            type="button"
            className="app-icon-btn"
            aria-label="Abrir menú"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <MSymbol name="menu" size={24} />
          </button>
          <p className="app-mobile-header__title">{title}</p>
          <button type="button" className="app-icon-btn" aria-label="3 notificaciones">
            <MSymbol name="notifications" size={22} />
            <span className="app-bottom-nav__badge" style={{ top: 6, right: 6 }}>3</span>
          </button>
        </header>

        {children}
      </div>

      {/* ---------- Mobile drawer ---------- */}
      {drawerOpen && (
        <>
          <div className="app-drawer-overlay" onClick={() => setDrawerOpen(false)} />
          <div className="app-drawer" role="dialog" aria-label="Menú de navegación" aria-modal="true">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <Link href="/dashboard" className="app-sidebar__brand" style={{ padding: '6px 8px' }}>
                <img src="/manchas.png" alt="" />
                <span>
                  <span className="app-sidebar__brand-name">TechCup</span>
                  <span className="app-sidebar__brand-sub">Fútbol · Ing. Sistemas</span>
                </span>
              </Link>
              <button type="button" className="app-icon-btn" aria-label="Cerrar menú" onClick={() => setDrawerOpen(false)}>
                <MSymbol name="close" size={22} />
              </button>
            </div>

            <p className="app-nav-group__label">Explorar</p>
            <nav aria-label="Explorar">
              {SECONDARY_NAV.map((item) => (
                <SidebarLink key={item.href} item={item} pathname={pathname} />
              ))}
            </nav>

            <p className="app-nav-group__label">Cuenta y roles</p>
            <nav aria-label="Cuenta y roles">
              {accountVisible.map((item) => (
                <SidebarLink key={item.href} item={item} pathname={pathname} />
              ))}
            </nav>

            <div className="app-sidebar__user" style={{ marginTop: 'auto' }}>
              <span className="app-sidebar__user-avatar">{userName.charAt(0)}</span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontWeight: 700, fontSize: 14 }}>{userName}</span>
                <span style={{ display: 'block', fontSize: 12, color: 'var(--tc-text-muted)' }}>{rol}</span>
              </span>
            </div>
          </div>
        </>
      )}

      {/* ---------- Mobile bottom nav ---------- */}
      <nav className="app-bottom-nav glass-darker" aria-label="Navegación principal">
        {PRIMARY_NAV.map((item) => {
          const active = isActive(pathname, item.href)
          const badge = badgeFor(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`app-bottom-nav__item${active ? ' app-bottom-nav__item--active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <MSymbol name={item.icon} size={24} fill={active} />
              <span className="app-bottom-nav__label">{item.label}</span>
              {badge ? <span className="app-bottom-nav__badge">{badge}</span> : null}
            </Link>
          )
        })}
        <button
          type="button"
          className="app-bottom-nav__item"
          aria-label="Más opciones"
          onClick={() => setDrawerOpen(true)}
        >
          <MSymbol name="menu" size={24} />
          <span className="app-bottom-nav__label">Más</span>
        </button>
      </nav>
    </div>
  )
}
