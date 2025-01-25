import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

//----------------------------------------------- MODELO USUARIOS ----------------------------------------------------------

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id); // Obtener ID desde la URL y convertirlo a número
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const { name, mail, clave, rol } = await request.json();

    // Validar que al menos un campo esté presente
    if (!name && !mail && !rol && !clave) {
      return NextResponse.json(
        { error: "Debe proporcionar al menos un campo para actualizar" },
        { status: 400 }
      );
    }

    // Verificar si el cliente existe antes de actualizar
    const userExistente = await prisma.usuario.findUnique({
      where: { id: Number(id) },
    });
    if (!userExistente) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar el user
    const usuarioActualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: {
        name,
        mail,
        clave,
        rol,
      },
    });

    return NextResponse.json(usuarioActualizado, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
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

    await prisma.usuario.delete({
      where: { id: id },
    });

    return new Response(
      JSON.stringify({ message: "Usuario eliminado correctamente" }),
      {
        status: 200,
      }
    );
  }
}
