-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT NOT NULL DEFAULT 'default',
ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'default',
ALTER COLUMN "pfp" SET DEFAULT 'default';
