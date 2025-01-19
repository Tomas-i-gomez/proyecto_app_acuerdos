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
    const { razon_social, ramoId } = await req.json();

    // Validar que los campos obligatorios estén presentes y en el formato correcto
    if (!razon_social || !ramoId || isNaN(Number(ramoId))) {
      return NextResponse.json(
        {
          error:
            "Los campos 'razon_social' y 'ramoId' son requeridos y deben ser válidos.",
        },
        { status: 400 }
      );
    }

    // Crear el cliente en la base de datos
    const nuevoCliente = await prisma.clientes.create({
      data: {
        razon_social,
        ramoId: Number(ramoId), // Asegurarse de que sea un número
      },
      include: {
        ramo: true,
      },
    });

    // Devolver la respuesta con el nuevo cliente creado
    return NextResponse.json(nuevoCliente, { status: 201 });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
