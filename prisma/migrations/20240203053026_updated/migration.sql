/*
  Warnings:

  - The primary key for the `UserSettings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `UserSettings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserSettings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `UserSettings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_user_id_fkey";

-- DropIndex
DROP INDEX "UserSettings_user_id_key";

-- AlterTable
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
