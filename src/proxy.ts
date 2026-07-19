import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL("/#contact", request.url));
}

export const config = {
  matcher: [
    "/portal/:path*",
    "/onboarding/:path*",
    "/sign-in/:path*",
    "/sign-up/:path*",
  ],
};
