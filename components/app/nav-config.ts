export interface NavItem {
  href: string
  label: string
  icon: string
  /** roles allowed to see this item; undefined = everyone */
  roles?: string[]
}

/** Primary destinations — shown in the mobile bottom bar and top of the sidebar. */
export const PRIMARY_NAV: NavItem[] = [
  { href: '/dashboard', label: 'Inicio', icon: 'home' },
  { href: '/partidos', label: 'Partidos', icon: 'sports_soccer' },
  { href: '/posiciones', label: 'Posiciones', icon: 'leaderboard' },
  { href: '/chat', label: 'Chat', icon: 'chat' },
]

/** Browsing / discovery destinations — sidebar + hamburger drawer. */
export const SECONDARY_NAV: NavItem[] = [
  { href: '/tournaments', label: 'Torneos', icon: 'emoji_events' },
  { href: '/equipos', label: 'Equipos', icon: 'shield' },
  { href: '/estadisticas', label: 'Estadísticas', icon: 'bar_chart' },
  { href: '/noticias', label: 'Noticias', icon: 'newspaper' },
  { href: '/campus', label: 'Campus y logística', icon: 'restaurant' },
  { href: '/reglamento', label: 'Reglamento', icon: 'menu_book' },
  { href: '/historial', label: 'Historial', icon: 'history' },
]

/** Account & role panels — hamburger drawer bottom + sidebar footer. */
export const ACCOUNT_NAV: NavItem[] = [
  { href: '/perfil/10', label: 'Perfil', icon: 'person' },
  { href: '/arbitro', label: 'Panel del Árbitro', icon: 'sports', roles: ['Árbitro', 'Organizador'] },
  { href: '/organizador', label: 'Panel del Organizador', icon: 'admin_panel_settings', roles: ['Organizador'] },
  { href: '/configuracion', label: 'Configuración', icon: 'settings' },
]

const ALL = [...PRIMARY_NAV, ...SECONDARY_NAV, ...ACCOUNT_NAV]

/** Derive a human page title from the current pathname. */
export function titleForPath(pathname: string): string {
  if (pathname.startsWith('/match')) return 'Detalle del partido'
  if (pathname.startsWith('/perfil')) return 'Perfil'
  const match = ALL.find(
    (i) => i.href === pathname || (i.href !== '/dashboard' && pathname.startsWith(i.href)),
  )
  return match?.label ?? 'TechCup'
}
