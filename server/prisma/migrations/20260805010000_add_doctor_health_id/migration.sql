-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "healthId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "doctors_healthId_key" ON "doctors"("healthId");
