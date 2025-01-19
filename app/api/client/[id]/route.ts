import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

//----------------------------------------------- MODELO CLIENTES ----------------------------------------------------------

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id); // Obtener ID desde la URL y convertirlo a número
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const { razon_social, ramoId } = await request.json();

    // Validar que al menos un campo esté presente
    if (!razon_social && !ramoId) {
      return NextResponse.json(
        { error: "Debe proporcionar al menos un campo para actualizar" },
        { status: 400 }
      );
    }

    // Verificar si el cliente existe antes de actualizar
    const clienteExistente = await prisma.clientes.findUnique({
      where: { id },
    });
    if (!clienteExistente) {
      return NextResponse.json(
        { error: "Cliente no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar el cliente
    const clienteActualizado = await prisma.clientes.update({
      where: { id },
      data: {
        razon_social,
        ramoId: ramoId ? Number(ramoId) : undefined, // Asegurar que ramoId sea un número si se pasa
      },
      include: {
        ramo: true,
      },
    });

    return NextResponse.json(clienteActualizado, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  {
    const id = parseInt(params.id);

    await prisma.clientes.delete({
      where: { id: id },
    });

    return new Response(
      JSON.stringify({ message: "Cliente eliminado correctamente" }),
      {
        status: 200,
      }
    );
  }
}
