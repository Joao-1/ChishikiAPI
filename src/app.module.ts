import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import ConfigValues from "./config";
import GuildModule from "./modules/guild/guild.module";
import PrismaModule from "./providers/prisma/prisma.module";

@Module({
	imports: [ConfigModule.forRoot(ConfigValues), GuildModule, PrismaModule],
	exports: [PrismaModule],
})
// eslint-disable-next-line prettier/prettier
export default class AppModule { }
