import { Body, Controller, Post, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import RegisterGuildDTO from "./dto/guild.dto";
import GuildService from "./guild.service";

@Controller("guild")
export default class GuildController {
	// eslint-disable-next-line no-unused-vars
	constructor(private guildService: GuildService) { }

	@Post()
	async register(@Body(new ValidationPipe()) registerGuild: RegisterGuildDTO, @Res() res: Response) {
		const createdGuild = await this.guildService.registerGuild(registerGuild.id);
		res.status(201).json({ status: "success", guild: createdGuild });
	}
}
