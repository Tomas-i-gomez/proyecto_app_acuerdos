import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});



export async function GET() {
  const condiciones = await prisma.condiciones_comerciales.findMany({
    include: {
      proveedor: true,
      ramo: true,
    },
  });

  return new Response(JSON.stringify(condiciones), { status: 200 });
}

export async function POST(req: NextRequest) {
    try {
      const {condiciones_comerciales } = await req.json();
  
      if (!condiciones_comerciales) {
        return NextResponse.json(
          { error: "Todos los campos son requeridos" },
          { status: 400 }
        );
      }
      // Crear el cliente en la base de datos
      const nuevaCondicion = await prisma.condiciones_comerciales.create(condiciones_comerciales);
  
      // Devolver la respuesta
      return NextResponse.json(nuevaCondicion, { status: 201 });
    } catch (error) {
      console.error("Error al crear condicion:", error);
      return NextResponse.json(
        { error: "Error interno del servidor" },
        { status: 500 }
      );
    }
  }