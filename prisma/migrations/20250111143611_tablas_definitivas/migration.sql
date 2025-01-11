/*
  Warnings:

  - You are about to drop the column `numeroCliente` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the `condicion_clientes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mail]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apellido` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proveedorId` to the `condiciones_comerciales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ramoId` to the `condiciones_comerciales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `condicion_clientes` DROP FOREIGN KEY `Condicion_clientes_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `condicion_clientes` DROP FOREIGN KEY `Condicion_clientes_condicionComercialId_fkey`;

-- DropForeignKey
ALTER TABLE `condicion_clientes` DROP FOREIGN KEY `Condicion_clientes_proveedoresId_fkey`;

-- DropIndex
DROP INDEX `clientes_numeroCliente_key` ON `clientes`;

-- AlterTable
ALTER TABLE `clientes` DROP COLUMN `numeroCliente`,
    ADD COLUMN `apellido` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `condiciones_comerciales` ADD COLUMN `proveedorId` INTEGER NOT NULL,
    ADD COLUMN `ramoId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `condicion_clientes`;

-- CreateIndex
CREATE UNIQUE INDEX `usuario_mail_key` ON `usuario`(`mail`);

-- AddForeignKey
ALTER TABLE `condiciones_comerciales` ADD CONSTRAINT `Condiciones_ramoId_fkey` FOREIGN KEY (`ramoId`) REFERENCES `ramo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `condiciones_comerciales` ADD CONSTRAINT `Proveedores_proveedorId_fkey` FOREIGN KEY (`proveedorId`) REFERENCES `proveedores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
