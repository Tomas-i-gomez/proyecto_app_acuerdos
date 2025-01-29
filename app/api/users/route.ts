import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient({});

//----------------------------------------------- MODELO USUARIOS ----------------------------------------------------------
export async function GET() {
  const usuario = await prisma.usuario.findMany();
  try {
    return new NextResponse(JSON.stringify(usuario), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, mail, rol, clave } = await req.json();

    if (!name || !mail || !rol || !clave) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }
    const hashedPw = await hash(clave, 10);
    // Crear en la base de datos
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        name,
        mail,
        clave: hashedPw,
        rol,
      },
    });

    // Devolver la respuesta
    return NextResponse.json(nuevoUsuario, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error al crerar usuario: ", error.stack);
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
