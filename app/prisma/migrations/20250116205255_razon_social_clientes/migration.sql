/*
  Warnings:

  - You are about to drop the column `apellido` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `clientes` table. All the data in the column will be lost.
  - Added the required column `razon_social` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clientes` DROP COLUMN `apellido`,
    DROP COLUMN `name`,
    ADD COLUMN `razon_social` VARCHAR(191) NOT NULL;
