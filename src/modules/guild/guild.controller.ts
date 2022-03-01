import { Body, Controller, Get, Inject, Post, Query, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { GetGuildDTO, RegisterGuildDTO } from "./dto/guild.dto";
import { IGuildService, _IGuildService } from "./structure";

@Controller("guild")
export default class GuildController {
	// eslint-disable-next-line prettier/prettier
	constructor(@Inject(_IGuildService) private guildService: IGuildService) { }

	@Post()
	async post(@Body(new ValidationPipe()) registerGuild: RegisterGuildDTO, @Res() res: Response) {
		const createdGuild = await this.guildService.registerGuild(registerGuild.id);
		res.status(201).json({ status: "success", guild: createdGuild });
	}

	@Get()
	async read(@Query(new ValidationPipe()) getGuilds: GetGuildDTO, @Res() res: Response) {
		const guilds = await this.guildService.getGuilds(getGuilds);
		res.status(200).json({ status: "success", guilds });
	}
}
