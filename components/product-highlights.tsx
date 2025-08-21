import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Shield, Zap } from "lucide-react"

export function ProductHighlights() {
  const features = [
    {
      icon: Package,
      title: "Easy Product Management",
      description: "Add, edit, and organize your products with a simple and intuitive interface.",
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Your data is protected with secure authentication powered by NextAuth.js.",
    },
    {
      icon: Zap,
      title: "Fast & Responsive",
      description: "Built with Next.js 15 for optimal performance and user experience.",
    },
  ]

  return (
    <section className="py-20 w-11/12 mx-auto bg-blue-100 rounded-2xl mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Our Platform?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for simplicity and efficiency, our platform helps you manage products without the complexity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
