/*
  Warnings:

  - You are about to alter the column `referrerName` on the `referral` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `referrerEmail` on the `referral` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to alter the column `refereeName` on the `referral` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `refereeEmail` on the `referral` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to alter the column `courseName` on the `referral` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - A unique constraint covering the columns `[referrerEmail,refereeEmail]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `referral` MODIFY `referrerName` VARCHAR(50) NOT NULL,
    MODIFY `referrerEmail` VARCHAR(150) NOT NULL,
    MODIFY `refereeName` VARCHAR(50) NOT NULL,
    MODIFY `refereeEmail` VARCHAR(150) NOT NULL,
    MODIFY `courseName` VARCHAR(150) NULL;

-- CreateIndex
CREATE INDEX `Referral_referrerEmail_idx` ON `Referral`(`referrerEmail`);

-- CreateIndex
CREATE INDEX `Referral_refereeEmail_idx` ON `Referral`(`refereeEmail`);

-- CreateIndex
CREATE UNIQUE INDEX `Referral_referrerEmail_refereeEmail_key` ON `Referral`(`referrerEmail`, `refereeEmail`);
