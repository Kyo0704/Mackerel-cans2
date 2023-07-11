/*
  Warnings:

  - You are about to drop the column `rname` on the `RegisteredStore` table. All the data in the column will be lost.
  - The primary key for the `State` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `url` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `lineId` on the `User` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pass` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `State_stid_pid_key` ON `State`;

-- DropIndex
DROP INDEX `User_lineId_key` ON `User`;

-- AlterTable
ALTER TABLE `Discount` ADD COLUMN `quantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Employee` ADD COLUMN `pass` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `expiry_date` DATETIME(3) NULL;

ALTER TABLE `Product` ADD COLUMN `gid` VARCHAR(255) DEFAULT '0';

-- AlterTable
ALTER TABLE `RegisteredStore` DROP COLUMN `rname`;

-- AlterTable
ALTER TABLE `State` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`stid`, `pid`);

-- AlterTable
ALTER TABLE `Store` DROP COLUMN `url`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `lineId`;
