import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

//----------------------------------------------- MODELO Proveedores ----------------------------------------------------------

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  {
    const proveedorId = parseInt(params.id);

    await prisma.proveedores.delete({
      where: { id: proveedorId },
    });

    return new Response(
      JSON.stringify({ message: "Proveedor eliminado correctamente" }),
      {
        status: 200,
      }
    );
  }
}
