import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import PrismaModule from "../../providers/prisma/prisma.module";
import DiscordJSModule from "../external/discord.js/discordJS.module";
import GuildController from "./guild.controller";
import GuildRepository from "./guild.repository";
import GuildService from "./guild.service";
import { _IGuildRepository, _IGuildService } from "./structure";

const providers = [
	{
		useClass: GuildService,
		provide: _IGuildService,
	},
	{
		useClass: GuildRepository,
		provide: _IGuildRepository,
	},
];

@Module({
	imports: [ConfigModule, DiscordJSModule, PrismaModule],
	controllers: [GuildController],
	providers,
	exports: providers,
})
// eslint-disable-next-line prettier/prettier
export default class GuildModule { }
