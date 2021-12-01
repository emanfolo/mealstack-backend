/*
  Warnings:

  - Changed the type of `calories` on the `Plan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `protein` on the `Plan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `carbs` on the `Plan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fat` on the `Plan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "calories",
ADD COLUMN     "calories" INTEGER NOT NULL,
DROP COLUMN "protein",
ADD COLUMN     "protein" INTEGER NOT NULL,
DROP COLUMN "carbs",
ADD COLUMN     "carbs" INTEGER NOT NULL,
DROP COLUMN "fat",
ADD COLUMN     "fat" INTEGER NOT NULL;
