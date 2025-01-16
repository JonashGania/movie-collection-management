/*
  Warnings:

  - You are about to drop the column `slug` on the `Genres` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Genres_slug_key";

-- AlterTable
ALTER TABLE "Genres" DROP COLUMN "slug";
