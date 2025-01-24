import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export async function GET() {
  const condiciones = await prisma.condiciones_comerciales.findMany({
    include: {
      proveedor: true,
      ramo: true,
    },
  });

  return new Response(JSON.stringify(condiciones), { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const { condicion, ramo, proveedor } = await req.json();

    if (!condicion || !ramo || !proveedor) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Buscar IDs correspondientes
    const ramoData = await prisma.ramo.findUnique({
      where: { name: ramo },
    });
    const proveedorData = await prisma.proveedores.findUnique({
      where: { name: proveedor },
    });

    // Validar existencia de los registros
    if (!ramoData || !proveedorData) {
      return NextResponse.json(
        { error: "Ramo o Proveedor no encontrados" },
        { status: 404 }
      );
    }

    // Crear la condición comercial
    const nuevaCondicion = await prisma.condiciones_comerciales.create({
      data: {
        condicion,
        ramoId: ramoData.id, // Usar el `id` del ramo
        proveedorId: proveedorData.id, // Usar el `id` del proveedor
      },
    });

    return NextResponse.json(nuevaCondicion, { status: 201 });
  } catch (error) {
    console.error("Error al crear la condición comercial:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
