import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { mockProducts, type Product } from "@/lib/mock-data"

// In-memory storage for demo purposes (in real app, this would be a database)
const products: Product[] = [...mockProducts]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json({
      success: true,
      data: products,
      total: products.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    const { name, description, price, category } = body
    if (!name || !description || !price || !category) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Validate price
    if (isNaN(Number(price)) || Number(price) <= 0) {
      return NextResponse.json({ success: false, error: "Invalid price" }, { status: 400 })
    }

    // Create new product
    const newProduct: Product = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description,
      price: Number(body.price),
      category: body.category,
      image: body.image || "/placeholder.svg",
      inStock: body.inStock !== false, // Default to true
      features: Array.isArray(body.features) ? body.features : [],
    }

    // Add to products array
    products.push(newProduct)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 })
  }
}
