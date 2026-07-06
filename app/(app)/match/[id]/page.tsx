import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MatchDetail } from '@/components/app/match-detail'
import { getMatch, matchEvents, matchStats, formations } from '@/lib/data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const match = getMatch(id)
  if (!match) return { title: 'Partido — TechCup' }
  return {
    title: `${match.local.nombre} vs ${match.visitante.nombre} — TechCup`,
    description: `Sigue el partido ${match.local.nombre} contra ${match.visitante.nombre} en ${match.campo}.`,
  }
}

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const match = getMatch(id)
  if (!match) notFound()

  const events = matchEvents.filter((e) => e.matchId === id)
  const formation = formations[0]

  return (
    <MatchDetail match={match} events={events} stats={matchStats} formation={formation} />
  )
}
