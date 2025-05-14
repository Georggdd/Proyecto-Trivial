/*
  Warnings:

  - You are about to drop the `tirada` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customizable` to the `customizable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customizable` ADD COLUMN `customizable` BOOLEAN NOT NULL;

-- DropTable
DROP TABLE `tirada`;
