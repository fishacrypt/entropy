import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { CreatorSection } from '@/components/CreatorSection'
import { Footer } from '@/components/Footer'

export default function App() {
  return (
    <div className="min-h-dvh bg-ink text-paper">
      <Nav />
      <main>
        <Hero />
        <CreatorSection />
      </main>
      <Footer />
    </div>
  )
}
