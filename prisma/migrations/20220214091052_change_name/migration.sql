/*
  Warnings:

  - You are about to drop the `DiscordCommand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiscordServer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiscordServerCommands` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DiscordServerCommands" DROP CONSTRAINT "DiscordServerCommands_discordCommandId_fkey";

-- DropForeignKey
ALTER TABLE "DiscordServerCommands" DROP CONSTRAINT "DiscordServerCommands_discordServerId_fkey";

-- DropTable
DROP TABLE "DiscordCommand";

-- DropTable
DROP TABLE "DiscordServer";

-- DropTable
DROP TABLE "DiscordServerCommands";

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "prefix" TEXT DEFAULT E'!',
    "language" TEXT DEFAULT E'en-US',
    "status" TEXT DEFAULT E'active',

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Command" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'disabled',
    "type" TEXT NOT NULL,

    CONSTRAINT "Command_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildCommands" (
    "discordServerId" TEXT NOT NULL,
    "discordCommandId" INTEGER NOT NULL,

    CONSTRAINT "GuildCommands_pkey" PRIMARY KEY ("discordServerId","discordCommandId")
);

-- AddForeignKey
ALTER TABLE "GuildCommands" ADD CONSTRAINT "GuildCommands_discordServerId_fkey" FOREIGN KEY ("discordServerId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildCommands" ADD CONSTRAINT "GuildCommands_discordCommandId_fkey" FOREIGN KEY ("discordCommandId") REFERENCES "Command"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
