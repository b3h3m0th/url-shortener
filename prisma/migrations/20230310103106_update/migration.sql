/*
  Warnings:

  - You are about to drop the column `shortened` on the `URL` table. All the data in the column will be lost.
  - Added the required column `token` to the `URL` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_URL" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "original" TEXT NOT NULL,
    "token" TEXT NOT NULL
);
INSERT INTO "new_URL" ("id", "original") SELECT "id", "original" FROM "URL";
DROP TABLE "URL";
ALTER TABLE "new_URL" RENAME TO "URL";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
