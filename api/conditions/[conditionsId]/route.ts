import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});


//----------------------------------------------- MODELO CONDICIONES CLIENTES ----------------------------------------------------------
  export async function PUT(request: NextRequest) {
    const {condicion, ...data } = await request.json();
  
    if (!condicion || Object.keys(data).length === 0) {
        return NextResponse.json(
        { error: "La condicion y al menos un campo para actualizar son requeridos" },
        { status: 400 }
        );
    }

    const condicionActualizada = await prisma.condiciones_comerciales.update({
        condicion,
        ...data,
    });

    return NextResponse.json(condicionActualizada)
}
      

export async function DELETE(req: NextRequest, {params} : {params: { id: string }}) {
    {
        const conditionsId = parseInt(params.id);
      
        await prisma.condiciones_comerciales.delete({
          where: { id: conditionsId },
        });
      
        return new Response(JSON.stringify({ message: "Condicion eliminada correctamente" }), {
          status: 200,
        });
    }
};

