import { NextResponse } from "next/server";

import { buildLoginUrl, clearSessionCookie } from "@/lib/auth";

export async function GET() {
  const response = NextResponse.redirect(buildLoginUrl());

  clearSessionCookie(response);

  return response;
}
