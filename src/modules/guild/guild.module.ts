import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import PrismaModule from "../../providers/prisma/prisma.module";
import DiscordJSModule from "../external/discord.js/discordJS.module";
import GuildController from "./guild.controller";
import GuildRepository from "./guild.repository";
import GuildService from "./guild.service";
import { _IGuildService } from "./structure";

@Module({
	imports: [ConfigModule, DiscordJSModule, PrismaModule],
	controllers: [GuildController],
	providers: [
		{
			useClass: GuildService,
			provide: _IGuildService,
		},
		GuildRepository,
	],
})
// eslint-disable-next-line prettier/prettier
export default class GuildModule { }
