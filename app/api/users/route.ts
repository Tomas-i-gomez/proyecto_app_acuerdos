import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});


//----------------------------------------------- MODELO USUARIOS ----------------------------------------------------------
export async function GET() {
    const usuario = await prisma.usuario.findMany();
  
    return new Response(JSON.stringify(usuario), { status: 200 });
  }
  
  export async function POST(req: NextRequest) {
      try {
        const { name , mail , rol , clave} = await req.json();
    
        if (!name || !mail || !rol) {
          return NextResponse.json(
            { error: "Todos los campos son requeridos" },
            { status: 400 }
          );
        }
        // Crear el cliente en la base de datos
        const nuevoUsuario = await prisma.usuario.create({
          data: {
              name,
              mail,
              clave,
              rol,
            },
        })
          
    
        // Devolver la respuesta
        return NextResponse.json(nuevoUsuario, { status: 201 });
      } catch (error) {
        console.error("Error al crear usuario:", error);
        return NextResponse.json(
          { error: "Error interno del servidor" },
          { status: 500 }
        );
      }
    }