import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import PrismaModule from "../../providers/prisma/prisma.module";
import GuildController from "./guilds.controller";
import GuildRepository from "./guilds.repository";
import GuildService from "./guilds.service";
import { _IGuildsRepository, _IGuildsService } from "./structure";

const providers = [
	{
		useClass: GuildService,
		provide: _IGuildsService,
	},
	{
		useClass: GuildRepository,
		provide: _IGuildsRepository,
	},
];

@Module({
	imports: [ConfigModule, PrismaModule],
	controllers: [GuildController],
	providers,
	exports: providers,
})
// eslint-disable-next-line prettier/prettier
export default class GuildModule { }
