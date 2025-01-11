/*
  Warnings:

  - You are about to drop the column `rolId` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rol` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_rolId_fkey`;

-- DropIndex
DROP INDEX `Usuario_rolId_fkey` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `rolId`,
    ADD COLUMN `rol` ENUM('Admin', 'Vendedor', 'Proveedor') NOT NULL;

-- DropTable
DROP TABLE `roles`;
