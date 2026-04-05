import { createHmac, timingSafeEqual } from "crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const APP_SESSION_COOKIE = "atlas_session";
const APPLICATION_KEY = "erp";
const SESSION_DURATION_IN_DAYS = 7;

type AuthExchangeResponse = {
  application: {
    key: "erp" | "help-desk";
    label: string;
    url: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    applications: Array<{
      key: "erp" | "help-desk";
      label: string;
    }>;
  };
};

type AppSessionPayload = {
  user: AuthExchangeResponse["user"];
  application: "erp";
  expiresAt: number;
};

function getRequiredEnv(name: "AUTH_SYSTEM_URL" | "APP_URL" | "APP_SESSION_SECRET"): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

function sign(value: string): string {
  return createHmac("sha256", getRequiredEnv("APP_SESSION_SECRET")).update(value).digest("base64url");
}

function encodePayload(payload: AppSessionPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodePayload(payload: string): AppSessionPayload | null {
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8")) as AppSessionPayload;

    return parsed;
  } catch {
    return null;
  }
}

export function createAppSessionToken(user: AuthExchangeResponse["user"]): string {
  const payload: AppSessionPayload = {
    user,
    application: "erp",
    expiresAt: Date.now() + SESSION_DURATION_IN_DAYS * 24 * 60 * 60 * 1000
  };
  const encoded = encodePayload(payload);

  return `${encoded}.${sign(encoded)}`;
}

export function verifyAppSessionToken(token: string | undefined): AppSessionPayload | null {
  if (!token) {
    return null;
  }

  const [encodedPayload, encodedSignature] = token.split(".");

  if (!encodedPayload || !encodedSignature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);

  try {
    const signatureMatches = timingSafeEqual(
      Buffer.from(encodedSignature),
      Buffer.from(expectedSignature)
    );

    if (!signatureMatches) {
      return null;
    }
  } catch {
    return null;
  }

  const payload = decodePayload(encodedPayload);

  if (!payload || payload.application !== APPLICATION_KEY || payload.expiresAt <= Date.now()) {
    return null;
  }

  return payload;
}

export async function getCurrentAppSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(APP_SESSION_COOKIE)?.value;

  return verifyAppSessionToken(token);
}

export function buildLoginUrl(): string {
  const url = new URL("/", getRequiredEnv("AUTH_SYSTEM_URL"));
  url.searchParams.set("application", APPLICATION_KEY);
  return url.toString();
}

export function redirectToLogin(): never {
  redirect(buildLoginUrl());
}

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(APP_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(Date.now() + SESSION_DURATION_IN_DAYS * 24 * 60 * 60 * 1000)
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(APP_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0)
  });
}

export function getRequestSession(request: NextRequest): AppSessionPayload | null {
  return verifyAppSessionToken(request.cookies.get(APP_SESSION_COOKIE)?.value);
}

export function requireRequestSession(request: NextRequest): AppSessionPayload | NextResponse {
  const session = getRequestSession(request);

  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  return session;
}

export async function exchangeCodeForSession(code: string): Promise<AuthExchangeResponse> {
  const response = await fetch(new URL("/auth/exchange", getRequiredEnv("AUTH_SYSTEM_URL")), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code,
      application: APPLICATION_KEY
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Não foi possível validar o acesso com a central de login.");
  }

  return (await response.json()) as AuthExchangeResponse;
}
