import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});


//----------------------------------------------- MODELO CLIENTES ----------------------------------------------------------
export async function GET() {
  const proveedores = await prisma.proveedores.findMany();

  return new Response(JSON.stringify(proveedores), { status: 200 });
}

export async function POST(req: NextRequest) {
    try {
      const { name } = await req.json();
  
      if (!name) {
        return NextResponse.json(
          { error: "Todos los campos son requeridos" },
          { status: 400 }
        );
      }
      // Crear el cliente en la base de datos
      const nuevoProveedor = await prisma.proveedores.create({
        data: {
          name
        },
      });
  
      // Devolver la respuesta
      return NextResponse.json(nuevoProveedor, { status: 201 });
    } catch (error) {
      console.error("Error al crear proveedor:", error);
      return NextResponse.json(
        { error: "Error interno del servidor" },
        { status: 500 }
      );
    }
  }

      


