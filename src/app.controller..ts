import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

@Controller()
export default class AppController {
	@Get("ping")
	async ping(@Res() res: Response) {
		res.status(200).json("pong");
	}
}
