import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductHighlights } from "@/components/product-highlights"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <main>
        <HeroSection />
        <ProductHighlights />
      </main>
      <Footer />
    </div>
  )
}
