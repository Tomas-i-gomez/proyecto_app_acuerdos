import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});


//----------------------------------------------- MODELO USUARIOS ----------------------------------------------------------

  export async function PUT(request: NextRequest) {
    const { id, ...data } = await request.json();
  
    if (!id || Object.keys(data).length === 0) {
        return NextResponse.json(
        { error: "El id del usuario y al menos un campo para actualizar son requeridos" },
        { status: 400 }
        );
    }

    const usuarioActualizado = await prisma.usuario.update({
        id,
        ...data,
    });

    return NextResponse.json(usuarioActualizado)
}
      

export async function DELETE(req: NextRequest, {params} : {params: { id: string }}) {
    {
        const usersId = parseInt(params.id);
      
        await prisma.usuario.delete({
          where: { id: usersId },
        });
      
        return new Response(JSON.stringify({ message: "Usuario eliminado correctamente" }), {
          status: 200,
        });
    }
};

