/*
  Warnings:

  - Added the required column `merkleRoot` to the `MerkleTree` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MerkleTree" ADD COLUMN     "merkleRoot" TEXT NOT NULL;
