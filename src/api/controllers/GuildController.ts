import { IQueryParams, IGuildService } from './../../types/types.d';
import { Request, Response, NextFunction } from 'express';

class GuildController {
    guildService: IGuildService;

    constructor(guildService: IGuildService) {
        this.guildService = guildService;
    }

    async create(req: Request, res: Response, NextFunction: NextFunction) {
        const guildId = req.body.id as string;
        const newGuild = await this.guildService.createGuild(guildId);
        res.status(201).json({ status: 'sucess', newGuild });
    }

    async read(req: Request, res: Response, NextFunction: NextFunction) {
        const querys = req.query as unknown as IQueryParams;
        const guildsSearched = await this.guildService.readGuilds(querys);
        res.status(200).json({ status: 'sucess', guilds: guildsSearched });
    }

    async update() {

    }

    async delete() {

    }
}

export default GuildController