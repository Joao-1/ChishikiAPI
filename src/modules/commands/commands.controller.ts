import { Body, Controller, Get, Inject, Post, Query, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { GetCommandDTO, RegisterCommandDTO } from "./dto/commands.dto";
import { ICommandsController, ICommandsService, _ICommandsService } from "./structure";

@Controller("commands")
export default class CommandsController implements ICommandsController {
	// eslint-disable-next-line prettier/prettier
	constructor(@Inject(_ICommandsService) private commandsService: ICommandsService) { }

	@Post()
	async post(@Body(new ValidationPipe()) { name, description, scope }: RegisterCommandDTO, @Res() res: Response) {
		const registredCommand = await this.commandsService.registerCommand(name, description, scope);
		res.status(201).json({ status: "success", guild: registredCommand });
	}

	@Get()
	async read(@Query(new ValidationPipe()) getGuilds: GetCommandDTO, @Res() res: Response) {
		const guilds = await this.commandsService.getCommands(getGuilds);
		res.status(200).json({ status: "success", guilds });
	}
}
