import { Module } from "@nestjs/common";
import ConfigValues from "./config";
import DiscordModule from "./modules/discord/discord.module";
import PrismaModule from "./providers/prisma/prisma.module";

@Module({
	imports: [ConfigValues, DiscordModule, PrismaModule],
	exports: [PrismaModule],
})
// eslint-disable-next-line prettier/prettier
export default class AppModule { }
