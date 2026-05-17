import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken) {
    if (refreshToken) {
      const data = await checkServerSession();
      const setCookie = data.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        const parsed = setCookieParser.parse(cookieArray);

        let response: NextResponse;

        if (isPublicRoute) {
          response = NextResponse.redirect(new URL("/", request.url));
        } else if (isPrivateRoute) {
          response = NextResponse.next();
        } else {
          return NextResponse.next();
        }

        for (const cookie of parsed) {
          response.cookies.set(cookie.name, cookie.value, {
            expires: cookie.expires,
            path: cookie.path,
            maxAge: cookie.maxAge,
            httpOnly: cookie.httpOnly,
            secure: cookie.secure,
          });
        }

        return response;
      }
    }
    if (isPublicRoute) return NextResponse.next();
    if (isPrivateRoute)
      return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPublicRoute) return NextResponse.redirect(new URL("/", request.url));
  if (isPrivateRoute) return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
