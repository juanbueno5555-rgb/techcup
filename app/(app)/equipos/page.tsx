import type { Metadata } from 'next'
import { EquiposView } from '@/components/app/equipos-view'

export const metadata: Metadata = {
  title: 'Equipos — TechCup',
  description: 'Conoce los equipos participantes del torneo TechCup.',
}

export default function EquiposPage() {
  return <EquiposView />
}
