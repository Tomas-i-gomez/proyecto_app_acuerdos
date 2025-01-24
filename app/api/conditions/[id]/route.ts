import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

//----------------------------------------------- MODELO CONDICIONES CLIENTES ----------------------------------------------------------

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id); // Obtener ID desde la URL y convertirlo a número
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const { proveedorId, ramoId, condicion } = await request.json();

    // Validar que al menos un campo esté presente
    if (!condicion && !ramoId) {
      return NextResponse.json(
        { error: "Debe proporcionar al menos un campo para actualizar" },
        { status: 400 }
      );
    }

    // Verificar si el cliente existe antes de actualizar
    const condicionExistente = await prisma.condiciones_comerciales.findUnique({
      where: { id: Number(id) },
    });
    if (!condicionExistente) {
      return NextResponse.json(
        { error: "Condicion no encontrada" },
        { status: 404 }
      );
    }

    // Actualizar el cliente
    const condicionActualizada = await prisma.condiciones_comerciales.update({
      where: { id: Number(id) },
      data: {
        condicion,
        ramoId: ramoId ? Number(ramoId) : undefined, // Asegurar que ramoId sea un número si se pasa
      },
      include: {
        ramo: true,
        proveedor: true,
      },
    });

    return NextResponse.json(condicionActualizada, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar condicion:", error);
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

    await prisma.condiciones_comerciales.delete({
      where: { id: id },
    });

    return new Response(
      JSON.stringify({ message: "Condicion eliminada correctamente" }),
      {
        status: 200,
      }
    );
  }
}
