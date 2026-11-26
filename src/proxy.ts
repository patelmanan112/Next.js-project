import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/signup"];

const matches = (pathname: string, routes: string[]) =>
	routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET ?? process.env.JWT_SECRET,
	});
	const isLoggedIn = !!token;

	// Logged-in users shouldn't see login/signup
	if (isLoggedIn && matches(pathname, authRoutes)) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	// Guests can't access protected routes
	if (!isLoggedIn && matches(pathname, protectedRoutes)) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/login", "/signup"],
};