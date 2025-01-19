const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Crear ramos
  const ramo1 = await prisma.ramo.create({
    data: { name: "Tecnología" },
  });
  const ramo2 = await prisma.ramo.create({
    data: { name: "Alimentos" },
  });

  // Crear proveedores
  const proveedor1 = await prisma.proveedores.create({
    data: { name: "Proveedor Tech" },
  });
  const proveedor2 = await prisma.proveedores.create({
    data: { name: "Proveedor Food" },
  });

  // Crear clientes
  const cliente1 = await prisma.clientes.create({
    data: {
      razon_social: "Cliente Innovador",
      ramoId: ramo1.id,
    },
  });
  const cliente2 = await prisma.clientes.create({
    data: {
      razon_social: "Cliente Gastronómico",
      ramoId: ramo2.id,
    },
  });

  // Crear condiciones comerciales
  await prisma.condiciones_comerciales.create({
    data: {
      condicion: "Descuento del 10% en compras mayores a $1000",
      proveedorId: proveedor1.id,
      ramoId: ramo1.id,
    },
  });
  await prisma.condiciones_comerciales.create({
    data: {
      condicion: "Envío gratuito en pedidos superiores a $500",
      proveedorId: proveedor2.id,
      ramoId: ramo2.id,
    },
  });

  // Crear usuarios
  await prisma.usuario.create({
    data: {
      name: "Admin User",
      clave: "admin123", // En producción, usa bcrypt para encriptar
      mail: "admin@example.com",
      rol: "Admin",
    },
  });

  await prisma.usuario.create({
    data: {
      name: "Vendedor Juan",
      clave: "vendedor123",
      mail: "juan@example.com",
      rol: "Vendedor",
    },
  });

  await prisma.usuario.create({
    data: {
      name: "Proveedor Mario",
      clave: "proveedor123",
      mail: "mario@example.com",
      rol: "Proveedor",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
