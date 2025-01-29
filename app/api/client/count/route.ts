import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["warn", "error"] });

export async function GET() {
  const clientes = await prisma.clientes.count();
  return new Response(JSON.stringify({ count: clientes }), { status: 200 });
}
