import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const APP_SESSION_COOKIE = "atlas_session";
const SESSION_DURATION_IN_DAYS = 7;

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  applications: Array<{
    key: "erp";
    label: string;
  }>;
};

type AppSessionPayload = {
  user: AppUser;
  application: "erp";
  expiresAt: number;
};

export function createAppUser(user: {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date | string;
}): AppUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: new Date(user.createdAt).toISOString(),
    applications: [
      {
        key: "erp",
        label: "ERP",
      },
    ],
  };
}

function getSessionSecret(): string {
  const value = process.env.APP_SESSION_SECRET;
  if (!value) {
    throw new Error("Missing environment variable: APP_SESSION_SECRET");
  }
  return value;
}

function sign(value: string): string {
  return createHmac("sha256", getSessionSecret())
    .update(value)
    .digest("base64url");
}

function encodePayload(payload: AppSessionPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodePayload(payload: string): AppSessionPayload | null {
  try {
    return JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8")
    ) as AppSessionPayload;
  } catch {
    return null;
  }
}

export function createAppSessionToken(user: AppUser): string {
  const payload: AppSessionPayload = {
    user,
    application: "erp",
    expiresAt: Date.now() + SESSION_DURATION_IN_DAYS * 24 * 60 * 60 * 1000,
  };

  const encoded = encodePayload(payload);
  return `${encoded}.${sign(encoded)}`;
}

export function verifyAppSessionToken(token: string | undefined): AppSessionPayload | null {
  if (!token) return null;

  const [encodedPayload, encodedSignature] = token.split(".");
  if (!encodedPayload || !encodedSignature) return null;

  const expectedSignature = sign(encodedPayload);

  try {
    const signatureMatches = timingSafeEqual(
      Buffer.from(encodedSignature),
      Buffer.from(expectedSignature)
    );

    if (!signatureMatches) return null;
  } catch {
    return null;
  }

  const payload = decodePayload(encodedPayload);

  if (!payload || payload.application !== "erp" || payload.expiresAt <= Date.now()) {
    return null;
  }

  return payload;
}

export async function getCurrentAppSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(APP_SESSION_COOKIE)?.value;
  return verifyAppSessionToken(token);
}

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(APP_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(Date.now() + SESSION_DURATION_IN_DAYS * 24 * 60 * 60 * 1000),
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(APP_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

export function getRequestSession(request: NextRequest) {
  return verifyAppSessionToken(request.cookies.get(APP_SESSION_COOKIE)?.value);
}

export function requireRequestSession(request: NextRequest) {
  const session = getRequestSession(request);

  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  return session;
}
