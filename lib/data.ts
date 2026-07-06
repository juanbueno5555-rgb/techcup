// TechCup mock data (frontend-only prototype)

export type Rol = 'Jugador' | 'Capitán' | 'Organizador' | 'Árbitro'

export const ROLES: { value: Rol; icon: string; desc: string }[] = [
  { value: 'Jugador', icon: 'sports_soccer', desc: 'Consulta partidos y estadísticas' },
  { value: 'Capitán', icon: 'shield', desc: 'Gestiona tu equipo y alineación' },
  { value: 'Organizador', icon: 'admin_panel_settings', desc: 'Administra torneos y calendarios' },
  { value: 'Árbitro', icon: 'sports', desc: 'Registra eventos y resultados' },
]

export type EstadoTorneo =
  | 'Borrador'
  | 'Activo'
  | 'En progreso'
  | 'Finalizado'

export type EstadoPartido = 'En vivo' | 'Próximo' | 'Finalizado'

export interface TeamRef {
  nombre: string
  abbr: string
  color: string
}

export const teams: Record<string, TeamRef> = {
  ingenieria: { nombre: 'Ingeniería', abbr: 'ING', color: '#7c3aed' },
  sistemas: { nombre: 'Sistemas', abbr: 'SIS', color: '#f59e0b' },
  arquitectura: { nombre: 'Arquitectura', abbr: 'ARQ', color: '#22c55e' },
  ciencias: { nombre: 'Ciencias', abbr: 'CIE', color: '#ef4444' },
  diseno: { nombre: 'Diseño', abbr: 'DIS', color: '#38bdf8' },
  admin: { nombre: 'Administración', abbr: 'ADM', color: '#e879f9' },
}

export interface Match {
  id: string
  local: TeamRef
  visitante: TeamRef
  golesLocal: number
  golesVisitante: number
  minuto: number
  estado: EstadoPartido
  campo: string
  fecha?: string
}

export const matches: Match[] = [
  {
    id: 'm1',
    local: teams.ingenieria,
    visitante: teams.sistemas,
    golesLocal: 2,
    golesVisitante: 1,
    minuto: 67,
    estado: 'En vivo',
    campo: 'Campo 1',
  },
  {
    id: 'm2',
    local: teams.arquitectura,
    visitante: teams.ciencias,
    golesLocal: 0,
    golesVisitante: 0,
    minuto: 12,
    estado: 'En vivo',
    campo: 'Campo 3',
  },
  {
    id: 'm3',
    local: teams.diseno,
    visitante: teams.admin,
    golesLocal: 0,
    golesVisitante: 0,
    minuto: 0,
    estado: 'Próximo',
    campo: 'Campo 2',
    fecha: 'Sáb 14 Feb · 10:00',
  },
  {
    id: 'm4',
    local: teams.sistemas,
    visitante: teams.arquitectura,
    golesLocal: 0,
    golesVisitante: 0,
    minuto: 0,
    estado: 'Próximo',
    campo: 'Campo 1',
    fecha: 'Dom 15 Feb · 15:30',
  },
  {
    id: 'm5',
    local: teams.ciencias,
    visitante: teams.diseno,
    golesLocal: 3,
    golesVisitante: 1,
    minuto: 90,
    estado: 'Finalizado',
    campo: 'Campo 2',
    fecha: 'Mié 11 Feb',
  },
  {
    id: 'm6',
    local: teams.admin,
    visitante: teams.ingenieria,
    golesLocal: 0,
    golesVisitante: 4,
    minuto: 90,
    estado: 'Finalizado',
    campo: 'Campo 3',
    fecha: 'Mar 10 Feb',
  },
]

export interface Standing {
  posicion: number
  equipo: string
  pj: number
  pg: number
  pe: number
  pp: number
  gf: number
  gc: number
  dg: number
  pts: number
}

export const standings: Standing[] = [
  { posicion: 1, equipo: 'Ingeniería', pj: 8, pg: 6, pe: 1, pp: 1, gf: 18, gc: 7, dg: 11, pts: 19 },
  { posicion: 2, equipo: 'Sistemas', pj: 8, pg: 5, pe: 2, pp: 1, gf: 15, gc: 8, dg: 7, pts: 17 },
  { posicion: 3, equipo: 'Arquitectura', pj: 8, pg: 4, pe: 2, pp: 2, gf: 12, gc: 9, dg: 3, pts: 14 },
  { posicion: 4, equipo: 'Ciencias', pj: 8, pg: 3, pe: 3, pp: 2, gf: 10, gc: 11, dg: -1, pts: 12 },
  { posicion: 5, equipo: 'Diseño', pj: 8, pg: 2, pe: 2, pp: 4, gf: 8, gc: 14, dg: -6, pts: 8 },
  { posicion: 6, equipo: 'Administración', pj: 8, pg: 0, pe: 2, pp: 6, gf: 5, gc: 20, dg: -15, pts: 2 },
]

export interface Tournament {
  id: string
  nombre: string
  descripcion: string
  equipos: number
  estado: EstadoTorneo
  fecha: string
}

export const tournaments: Tournament[] = [
  {
    id: 't1',
    nombre: 'Liga Interna ECI 2026',
    descripcion: 'Liga de fútbol sala entre programas de la facultad.',
    equipos: 8,
    estado: 'En progreso',
    fecha: 'Feb 2026',
  },
  {
    id: 't2',
    nombre: 'Copa DOSW Tech',
    descripcion: 'Torneo inter-universitario de programas de ingeniería.',
    equipos: 16,
    estado: 'En progreso',
    fecha: 'Mar 2026',
  },
  {
    id: 't3',
    nombre: 'Liga Profesional ECI',
    descripcion: 'Liga principal de la decanatura con los mejores equipos.',
    equipos: 10,
    estado: 'Activo',
    fecha: 'Ago 2026',
  },
  {
    id: 't4',
    nombre: 'Copa Amistad 2025',
    descripcion: 'Torneo de integración entre semestres.',
    equipos: 12,
    estado: 'Finalizado',
    fecha: 'Nov 2025',
  },
  {
    id: 't5',
    nombre: 'Torneo Relámpago',
    descripcion: 'Eliminación directa en un solo fin de semana.',
    equipos: 8,
    estado: 'Borrador',
    fecha: 'Abr 2026',
  },
  {
    id: 't6',
    nombre: 'Supercopa TechCup',
    descripcion: 'Enfrentamiento entre los campeones de cada liga.',
    equipos: 4,
    estado: 'Activo',
    fecha: 'Jul 2026',
  },
]

export type EventType = 'gol' | 'amarilla' | 'roja' | 'sustitucion'

export interface MatchEvent {
  id: string
  matchId: string
  tipo: EventType
  minuto: number
  jugador: string
  detalle?: string
}

export const matchEvents: MatchEvent[] = [
  { id: 'e1', matchId: 'm1', tipo: 'gol', minuto: 23, jugador: 'Juan Pérez' },
  { id: 'e2', matchId: 'm1', tipo: 'amarilla', minuto: 45, jugador: 'Carlos Gómez' },
  { id: 'e3', matchId: 'm1', tipo: 'gol', minuto: 52, jugador: 'Andrés Villa' },
  { id: 'e4', matchId: 'm1', tipo: 'sustitucion', minuto: 60, jugador: 'Luis Torres', detalle: 'Entra Luis Torres / Sale Diego Mora' },
  { id: 'e5', matchId: 'm1', tipo: 'gol', minuto: 71, jugador: 'Mateo Ríos' },
  { id: 'e6', matchId: 'm1', tipo: 'roja', minuto: 78, jugador: 'Pedro Ruiz' },
]

export interface Formation {
  id: string
  nombre: string
  // normalized positions (x: 0-100 width, y: 0-100 height, own half at bottom)
  posiciones: { x: number; y: number; dorsal: number; pos: string }[]
}

export const formations: Formation[] = [
  {
    id: '2-3-1',
    nombre: '2-3-1',
    posiciones: [
      { x: 50, y: 90, dorsal: 1, pos: 'Portero' },
      { x: 32, y: 70, dorsal: 2, pos: 'Defensa' },
      { x: 68, y: 70, dorsal: 3, pos: 'Defensa' },
      { x: 22, y: 45, dorsal: 6, pos: 'Medio' },
      { x: 50, y: 45, dorsal: 8, pos: 'Medio' },
      { x: 78, y: 45, dorsal: 7, pos: 'Medio' },
      { x: 50, y: 20, dorsal: 10, pos: 'Delantero' },
    ],
  },
  {
    id: '3-2-1',
    nombre: '3-2-1',
    posiciones: [
      { x: 50, y: 90, dorsal: 1, pos: 'Portero' },
      { x: 25, y: 70, dorsal: 2, pos: 'Defensa' },
      { x: 50, y: 72, dorsal: 4, pos: 'Defensa' },
      { x: 75, y: 70, dorsal: 3, pos: 'Defensa' },
      { x: 35, y: 45, dorsal: 8, pos: 'Medio' },
      { x: 65, y: 45, dorsal: 6, pos: 'Medio' },
      { x: 50, y: 20, dorsal: 10, pos: 'Delantero' },
    ],
  },
  {
    id: '4-1-1',
    nombre: '4-1-1',
    posiciones: [
      { x: 50, y: 90, dorsal: 1, pos: 'Portero' },
      { x: 20, y: 68, dorsal: 2, pos: 'Defensa' },
      { x: 40, y: 72, dorsal: 4, pos: 'Defensa' },
      { x: 60, y: 72, dorsal: 5, pos: 'Defensa' },
      { x: 80, y: 68, dorsal: 3, pos: 'Defensa' },
      { x: 50, y: 45, dorsal: 8, pos: 'Medio' },
      { x: 50, y: 20, dorsal: 10, pos: 'Delantero' },
    ],
  },
  {
    id: '1-3-2',
    nombre: '1-3-2',
    posiciones: [
      { x: 50, y: 90, dorsal: 1, pos: 'Portero' },
      { x: 50, y: 70, dorsal: 4, pos: 'Defensa' },
      { x: 25, y: 48, dorsal: 6, pos: 'Medio' },
      { x: 50, y: 48, dorsal: 8, pos: 'Medio' },
      { x: 75, y: 48, dorsal: 7, pos: 'Medio' },
      { x: 38, y: 22, dorsal: 9, pos: 'Delantero' },
      { x: 62, y: 22, dorsal: 10, pos: 'Delantero' },
    ],
  },
]

export interface MatchStat {
  label: string
  local: number
  visitante: number
  unidad?: string
}

export const matchStats: MatchStat[] = [
  { label: 'Posesión', local: 60, visitante: 40, unidad: '%' },
  { label: 'Tiros', local: 12, visitante: 7 },
  { label: 'Faltas', local: 8, visitante: 11 },
]

export interface Player {
  id: string
  nombre: string
  posicion: string
  dorsal: number
  foto?: string
  equipo: string
  equipoColor: string
  stats: {
    goles: number
    asistencias: number
    amarillas: number
    rojas: number
    faltasCometidas: number
    faltasRecibidas: number
    partidos: number
    minutos: number
    sustituciones: number
    sancion: boolean
  }
}

export const players: Player[] = [
  {
    id: '10',
    nombre: 'Juan Pérez',
    posicion: 'Delantero',
    dorsal: 10,
    equipo: 'Ingeniería',
    equipoColor: '#7c3aed',
    stats: {
      goles: 10,
      asistencias: 5,
      amarillas: 2,
      rojas: 0,
      faltasCometidas: 8,
      faltasRecibidas: 12,
      partidos: 5,
      minutos: 450,
      sustituciones: 3,
      sancion: false,
    },
  },
  {
    id: '7',
    nombre: 'Andrés Villa',
    posicion: 'Extremo',
    dorsal: 7,
    equipo: 'Ingeniería',
    equipoColor: '#7c3aed',
    stats: { goles: 8, asistencias: 7, amarillas: 3, rojas: 0, faltasCometidas: 6, faltasRecibidas: 9, partidos: 5, minutos: 420, sustituciones: 2, sancion: false },
  },
  {
    id: '9',
    nombre: 'Carlos Gómez',
    posicion: 'Delantero',
    dorsal: 9,
    equipo: 'Sistemas',
    equipoColor: '#f59e0b',
    stats: { goles: 7, asistencias: 2, amarillas: 4, rojas: 1, faltasCometidas: 11, faltasRecibidas: 5, partidos: 5, minutos: 440, sustituciones: 1, sancion: true },
  },
  {
    id: '11',
    nombre: 'Mateo Ríos',
    posicion: 'Mediocampista',
    dorsal: 11,
    equipo: 'Arquitectura',
    equipoColor: '#22c55e',
    stats: { goles: 6, asistencias: 6, amarillas: 1, rojas: 0, faltasCometidas: 4, faltasRecibidas: 8, partidos: 5, minutos: 460, sustituciones: 0, sancion: false },
  },
  {
    id: '4',
    nombre: 'Diego Mora',
    posicion: 'Defensa',
    dorsal: 4,
    equipo: 'Ciencias',
    equipoColor: '#ef4444',
    stats: { goles: 2, asistencias: 3, amarillas: 5, rojas: 0, faltasCometidas: 14, faltasRecibidas: 3, partidos: 5, minutos: 450, sustituciones: 0, sancion: false },
  },
  {
    id: '8',
    nombre: 'Luis Torres',
    posicion: 'Mediocampista',
    dorsal: 8,
    equipo: 'Diseño',
    equipoColor: '#38bdf8',
    stats: { goles: 5, asistencias: 4, amarillas: 2, rojas: 0, faltasCometidas: 7, faltasRecibidas: 10, partidos: 5, minutos: 430, sustituciones: 2, sancion: false },
  },
]

/** Squad used for the tactical drag & drop view. */
export interface SquadPlayer {
  dorsal: number
  nombre: string
  pos: string
}

export const squad: SquadPlayer[] = [
  { dorsal: 1, nombre: 'M. Soto', pos: 'POR' },
  { dorsal: 2, nombre: 'A. Ruiz', pos: 'DEF' },
  { dorsal: 3, nombre: 'C. Díaz', pos: 'DEF' },
  { dorsal: 6, nombre: 'J. León', pos: 'MED' },
  { dorsal: 8, nombre: 'L. Torres', pos: 'MED' },
  { dorsal: 7, nombre: 'A. Villa', pos: 'MED' },
  { dorsal: 10, nombre: 'J. Pérez', pos: 'DEL' },
  { dorsal: 5, nombre: 'R. Cano', pos: 'DEF' },
  { dorsal: 9, nombre: 'M. Ríos', pos: 'DEL' },
]

export interface NewsItem {
  id: string
  titulo: string
  resumen: string
  categoria: string
  fecha: string
}

export const newsItems: NewsItem[] = [
  { id: 'n1', titulo: 'El Torneo de Apertura 2026 ya tiene fecha', resumen: 'La fase de grupos arranca en febrero. Inscribe a tu equipo antes del cierre.', categoria: 'Torneo', fecha: 'Hace 1 h' },
  { id: 'n2', titulo: 'Ingeniería lidera la tabla tras la quinta fecha', resumen: 'Con 19 puntos, el equipo de Sistemas se afianza en la cima de la Liga Interna ECI.', categoria: 'Resultados', fecha: 'Hace 4 h' },
  { id: 'n3', titulo: 'Nuevas reglas de acumulación de tarjetas', resumen: 'A partir de esta fecha, la tercera amarilla implica suspensión automática.', categoria: 'Reglamento', fecha: 'Hace 12 h' },
  { id: 'n4', titulo: 'Refrigerios saludables para todos los partidos', resumen: 'La organización habilita nuevos puntos de hidratación en cada cancha.', categoria: 'Logística', fecha: 'Hace 1 día' },
]

export interface LogisticItem {
  id: string
  nombre: string
  tipo: 'Refrigerio' | 'Dotación'
  detalle: string
  estado: 'Entregado' | 'Pendiente'
  responsable: string
}

export const logistics: LogisticItem[] = [
  { id: 'l1', nombre: 'Barra energética Pro', tipo: 'Refrigerio', detalle: '250 kcal · Punto Sur', estado: 'Entregado', responsable: 'A. Restrepo' },
  { id: 'l2', nombre: 'Bebida isotónica', tipo: 'Refrigerio', detalle: '80 kcal · Punto Norte', estado: 'Entregado', responsable: 'A. Restrepo' },
  { id: 'l3', nombre: 'Kit de petos (x14)', tipo: 'Dotación', detalle: 'Cancha 1 · Ingeniería', estado: 'Pendiente', responsable: 'M. Lozano' },
  { id: 'l4', nombre: 'Balones oficiales (x6)', tipo: 'Dotación', detalle: 'Bodega central', estado: 'Entregado', responsable: 'M. Lozano' },
  { id: 'l5', nombre: 'Bowl de frutas', tipo: 'Refrigerio', detalle: '120 kcal · Punto Central', estado: 'Pendiente', responsable: 'A. Restrepo' },
]

export interface RuleSection {
  id: string
  numero: number
  titulo: string
  intro: string
  articulos: { titulo: string; texto: string }[]
}

export const rules: RuleSection[] = [
  {
    id: 'generalidades',
    numero: 1,
    titulo: 'Generalidades',
    intro: 'El presente reglamento establece las normas que regirán el torneo TechCup Fútbol, garantizando el juego limpio y el respeto entre los participantes.',
    articulos: [
      { titulo: 'Art. 1.1 — Ámbito de aplicación', texto: 'Estas disposiciones son de cumplimiento obligatorio para jugadores, cuerpo técnico, delegados y público asistente a los encuentros programados por la organización.' },
    ],
  },
  {
    id: 'inscripciones',
    numero: 2,
    titulo: 'Inscripciones y planillas',
    intro: 'La participación está sujeta a la correcta inscripción del equipo y a la validación del estatus académico de cada integrante.',
    articulos: [
      { titulo: 'Cupos por equipo', texto: 'Cada equipo podrá inscribir un mínimo de 15 y un máximo de 25 jugadores, todos estudiantes activos.' },
      { titulo: 'Cierre de planillas', texto: 'Las planillas se cerrarán antes de iniciar la tercera fecha de la fase de grupos.' },
    ],
  },
  {
    id: 'sistema',
    numero: 3,
    titulo: 'Sistema de juego',
    intro: 'Los partidos se disputan en formato de fútbol 7 con las formaciones tácticas permitidas por la organización.',
    articulos: [
      { titulo: 'Formaciones', texto: 'Se permiten las formaciones 3-2-1, 2-3-1, 4-1-1 y 1-3-2. La predeterminada es 2-3-1.' },
      { titulo: 'Sustituciones', texto: 'El capitán realiza los ajustes tácticos; el árbitro registra el minuto de cada cambio.' },
    ],
  },
  {
    id: 'sanciones',
    numero: 4,
    titulo: 'Sanciones',
    intro: 'El sistema aplica reglas automáticas de acumulación de tarjetas.',
    articulos: [
      { titulo: 'Art. 4.3 — Acumulación de amarillas', texto: 'Al alcanzar tres tarjetas amarillas, el jugador queda suspendido para el siguiente partido.' },
      { titulo: 'Tarjeta roja', texto: 'Una tarjeta roja implica suspensión automática y notificación al capitán y al árbitro.' },
    ],
  },
]

export function getPlayer(id: string): Player {
  return players.find((p) => p.id === id) ?? players[0]
}

export function getMatch(id: string): Match | undefined {
  return matches.find((m) => m.id === id)
}

export interface ChatMessage {
  id: string
  autor: string
  texto: string
  propio: boolean
}

export interface Conversation {
  id: string
  tipo: 'equipo' | 'soporte' | 'directo'
  titulo: string
  subtitulo: string
  icon: string
  noLeidos: number
  mensajes: ChatMessage[]
}

export const conversations: Conversation[] = [
  {
    id: 'c1',
    tipo: 'equipo',
    titulo: 'Chat de Ingeniería',
    subtitulo: 'Grupo del equipo',
    icon: 'groups',
    noLeidos: 3,
    mensajes: [
      { id: 'cm1', autor: 'Andrés Villa', texto: '¡Hola team! ¿Confirmamos entreno el jueves?', propio: false },
      { id: 'cm2', autor: 'Tú', texto: 'Sí, a las 6 pm en Campo 1.', propio: true },
      { id: 'cm3', autor: 'Diego Mora', texto: 'Nos vemos el sábado para el partido.', propio: false },
    ],
  },
  {
    id: 'c2',
    tipo: 'soporte',
    titulo: 'Ayuda y soporte',
    subtitulo: 'Asistente TechCup',
    icon: 'support_agent',
    noLeidos: 0,
    mensajes: [
      { id: 'cm4', autor: 'Asistente', texto: 'Hola, soy el asistente de TechCup. ¿En qué puedo ayudarte?', propio: false },
    ],
  },
  {
    id: 'c3',
    tipo: 'directo',
    titulo: 'Juan Pérez',
    subtitulo: 'Mensaje directo',
    icon: 'person',
    noLeidos: 0,
    mensajes: [
      { id: 'cm5', autor: 'Juan Pérez', texto: '¿Llevas los petos al partido?', propio: false },
    ],
  },
]

export const noticias = {
  titulo: 'El Torneo de Apertura 2026 ya tiene fecha',
  resumen:
    'La Decanatura de Ingeniería de Sistemas confirmó que la fase de grupos arranca en febrero. Inscribe a tu equipo y asegura tu cupo antes del cierre.',
}
