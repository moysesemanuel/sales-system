import { NextRequest, NextResponse } from "next/server";
import { requireRequestSession } from "@/lib/auth";
import { getSalesDashboardData } from "@/lib/sales-system";
import { toPrismaHttpError } from "@/lib/prisma-http";

export async function GET(request: NextRequest) {
  const session = requireRequestSession(request);

  if (session instanceof NextResponse) {
    return session;
  }

  try {
    const data = await getSalesDashboardData();
    return NextResponse.json(data);
  } catch (error) {
    const prismaError = toPrismaHttpError(error);
    if (prismaError) {
      return NextResponse.json(
        { error: prismaError.message },
        { status: prismaError.status },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Não foi possível carregar o dashboard do sistema de vendas.",
      },
      { status: 500 },
    );
  }
}
