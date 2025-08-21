import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { mockProducts, type Product } from "@/lib/mock-data"

// In-memory storage for demo purposes
const products: Product[] = [...mockProducts]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    const product = products.find((p) => p.id === id)

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()

    const productIndex = products.findIndex((p) => p.id === id)
    if (productIndex === -1) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    // Update product
    const updatedProduct = {
      ...products[productIndex],
      ...body,
      id, // Ensure ID doesn't change
      price: body.price ? Number(body.price) : products[productIndex].price,
    }

    products[productIndex] = updatedProduct

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    const productIndex = products.findIndex((p) => p.id === id)
    if (productIndex === -1) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    // Remove product
    const deletedProduct = products.splice(productIndex, 1)[0]

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json({
      success: true,
      data: deletedProduct,
      message: "Product deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 })
  }
}
