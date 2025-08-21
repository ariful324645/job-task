export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
  features: string[]
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 199.99,
    image: "/wireless-bluetooth-headphones.png",
    category: "Electronics",
    inStock: true,
    features: ["Noise Cancellation", "30-hour Battery", "Bluetooth 5.0", "Quick Charge"],
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring.",
    price: 299.99,
    image: "/smart-fitness-watch.png",
    category: "Wearables",
    inStock: true,
    features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "7-day Battery"],
  },
  {
    id: "3",
    name: "Portable Laptop Stand",
    description: "Ergonomic aluminum laptop stand that's lightweight and adjustable for better posture.",
    price: 49.99,
    image: "/placeholder-dv72e.png",
    category: "Accessories",
    inStock: false,
    features: ["Adjustable Height", "Aluminum Build", "Portable Design", "Heat Dissipation"],
  },
  {
    id: "4",
    name: "USB-C Hub with HDMI",
    description: "Multi-port USB-C hub with HDMI output, USB 3.0 ports, and fast charging support.",
    price: 79.99,
    image: "/usb-c-hub-hdmi.png",
    category: "Accessories",
    inStock: true,
    features: ["HDMI 4K Output", "USB 3.0 Ports", "Fast Charging", "Compact Design"],
  },
  {
    id: "5",
    name: "Mechanical Gaming Keyboard",
    description: "RGB backlit mechanical keyboard with tactile switches perfect for gaming and typing.",
    price: 129.99,
    image: "/placeholder-3ffim.png",
    category: "Gaming",
    inStock: true,
    features: ["RGB Backlighting", "Mechanical Switches", "Anti-Ghosting", "Programmable Keys"],
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 34.99,
    image: "/wireless-charging-pad.png",
    category: "Accessories",
    inStock: true,
    features: ["Fast Charging", "Qi Compatible", "LED Indicator", "Non-slip Surface"],
  },
]

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return mockProducts.filter((product) => product.category === category)
}
