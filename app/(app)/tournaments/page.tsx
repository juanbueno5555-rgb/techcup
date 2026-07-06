import type { Metadata } from 'next'
import { TournamentsView } from '@/components/app/tournaments-view'

export const metadata: Metadata = {
  title: 'Torneos — TechCup',
  description: 'Descubre los torneos disponibles y sé parte de la competencia.',
}

export default function TournamentsPage() {
  return <TournamentsView />
}
