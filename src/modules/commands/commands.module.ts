import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import PrismaModule from "../../providers/prisma/prisma.module";
import CommandsController from "./commands.controller";
import CommandsRepository from "./commands.repository";
import CommandService from "./commands.service";
import { _ICommandsRepository, _ICommandsService } from "./structure";

const providers = [
	{
		useClass: CommandService,
		provide: _ICommandsService,
	},
	{
		useClass: CommandsRepository,
		provide: _ICommandsRepository,
	},
];

@Module({
	imports: [ConfigModule, PrismaModule],
	controllers: [CommandsController],
	providers,
	exports: providers,
})
// eslint-disable-next-line prettier/prettier
export default class CommandModule { }
