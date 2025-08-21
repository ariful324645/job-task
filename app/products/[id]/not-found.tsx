import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8">Sorry, we couldn't find the product you're looking for.</p>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/products">View All Products</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
