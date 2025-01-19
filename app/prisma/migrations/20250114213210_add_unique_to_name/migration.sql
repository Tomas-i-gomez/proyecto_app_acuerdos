/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `proveedores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `proveedores_name_key` ON `proveedores`(`name`);
