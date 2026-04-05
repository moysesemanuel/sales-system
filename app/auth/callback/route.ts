import { NextRequest, NextResponse } from "next/server";

import { buildLoginUrl, createAppSessionToken, exchangeCodeForSession, setSessionCookie } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(buildLoginUrl());
  }

  try {
    const payload = await exchangeCodeForSession(code);
    const response = NextResponse.redirect(new URL("/", request.url));

    setSessionCookie(response, createAppSessionToken(payload.user));

    return response;
  } catch {
    return NextResponse.redirect(buildLoginUrl());
  }
}
