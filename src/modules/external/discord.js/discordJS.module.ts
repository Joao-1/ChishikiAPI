import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import DiscordJsService from "./discordJS.service";
import { _IDiscordJsService } from "./structure";

@Module({
	imports: [ConfigModule],
	providers: [
		{
			useClass: DiscordJsService,
			provide: _IDiscordJsService,
		},
	],
	exports: [
		{
			useClass: DiscordJsService,
			provide: _IDiscordJsService,
		},
	],
})
// eslint-disable-next-line prettier/prettier
export default class DiscordJSModule { }
