import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const proveedorId = searchParams.get("proveedorId");

  try {
    const condiciones = await prisma.condiciones_comerciales.findMany({
      where: proveedorId ? { proveedorId: parseInt(proveedorId) } : undefined,
      include: {
        proveedor: true,
        ramo: true,
      },
    });

    return NextResponse.json(condiciones, { status: 200 });
  } catch (error) {
    console.error("Error fetching condiciones:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const proveedorId = searchParams.get("proveedorId");

  try {
    const { condicion, ramo, proveedorId } = await req.json();

    if (!condicion || !ramo || !proveedorId) {
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
      where: { id: parseInt(proveedorId) },
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
        proveedorId: proveedorId, // Usar el `id` del proveedor
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
