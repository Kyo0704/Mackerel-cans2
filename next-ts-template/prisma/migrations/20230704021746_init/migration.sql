/*
  Warnings:

  - Made the column `expiry_date` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `expiry_date` DATETIME(3) NOT NULL;
