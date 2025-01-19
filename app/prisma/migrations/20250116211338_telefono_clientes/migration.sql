/*
  Warnings:

  - You are about to drop the column `telefono` on the `clientes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `clientes` DROP COLUMN `telefono`,
    MODIFY `razon_social` VARCHAR(500) NOT NULL;
