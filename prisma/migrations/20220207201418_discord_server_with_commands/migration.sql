-- CreateTable
CREATE TABLE "DiscordServer" (
    "id" TEXT NOT NULL,
    "prefix" TEXT NOT NULL DEFAULT E'!',
    "language" TEXT NOT NULL DEFAULT E'en-US',
    "status" TEXT NOT NULL DEFAULT E'active',

    CONSTRAINT "DiscordServer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordCommand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'disabled',
    "type" TEXT NOT NULL,

    CONSTRAINT "DiscordCommand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordServerCommands" (
    "discordServerId" TEXT NOT NULL,
    "discordCommandId" INTEGER NOT NULL,

    CONSTRAINT "DiscordServerCommands_pkey" PRIMARY KEY ("discordServerId","discordCommandId")
);

-- AddForeignKey
ALTER TABLE "DiscordServerCommands" ADD CONSTRAINT "DiscordServerCommands_discordServerId_fkey" FOREIGN KEY ("discordServerId") REFERENCES "DiscordServer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscordServerCommands" ADD CONSTRAINT "DiscordServerCommands_discordCommandId_fkey" FOREIGN KEY ("discordCommandId") REFERENCES "DiscordCommand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
