import { IGuild } from './../../../../ChishikiDiscordBot/src/types/types.d';
import { FindAndCountAllConfig, IGuildRepository, IGuildService, IQueryParams, IWhereClause } from './../../types/types.d';
import ApiError from '../../helpers/apiErrror';
import { Includeable, WhereAttributeHash } from 'sequelize/types';

class GuildService implements IGuildService {
    guildRepository: IGuildRepository;

    constructor(guildRepository: IGuildRepository) {
        this.guildRepository = guildRepository;
    }

    async createGuild(newGuildId: string | number) {
        if ((await this.guildRepository.checkIfGuildAlreadyExists(newGuildId))) {
            throw new ApiError('There is already a guild with this id', 409);
        }
        const guildCreated = await this.guildRepository.createGuild(newGuildId);
        return guildCreated;
    }

    async readGuilds(querys: IQueryParams) {
        const whereClause: IWhereClause = {};
        const includeModels: Includeable[] = [];

        const filtersConfig: { [key: string]: any } = {
            'status': () => { whereClause.status = querys.status },
        };

        for (let requestFilters in querys) {
            filtersConfig[requestFilters]();
        };

        const options: FindAndCountAllConfig = {
            offset: querys.offset || 1,
            limit: querys.limit || 100,
            where: whereClause,
            include: includeModels
        };

        const guilds = await this.guildRepository.findGuilds(options);
        return guilds;
    }
}

export default GuildService;