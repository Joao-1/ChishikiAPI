import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import AppController from "./app.controller.";
import ConfigValues from "./config";
import GuildModule from "./modules/guild/guilds.module";
import PrismaModule from "./providers/prisma/prisma.module";

@Module({
	imports: [ConfigModule.forRoot(ConfigValues), GuildModule, PrismaModule],
	exports: [PrismaModule],
	controllers: [AppController],
})
// eslint-disable-next-line prettier/prettier
export default class AppModule { }
