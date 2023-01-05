/*
  Warnings:

  - Made the column `userId` on table `game` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `Game_userId_fkey`;

-- AlterTable
ALTER TABLE `game` MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
