/*
  Warnings:

  - You are about to drop the column `breakfast_id` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `dinner_id` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `lunch_id` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `snack_id` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "breakfast_id",
DROP COLUMN "dinner_id",
DROP COLUMN "lunch_id",
DROP COLUMN "snack_id";
