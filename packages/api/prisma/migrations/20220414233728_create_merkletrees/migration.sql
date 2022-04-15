-- CreateTable
CREATE TABLE "MerkleTree" (
    "id" TEXT NOT NULL,
    "merkleTree" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MerkleTree_pkey" PRIMARY KEY ("id")
);
