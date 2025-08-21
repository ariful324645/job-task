import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/mock-data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
   <div className="bg-white">
     <Card className="h-full  flex flex-col">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover rounded-t-lg"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={product.inStock ? "default" : "secondary"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4">
        <div className="flex-1">
          <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
          <CardDescription className="text-sm mb-3 line-clamp-2">{product.description}</CardDescription>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-primary">${product.price}</span>
            <Badge variant="outline">{product.category}</Badge>
          </div>
        </div>
        <Button asChild className="w-full">
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
   </div>
  )
}
