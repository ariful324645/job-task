import type { Product } from "./mock-data"

const API_BASE_URL = "/api"

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  total?: number
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(data.error || "API request failed", response.status)
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError("Network error", 500)
  }
}

export const productsApi = {
  // Get all products
  getAll: (): Promise<ApiResponse<Product[]>> => apiRequest("/products"),

  // Get single product
  getById: (id: string): Promise<ApiResponse<Product>> => apiRequest(`/products/${id}`),

  // Create new product
  create: (product: Omit<Product, "id">): Promise<ApiResponse<Product>> =>
    apiRequest("/products", {
      method: "POST",
      body: JSON.stringify(product),
    }),

  // Update product
  update: (id: string, product: Partial<Product>): Promise<ApiResponse<Product>> =>
    apiRequest(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    }),

  // Delete product
  delete: (id: string): Promise<ApiResponse<Product>> =>
    apiRequest(`/products/${id}`, {
      method: "DELETE",
    }),
}
