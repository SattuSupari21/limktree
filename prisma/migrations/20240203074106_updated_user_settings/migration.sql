/*
  Warnings:

  - A unique constraint covering the columns `[customUrl]` on the table `UserSettings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_customUrl_key" ON "UserSettings"("customUrl");
