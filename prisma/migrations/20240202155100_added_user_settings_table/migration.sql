-- CreateTable
CREATE TABLE "UserSettings" (
    "user_id" INTEGER NOT NULL,
    "customUrl" TEXT,
    "backgroundColor" TEXT,
    "fontColor" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "hideAnalytics" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_user_id_key" ON "UserSettings"("user_id");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
