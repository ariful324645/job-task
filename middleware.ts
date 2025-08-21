import { auth } from "@/lib/auth"

export default auth((req) => {
  // Add any additional middleware logic here
  if (!req.auth && req.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", req.url))
  }
})

export const config = {
  matcher: ["/dashboard/:path*"],
}
