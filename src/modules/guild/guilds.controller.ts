import { Body, Controller, Get, Inject, Post, Query, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { GetGuildDTO, RegisterGuildDTO } from "./dto/guilds.dto";
import { IGuildsController, IGuildsService, _IGuildsService } from "./structure";

@Controller("guilds")
export default class GuildController implements IGuildsController {
	// eslint-disable-next-line prettier/prettier
	constructor(@Inject(_IGuildsService) private guildService: IGuildsService) { }

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
