"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check, X, Loader2 } from "lucide-react"
import { productsApi } from "@/lib/api"
import type { Product } from "@/lib/mock-data"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await productsApi.getById(params.id)
        if (response.success && response.data) {
          setProduct(response.data)
        } else {
          setError("Product not found")
        }
      } catch (error) {
        setError("Failed to load product")
        console.error("[v0] Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading product...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/products" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                <Badge variant={product.inStock ? "default" : "secondary"}>
                  {product.inStock ? (
                    <div className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      In Stock
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <X className="w-3 h-3" />
                      Out of Stock
                    </div>
                  )}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">{product.description}</p>
              <div className="text-3xl font-bold text-primary mb-6">${product.price}</div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button size="lg" className="w-full" disabled={!product.inStock}>
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button variant="outline" size="lg" className="w-full bg-transparent">
                Add to Wishlist
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Free shipping on orders over $50</p>
              <p>30-day return policy</p>
              <p>1-year warranty included</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Product Details</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <p className="text-muted-foreground">
                  This {product.name.toLowerCase()} is designed with quality and functionality in mind. Perfect for both
                  personal and professional use, it combines modern technology with user-friendly design to deliver
                  exceptional performance.
                </p>
                <p className="text-muted-foreground mt-4">
                  Each product comes with comprehensive documentation and customer support to ensure you get the most
                  out of your purchase. Our team is committed to providing excellent service and standing behind every
                  product we sell.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
