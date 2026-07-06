import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { Standings } from '@/components/landing/standings'
import { TournamentsPreview, LiveMatches } from '@/components/landing/sections'
import { CommunityStrip } from '@/components/landing/community'
import { Footer } from '@/components/landing/footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TournamentsPreview />
        <CommunityStrip />
        <Standings />
        <LiveMatches />
      </main>
      <Footer />
    </>
  )
}
