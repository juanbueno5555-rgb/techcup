import type { Metadata } from 'next'
import { NoticiasView } from '@/components/app/noticias-view'

export const metadata: Metadata = {
  title: 'Noticias — TechCup',
  description: 'Últimas noticias, novedades y comunicados del torneo TechCup.',
}

export default function NoticiasPage() {
  return <NoticiasView />
}
