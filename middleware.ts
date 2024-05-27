import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET_KEY,
  });

  const pathname = request.nextUrl.pathname;

  if (pathname == "/owner" || pathname == "/admin" || pathname == "/cashier") {
    if (!token) {
      return NextResponse.next();
    }

    let url = "";

    switch (pathname) {
      case "/owner":
        url += "/owner/dashboard";
        break;
      case "/admin":
        url += "/admin/dashboard";
        break;
      case "/cashier":
        url += "/cashier/menu";
        break;
    }

    return NextResponse.redirect(new URL(url, request.url));
  }

  if (!token) {
    return NextResponse.redirect(
      new URL(`/${pathname.split("/")[1]}`, request.url),
    );
  }

  if (pathname.startsWith("/owner")) {
    if (token?.role.includes("owner")) {
      NextResponse.redirect(new URL("/owner/dashboard", request.url));
      return;
    }
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/cashier")) {
    if (token?.role.includes("admin") || token?.role.includes("cashier")) {
      const role = token?.role[0];
      const url = role == "cashier" ? "/cashier/menu" : "/admin/dashboard";

      NextResponse.redirect(new URL(url, request.url));
      return;
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/owner/:path*", "/admin/:path*", "/cashier/:path*"],
};
