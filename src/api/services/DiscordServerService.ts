import { RegisterDiscordServerError, UpdateDiscordServer } from "../../helpers/errors/errorsTypes";
import { failure, success } from "../../helpers/errors/responseError";
import generateReadMethodOptions from "../../helpers/generateReadMethodOptions";
import {
	findDiscordServersReturn,
	IDiscordServerBodyPut,
	IDiscordServerRepository,
	IDiscordServerService,
	IQueryParamsRead,
	registerDiscordServerReturn,
	updateDiscordServerServiceReturn,
} from "../../types/types";

class DiscordServerService implements IDiscordServerService {
	discordServerRepository: IDiscordServerRepository;

	constructor(discordServerRepository: IDiscordServerRepository) {
		this.discordServerRepository = discordServerRepository;
	}

	async registerDiscordServer(newDiscordServerId: string): registerDiscordServerReturn {
		const result = await this.discordServerRepository.checkIfDiscordServerAlreadyExists(newDiscordServerId);

		if (result.isFailure()) return failure(result.error);

		if (result.value) {
			return failure(RegisterDiscordServerError.DiscordServerAlreadyExistsError.create(newDiscordServerId));
		}

		const discordServerCreated = await this.discordServerRepository.createDiscordServer(newDiscordServerId);

		if (discordServerCreated.isFailure()) return failure(discordServerCreated.error);

		return success(discordServerCreated.value);
	}

	async readDiscordServers(querys: IQueryParamsRead): findDiscordServersReturn {
		const servers = await this.discordServerRepository.findDiscordServers(generateReadMethodOptions(querys));
		if (servers.isFailure()) return failure(servers.error);
		return success(servers.value);
	}

	async updateDiscordServer(
		discordServerId: string,
		newValues: IDiscordServerBodyPut
	): updateDiscordServerServiceReturn {
		const result = await this.discordServerRepository.checkIfDiscordServerAlreadyExists(discordServerId);

		if (result.isFailure()) return failure(result.error);

		if (!result.value) return failure(UpdateDiscordServer.DiscordServerDoesNotExist.create(discordServerId));

		const serverUpdated = await this.discordServerRepository.updateDiscordServer(discordServerId, newValues);

		if (serverUpdated.isFailure()) return failure(serverUpdated.error);
		return success(serverUpdated.value);
	}
}

export default DiscordServerService;
