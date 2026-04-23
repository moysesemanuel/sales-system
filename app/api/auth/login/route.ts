import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";
import { createAppSessionToken, createAppUser, setSessionCookie } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email e senha são obrigatórios." },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    const passwordMatches = await verifyPassword(password, user.passwordHash);

    if (!passwordMatches) {
      return NextResponse.json(
        { error: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    const appUser = createAppUser(user);
    const response = NextResponse.json({
      success: true,
      user: appUser,
    });

    setSessionCookie(response, createAppSessionToken(appUser));

    return response;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2021"
    ) {
      return NextResponse.json(
        {
          error:
            "Banco de dados ainda não preparado. Execute `yarn db:setup` para criar as tabelas do ERP.",
        },
        { status: 503 }
      );
    }

    console.error("Login error:", error);

    return NextResponse.json(
      { error: "Falha interna ao processar o login." },
      { status: 500 }
    );
  }
}
