/*
  Warnings:

  - Added the required column `snack_id` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "snack_id" INTEGER NOT NULL;
