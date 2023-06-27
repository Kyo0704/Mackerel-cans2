-- CreateTable
CREATE TABLE `User` (
    `uid` VARCHAR(255) NOT NULL,
    `lineId` VARCHAR(255) NULL,
    `uname` VARCHAR(255) NULL,

    UNIQUE INDEX `User_lineId_key`(`lineId`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `pid` VARCHAR(255) NOT NULL,
    `pname` VARCHAR(255) NOT NULL,
    `expiry_date` DATETIME(3) NULL,
    `price` INTEGER NULL,
    `image` VARCHAR(255) NULL,

    PRIMARY KEY (`pid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Store` (
    `sid` VARCHAR(255) NOT NULL,
    `sname` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NULL,

    PRIMARY KEY (`sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `State` (
    `stid` VARCHAR(255) NOT NULL,
    `pid` VARCHAR(255) NOT NULL,
    `stname` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `State_stid_key`(`stid`),
    UNIQUE INDEX `State_stid_pid_key`(`stid`, `pid`),
    PRIMARY KEY (`stid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Discount` (
    `dprice` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `pid` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `stid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Discount_pid_sid_stid_key`(`pid`, `sid`, `stid`),
    PRIMARY KEY (`dprice`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RegisteredStore` (
    `uid` VARCHAR(255) NOT NULL,
    `sid` VARCHAR(255) NOT NULL,
    `rname` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`uid`, `sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `eid` VARCHAR(255) NOT NULL,
    `ename` VARCHAR(255) NOT NULL,
    `sid` VARCHAR(255) NOT NULL,
    `jid` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`eid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Job` (
    `jid` VARCHAR(255) NOT NULL,
    `jname` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`jid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `State` ADD CONSTRAINT `State_pid_fkey` FOREIGN KEY (`pid`) REFERENCES `Product`(`pid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_pid_fkey` FOREIGN KEY (`pid`) REFERENCES `Product`(`pid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_sid_fkey` FOREIGN KEY (`sid`) REFERENCES `Store`(`sid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_stid_fkey` FOREIGN KEY (`stid`) REFERENCES `State`(`stid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegisteredStore` ADD CONSTRAINT `RegisteredStore_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegisteredStore` ADD CONSTRAINT `RegisteredStore_sid_fkey` FOREIGN KEY (`sid`) REFERENCES `Store`(`sid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_sid_fkey` FOREIGN KEY (`sid`) REFERENCES `Store`(`sid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_jid_fkey` FOREIGN KEY (`jid`) REFERENCES `Job`(`jid`) ON DELETE RESTRICT ON UPDATE CASCADE;
