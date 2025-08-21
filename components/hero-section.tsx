import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="bg-cyan-400 w-11/12 mx-auto rounded-2xl py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Simple Product Management</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Manage your products efficiently with our easy-to-use platform. Add, edit, and organize your inventory with
            just a few clicks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/products">View Products</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
