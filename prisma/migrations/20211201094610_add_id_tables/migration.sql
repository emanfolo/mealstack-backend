/*
  Warnings:

  - Added the required column `breakfast_id` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dinner_id` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lunch_id` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "breakfast_id" INTEGER NOT NULL,
ADD COLUMN     "dinner_id" INTEGER NOT NULL,
ADD COLUMN     "lunch_id" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
