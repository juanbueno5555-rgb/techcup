import type { Metadata } from 'next'
import { MatchesView } from '@/components/app/matches-view'

export const metadata: Metadata = {
  title: 'Partidos — TechCup',
  description: 'Calendario, resultados en vivo y próximos partidos de la TechCup.',
}

export default function PartidosPage() {
  return <MatchesView />
}
