import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";

import { signInSchema } from "./app/lib/zod";
import { prisma } from "./app/lib/prisma";
import { compare } from "bcryptjs";

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        mail: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: { mail: string; password: string }) {
        try {
          const { mail, password } = await signInSchema.parseAsync(credentials);

          // logic to salt and hash password
          const user = await prisma.usuario.findUnique({
            where: { mail },
          });

          if (!user) {
            throw new Error("Usuario no encontrado. Invalid credentials.");
          }
          const isValidPassword = await compare(password, user.clave);
          if (!isValidPassword) {
            throw new Error("Contraseña Incorrecta.Invalid credentials.");
          }

          // return JSON object with the user data
          return {
            id: user.id,
            name: user.name,
            mail: user.mail,
            rol: user.rol,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirige a /dashboard después del inicio de sesión
      return "/dashboard";
    },
  },
});

//
