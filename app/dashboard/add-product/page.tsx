"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { productsApi } from "@/lib/api"
import { Loader2, Plus } from "lucide-react"

export default function AddProductPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    inStock: true,
    features: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirect if not authenticated
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!session) {
    router.push("/login")
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Validate form data
      if (!formData.name || !formData.description || !formData.price || !formData.category) {
        setError("Please fill in all required fields")
        return
      }

      if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
        setError("Please enter a valid price")
        return
      }

      // Prepare product data
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        image: formData.image || "/placeholder.svg",
        inStock: formData.inStock,
        features: formData.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      }

      // Call API to create product
      const response = await productsApi.create(productData)

      if (response.success) {
        console.log("[v0] Product created successfully:", response.data)

        // Show success toast
        toast({
          title: "Product Added Successfully!",
          description: `${formData.name} has been added to your product catalog.`,
        })

        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          image: "",
          inStock: true,
          features: "",
        })

        // Redirect to products page after a short delay
        setTimeout(() => {
          router.push("/products")
        }, 2000)
      } else {
        setError(response.error || "Failed to add product")
      }
    } catch (error) {
      setError("Failed to add product. Please try again.")
      console.error("[v0] Error adding product:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Add New Product</h1>
          <p className="text-lg text-muted-foreground">Fill out the form below to add a new product to your catalog.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Product Information
            </CardTitle>
            <CardDescription>Enter the details for your new product</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={handleSelectChange} value={formData.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Wearables">Wearables</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Gaming">Gaming</SelectItem>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Textarea
                  id="features"
                  name="features"
                  placeholder="Feature 1, Feature 2, Feature 3"
                  value={formData.features}
                  onChange={handleInputChange}
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  Enter product features separated by commas (e.g., "Wireless, Bluetooth 5.0, 30-hour battery")
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/products")} disabled={isLoading}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold text-foreground mb-2">Tips for Adding Products:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use clear, descriptive product names</li>
            <li>• Write detailed descriptions to help customers understand the product</li>
            <li>• Add high-quality image URLs for better visual appeal</li>
            <li>• List key features that make your product stand out</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}
