export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";

type PrismaishError = {
  name?: string;
  message?: string;
  code?: string;
  clientVersion?: string;
};

export async function GET(): Promise<Response> {
  try {
    const count = await prisma.product.count();
    return Response.json({ ok: true, productCount: count }, { status: 200 });
  } catch (e: unknown) {
    // don’t leak full error to client, but include helpful fields
    const err = (e ?? {}) as PrismaishError;
    console.error("DB health fail:", e);
    return Response.json(
      {
        ok: false,
        name: err.name ?? "UnknownError",
        code: err.code,
        clientVersion: err.clientVersion,
        message: err.message ?? "Unknown failure",
      },
      { status: 500 }
    );
  }
}
