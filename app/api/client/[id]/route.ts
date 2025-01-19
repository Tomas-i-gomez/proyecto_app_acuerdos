import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});


//----------------------------------------------- MODELO CLIENTES ----------------------------------------------------------

  export async function PUT(request: NextRequest) {
    const { id, ...data } = await request.json();
  
    if (!id || Object.keys(data).length === 0) {
        return NextResponse.json(
        { error: "El ID del cliente y al menos un campo para actualizar son requeridos" },
        { status: 400 }
        );
    }

    const clienteActualizado = await prisma.clientes.update({
        where: {id: id},
        data,
    });

    return NextResponse.json(clienteActualizado)
}
      

export async function DELETE(req: NextRequest, {params} : {params: { id: string }}) {
    {
        const id = parseInt(params.id);
      
        await prisma.clientes.delete({
          where: { id: id },
        });
      
        return new Response(JSON.stringify({ message: "Cliente eliminado correctamente" }), {
          status: 200,
        });
    }
};

