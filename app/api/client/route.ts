import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});


//----------------------------------------------- MODELO CLIENTES ----------------------------------------------------------
export async function GET() {
  const clientes = await prisma.clientes.findMany({
    include: {
      ramo: true,
    },
  });

  return new Response(JSON.stringify(clientes), { status: 200 });
}

export async function POST(req: NextRequest) {
    try {
      const { id, razon_social, ramoId } = await req.json();
  
      if (!id || !razon_social || !ramoId) {
        return NextResponse.json(
          { error: "Todos los campos (Numero Cliente, nombre, telefono, ramo) son requeridos" },
          { status: 400 }
        );
      }
      // Crear el cliente en la base de datos
      const nuevoCliente = await prisma.clientes.create({
        data: {
          id:parseInt(id),
          razon_social,
          ramoId:parseInt(ramoId),
        },
        include:{ramo:true}
      });
      console.log(nuevoCliente);
      
  
      // Devolver la respuesta
      return NextResponse.json(nuevoCliente, { status: 201 });
    } catch (error) {
      console.error("Error al crear cliente:", error);
      return NextResponse.json(
        { error: "Error interno del servidor" },
        { status: 500 }
      );
    }
  }