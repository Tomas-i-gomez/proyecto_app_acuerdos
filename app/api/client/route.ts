import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { handlePrismaDBError } from "@/app/utils/prismaErrors";

const prisma = new PrismaClient({ log: ["warn", "error"] });

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
        {
          error:
            "Todos los campos (Numero Cliente, nombre, ramo) son requeridos",
        },
        { status: 400 }
      );
    }
    try {
      // Crear el cliente en la base de datos
      const nuevoCliente = await prisma.clientes.create({
        data: {
          id: parseInt(id),
          razon_social,
          ramoId: parseInt(ramoId),
        },
        include: { ramo: true },
      });

      console.log(nuevoCliente);
      // Devolver la respuesta
      return NextResponse.json(nuevoCliente, { status: 201 });
    } catch (error) {
      const errorMsg = handlePrismaDBError(
        error as PrismaClientKnownRequestError
      );
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }
  } catch (error) {
    console.error("Error al crear cliente:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 400 }
    );
  }
}
