import type { Metadata } from 'next'
import { HistorialView } from '@/components/app/historial-view'

export const metadata: Metadata = {
  title: 'Historial — TechCup',
  description: 'Historial de partidos, ediciones anteriores y registros del torneo.',
}

export default function HistorialPage() {
  return <HistorialView />
}
