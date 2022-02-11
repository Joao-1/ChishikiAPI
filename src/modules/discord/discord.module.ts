import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import PrismaModule from "src/providers/prisma/prisma.module";
import DiscordJSModule from "../external/discord.js/discordJS.module";
import DiscordServerController from "./discord.controller";
import DiscordServerRepository from "./discord.repository";
import DiscordServerService from "./discord.service";

@Module({
	imports: [ConfigModule, DiscordJSModule, PrismaModule],
	controllers: [DiscordServerController],
	providers: [DiscordServerService, DiscordServerRepository],
})
// eslint-disable-next-line prettier/prettier
export default class DiscordModule { }
