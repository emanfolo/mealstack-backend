/*
  Warnings:

  - You are about to drop the column `Type` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `breakfast` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `cuisine` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `dinner` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `instructions_url` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `lunch` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `PlansOnRecipes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dairyFree` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `glutenFree` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kosher` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peanutFree` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `porkFree` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTime` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vegan` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vegetarian` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yield` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlansOnRecipes" DROP CONSTRAINT "PlansOnRecipes_planId_fkey";

-- DropForeignKey
ALTER TABLE "PlansOnRecipes" DROP CONSTRAINT "PlansOnRecipes_recipeId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "Type",
DROP COLUMN "breakfast",
DROP COLUMN "cuisine",
DROP COLUMN "dinner",
DROP COLUMN "instructions_url",
DROP COLUMN "lunch",
DROP COLUMN "name",
ADD COLUMN     "cuisineType" TEXT,
ADD COLUMN     "dairyFree" BOOLEAN NOT NULL,
ADD COLUMN     "dishType" TEXT,
ADD COLUMN     "glutenFree" BOOLEAN NOT NULL,
ADD COLUMN     "kosher" BOOLEAN NOT NULL,
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "mealType" TEXT,
ADD COLUMN     "peanutFree" BOOLEAN NOT NULL,
ADD COLUMN     "porkFree" BOOLEAN NOT NULL,
ADD COLUMN     "tags" TEXT NOT NULL,
ADD COLUMN     "totalTime" INTEGER NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "vegan" BOOLEAN NOT NULL,
ADD COLUMN     "vegetarian" BOOLEAN NOT NULL,
ADD COLUMN     "yield" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PlansOnRecipes";
