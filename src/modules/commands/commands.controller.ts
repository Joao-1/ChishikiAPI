import { Body, Controller, Inject, Post, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { RegisterCommandDTO } from "./dto/commands.dto";
import { ICommandsController, ICommandsService, _ICommandsService } from "./structure";

@Controller("commands")
export default class CommandsController implements ICommandsController {
	// eslint-disable-next-line prettier/prettier
	constructor(@Inject(_ICommandsService) private commandsService: ICommandsService) { }

	@Post()
	async post(@Body(new ValidationPipe()) { id, scope }: RegisterCommandDTO, @Res() res: Response) {
		const registredCommand = await this.commandsService.registerCommand(id, scope);
		res.status(201).json({ status: "success", guild: registredCommand });
	}
}
