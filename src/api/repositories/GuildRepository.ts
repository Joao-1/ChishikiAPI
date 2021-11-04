import Guild from "../../database/models/guild";
import ApiError from "../../helpers/apiErrror";
import { FindAndCountAllConfig, IGuildRepository } from "../../types/types";

class GuildRepository implements IGuildRepository {
    async createGuild(newGuildId: string | number) {
        const newGuild = await Guild.create({ id: newGuildId })
            .catch((e) => {
                console.log(e)
                throw new ApiError('Error creating a new guild in database');
            });
        return newGuild;
    }

    async findGuilds(config: FindAndCountAllConfig) {
        const guilds = await Guild.findAndCountAll(config)
            .catch((e) => {
                console.log(e);
                throw new ApiError('Error getting all guilds from database');
            });
        return guilds.rows;
    }

    async checkIfGuildAlreadyExists(guildId: string | number) {
        const guild = await Guild.findAll({ where: { id: guildId } });
        return guild.some(guild => { return guild.id === guildId });
    }
}

export default GuildRepository;