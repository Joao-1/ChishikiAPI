/*
  Warnings:

  - The primary key for the `Command` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `type` on the `Command` table. All the data in the column will be lost.
  - The primary key for the `GuildCommands` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `scope` to the `Command` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GuildCommands" DROP CONSTRAINT "GuildCommands_discordCommandId_fkey";

-- AlterTable
ALTER TABLE "Command" DROP CONSTRAINT "Command_pkey",
DROP COLUMN "type",
ADD COLUMN     "scope" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Command_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Command_id_seq";

-- AlterTable
ALTER TABLE "GuildCommands" DROP CONSTRAINT "GuildCommands_pkey",
ALTER COLUMN "discordCommandId" SET DATA TYPE TEXT,
ADD CONSTRAINT "GuildCommands_pkey" PRIMARY KEY ("discordServerId", "discordCommandId");

-- AddForeignKey
ALTER TABLE "GuildCommands" ADD CONSTRAINT "GuildCommands_discordCommandId_fkey" FOREIGN KEY ("discordCommandId") REFERENCES "Command"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
