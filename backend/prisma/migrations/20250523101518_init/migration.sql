/*
  Warnings:

  - You are about to drop the column `explicacion` on the `customizable` table. All the data in the column will be lost.
  - Added the required column `explicación` to the `customizable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customizable` DROP COLUMN `explicacion`,
    ADD COLUMN `explicación` VARCHAR(191) NOT NULL;
