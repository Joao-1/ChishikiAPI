-- AlterTable
ALTER TABLE "DiscordServer" ALTER COLUMN "prefix" DROP NOT NULL,
ALTER COLUMN "language" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;