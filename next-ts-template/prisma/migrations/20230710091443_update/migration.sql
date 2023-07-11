/*
  Warnings:

  - Made the column `gid` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `production_area` VARCHAR(191) NULL,
    ADD COLUMN `volume` VARCHAR(191) NULL,
    MODIFY `gid` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Group` (
    `gid` VARCHAR(191) NOT NULL,
    `gname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`gid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_gid_fkey` FOREIGN KEY (`gid`) REFERENCES `Group`(`gid`) ON DELETE RESTRICT ON UPDATE CASCADE;
