/*
  Warnings:

  - The values [Matematicas,Historia,Ciencias,Lengua,Ingles] on the enum `pregunta_asignatura` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `pregunta` MODIFY `asignatura` ENUM('idioma', 'musica', 'matematicas', 'biologia', 'geografia', 'lengua') NOT NULL;
