import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient({ log: ["warn", "error"] });

export async function GET() {
  const ramo = await prisma.ramo.count();
  return new Response(JSON.stringify({ count: ramo }), { status: 200 });
}
