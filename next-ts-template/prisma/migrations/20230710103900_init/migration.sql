/*
  Warnings:

  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_gid_fkey`;

-- DropTable
DROP TABLE `Group`;

-- CreateTable
CREATE TABLE `Classification` (
    `gid` VARCHAR(191) NOT NULL,
    `gname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`gid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_gid_fkey` FOREIGN KEY (`gid`) REFERENCES `Classification`(`gid`) ON DELETE RESTRICT ON UPDATE CASCADE;
