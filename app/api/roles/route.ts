import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export async function GET() {
  return NextResponse.json(Object.values(Role));
}
