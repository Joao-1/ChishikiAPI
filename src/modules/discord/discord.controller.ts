import { Body, Controller, Post, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import DiscordServerService from "./discord.service";
import RegisterDiscordServerDTO from "./dto/discord.dto";

@Controller("discord")
export default class DiscordServerController {
	// eslint-disable-next-line no-unused-vars
	constructor(private discordServerService: DiscordServerService) { }

	@Post("register")
	async register(@Body(new ValidationPipe()) registerDiscordServer: RegisterDiscordServerDTO, @Res() res: Response) {
		const createdServer = await this.discordServerService.registerDiscordServer(registerDiscordServer.id);
		res.status(200).json({ status: "success", server: createdServer });
	}
}
