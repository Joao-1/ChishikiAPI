import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import AppController from "./app.controller.";
import ConfigValues from "./config";
import CommandModule from "./modules/commands/commands.module";
import GuildModule from "./modules/guild/guilds.module";
import PrismaModule from "./providers/prisma/prisma.module";

@Module({
	imports: [ConfigModule.forRoot(ConfigValues), GuildModule, CommandModule, PrismaModule],
	exports: [PrismaModule],
	controllers: [AppController],
})
// eslint-disable-next-line prettier/prettier
export default class AppModule { }
