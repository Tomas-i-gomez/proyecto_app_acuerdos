import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET! });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/dashboard") && token.role != "Admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/ramo") && token.role != "Admin") {
    return NextResponse.redirect(new URL("/proveedores", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/users") && token.role != "Admin") {
    return NextResponse.redirect(new URL("/proveedores", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/ramo/:path*", "/users/:path*"], // Aplica el middleware solo a rutas específicas
};
