import { Prisma } from "@/generated/prisma";

type PrismaHttpError = {
  status: number;
  code: string;
  message: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getErrorCode(value: unknown): string | null {
  if (!isRecord(value)) return null;
  const code = value.code;
  if (typeof code === "string") return code;
  const errorCode = value.errorCode;
  if (typeof errorCode === "string") return errorCode;
  return null;
}

export function toPrismaHttpError(error: unknown): PrismaHttpError | null {
  const code = getErrorCode(error);

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2021"
  ) {
    return {
      status: 503,
      code: "DB_SCHEMA_MISSING",
      message:
        "Banco de dados ainda não preparado. Execute `yarn db:setup` para criar as tabelas do ERP.",
    };
  }

  if (code === "P1001" || code === "P1000") {
    return {
      status: 503,
      code: "DB_UNAVAILABLE",
      message:
        "Não foi possível conectar ao banco de dados. Verifique `DATABASE_URL`/`DIRECT_URL` no `.env` e se o Postgres está acessível.",
    };
  }

  if (error instanceof Error) {
    // Neon/pgbouncer occasionally surfaces this as a generic error string.
    if (/\bkind:\s*Closed\b/i.test(error.message) || /\bError\s*\{\s*kind:\s*Closed\b/i.test(error.message)) {
      return {
        status: 503,
        code: "DB_CONNECTION_CLOSED",
        message:
          "A conexão com o banco de dados foi encerrada. Se estiver usando Neon pooler, confirme `pgbouncer=true` e considere adicionar `connect_timeout` ao `DATABASE_URL`.",
      };
    }
  }

  return null;
}

