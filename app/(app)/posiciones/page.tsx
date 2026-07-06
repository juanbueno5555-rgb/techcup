import type { Metadata } from 'next'
import { StandingsView } from '@/components/app/standings-view'

export const metadata: Metadata = {
  title: 'Posiciones — TechCup',
  description: 'Tabla de posiciones de la Liga Interna ECI 2026.',
}

export default function PosicionesPage() {
  return <StandingsView />
}
