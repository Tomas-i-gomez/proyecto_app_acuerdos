/*
  Warnings:

  - A unique constraint covering the columns `[numeroCliente]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numeroCliente` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clientes` ADD COLUMN `numeroCliente` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `clientes_numeroCliente_key` ON `clientes`(`numeroCliente`);
