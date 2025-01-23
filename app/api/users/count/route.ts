import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { handlePrismaDBError } from "@/app/utils/prismaErrors";

const prisma = new PrismaClient({ log: ["warn", "error"] });

export async function GET() {
  const users = await prisma.usuario.count();
  return new Response(JSON.stringify({ count: users }), { status: 200 });
}
