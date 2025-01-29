import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

//----------------------------------------------- MODELO RAMO CLIENTES ----------------------------------------------------------

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  {
    const id = parseInt(params.id);

    await prisma.ramo.delete({
      where: { id: id },
    });

    return new Response(
      JSON.stringify({ message: "Ramo eliminado correctamente" }),
      {
        status: 200,
      }
    );
  }
}
