import type { Metadata } from 'next'
import { EstadisticasView } from '@/components/app/estadisticas-view'

export const metadata: Metadata = {
  title: 'Estadísticas — TechCup',
  description: 'Tabla de posiciones, goleadores y disciplina del torneo TechCup.',
}

export default function EstadisticasPage() {
  return <EstadisticasView />
}
