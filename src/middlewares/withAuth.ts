import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextRequest,
  NextMiddleware,
  NextResponse,
} from "next/server";

const onlyAdmin = ["admin"];
const authPage = ["auth"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname.split("/")[1];

    if (requireAuth.includes(pathname)) {
      // Retrieve the user's JWT token from the request cookies
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // If there is no token and the user is not visiting an auth page, redirect to the login page
      if (!token && !authPage.includes(pathname)) {
        const url = new URL("/auth/login", req.url);
        // Save the original destination to redirect back after login
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (token) {
        // If the user is already logged in and visits an auth page, redirect to the homepage
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
        // If the user is not an admin but tries to access an admin-only page, redirect to the homepage
        if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    }
    // If all checks pass, proceed to the next middleware
    return middleware(req, next);
  };
}
