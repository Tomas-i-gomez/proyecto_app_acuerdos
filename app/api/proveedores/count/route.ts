import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["warn", "error"] });

export async function GET() {
  const proveedores = await prisma.proveedores.count();
  return new Response(JSON.stringify({ count: proveedores }), { status: 200 });
}
