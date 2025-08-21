"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { productsApi } from "@/lib/api"
import type { Product } from "@/lib/mock-data"
import { Loader2 } from "lucide-react"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await productsApi.getAll()
        if (response.success && response.data) {
          setProducts(response.data)
        } else {
          setError("Failed to load products")
        }
      } catch (error) {
        setError("Failed to load products")
        console.error("[v0] Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <p className="text-destructive mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="text-primary hover:underline">
              Try again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const categories = Array.from(new Set(products.map((product) => product.category)))

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Products</h1>
          <p className="text-lg text-muted-foreground">
            Discover our collection of high-quality products designed to enhance your daily life.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span key={category} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">Showing {products.length} products. More products coming soon!</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
