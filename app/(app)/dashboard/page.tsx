import type { Metadata } from 'next'
import { Dashboard } from '@/components/app/dashboard'

export const metadata: Metadata = {
  title: 'Panel — TechCup',
  description: 'Sigue partidos en vivo, la tabla de posiciones y los torneos de la TechCup.',
}

export default function DashboardPage() {
  return <Dashboard />
}
