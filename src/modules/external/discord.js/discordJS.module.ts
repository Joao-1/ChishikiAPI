import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import DiscordJsService from "./discordJS.service";

@Module({
	imports: [ConfigModule],
	providers: [DiscordJsService],
	exports: [DiscordJsService],
})
// eslint-disable-next-line prettier/prettier
export default class DiscordJSModule { }
