import type { Metadata } from 'next'
import { ProfileView } from '@/components/app/profile-view'
import { getPlayer } from '@/lib/data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const player = getPlayer(id)
  return {
    title: `${player.nombre} — TechCup`,
    description: `Perfil y estadísticas de ${player.nombre}, ${player.posicion} de ${player.equipo}.`,
  }
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const player = getPlayer(id)
  return <ProfileView player={player} />
}
