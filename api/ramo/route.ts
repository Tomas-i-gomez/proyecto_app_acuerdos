import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});



export async function GET() {
  const ramo = await prisma.ramo.findMany();

  return new Response(JSON.stringify(ramo), { status: 200 });
}

export async function POST(req: NextRequest) {
    try {
      const {name} = await req.json();
  
      if (!name) {
        return NextResponse.json(
          { error: "Todos los campos son requeridos" },
          { status: 400 }
        );
      }
      // Crear el cliente en la base de datos
      const nuevoRamo = await prisma.ramo.create({
        data: {
          name
        },
      });
  
      // Devolver la respuesta
      return NextResponse.json(nuevoRamo, { status: 201 });
    } catch (error) {
      console.error("Error al crear el ramo:", error);
      return NextResponse.json(
        { error: "Error interno del servidor" },
        { status: 500 }
      );
    }
  }