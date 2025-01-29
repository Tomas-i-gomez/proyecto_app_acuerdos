import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["warn", "error"] });

export async function GET() {
  const users = await prisma.usuario.count();
  return new Response(JSON.stringify({ count: users }), { status: 200 });
}
