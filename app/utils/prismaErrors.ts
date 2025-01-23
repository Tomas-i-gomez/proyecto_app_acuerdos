import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function handlePrismaDBError(error: PrismaClientKnownRequestError) {
  if (error.code == "P2002") {
    return "El ID ya existe, elija otro";
  }

  return error.message;
}
