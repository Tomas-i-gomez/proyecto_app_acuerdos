import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./app/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        console.log(credentials, "ESTO ES EN CREDENTIALS!!!");

        // Buscar el usuario en la base de datos
        const user = await prisma.usuario.findUnique({
          where: {
            mail: email,
          },
        });
        console.log(user, "Existe??");

        if (!user) {
          return null; // Credenciales inválidas
        }

        // Comparar la contraseña proporcionada con el hash almacenado
        if (password !== user.clave) {
          return null;
        }
        // Retornar el objeto de usuario
        return {
          id: user.id.toString(),
          email: user.mail,
          name: user.name,
          role: user.rol,
        };
      },
    }),
  ],
  callbacks: {
    // async signIn({ credentials }) {
    //   console.log(credentials, "Que es esootooooo");
    //   return true;
    // },
    async session({ session, token }: { session: any; token: any }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        const dbUser = await prisma.usuario.findUnique({
          where: { mail: user.email },
        });

        token.role = dbUser?.rol || "USER";
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
});
