/* eslint-disable import/no-extraneous-dependencies */
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import AppModule from "../../../../app.module";
import DiscordJsService from "../../../../modules/external/discord.js/discordJS.service";
import GuildRepository from "../../guild.repository";
import GuildService from "../../guild.service";

/* eslint-disable no-undef */
describe("GuildService", () => {
	let app: INestApplication;
	let service: GuildService;
	let repository: GuildRepository;
	let discordJs: DiscordJsService;

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		})
			// eslint-disable-next-line consistent-return
			.useMocker((token) => {
				if (token === GuildRepository) {
					return {
						insertGuild: jest.fn(),
						checkIfGuildExistsById: jest.fn(),
					};
				}
			})
			.compile();

		service = moduleFixture.get<GuildService>(GuildService);
		repository = moduleFixture.get<GuildRepository>(GuildRepository);
		discordJs = moduleFixture.get<DiscordJsService>(DiscordJsService);
		app = moduleFixture.createNestApplication();

		await app.init();
	});

	describe("registerGuild", () => {
		it("should return a new guild when checking if a registered guild already exists.", async () => {
			jest.spyOn(repository, "checkIfGuildExistsById").mockReturnValue(Promise.resolve(false));
			jest.spyOn(discordJs, "verifyIfGuildExists").mockReturnValue(Promise.resolve(true));
			jest.spyOn(repository, "insertGuild").mockReturnValue(
				Promise.resolve({ id: "123", prefix: "!", language: "en_US", status: "active" })
			);

			const fakeGuild = await service.registerGuild("");

			expect(repository.checkIfGuildExistsById).toBeCalledTimes(1);
			expect(fakeGuild.id).toBe("123");
		});

		it("should return an error saying that the guild is already registered.", async () => {
			jest.spyOn(repository, "checkIfGuildExistsById").mockReturnValue(Promise.resolve(true));
			try {
				await service.registerGuild("751646711251730452");
			} catch (error) {
				expect(error.response.message).toBe("There is already a guild with this id registered in the system");
				expect(error.response.statusCode).toBe(422);
			}
		});

		it("should return an error saying the guild doesn't exist on Discord servers.", async () => {
			jest.spyOn(repository, "checkIfGuildExistsById").mockReturnValue(Promise.resolve(false));
			jest.spyOn(discordJs, "verifyIfGuildExists").mockReturnValue(Promise.resolve(false));

			try {
				await service.registerGuild("");
			} catch (error) {
				expect(repository.checkIfGuildExistsById).toBeCalledTimes(1);

				expect(error.response.message).toBe(
					"Guild access with this id is unauthorized or does not exist on Discord servers"
				);
				expect(error.response.statusCode).toBe(422);
			}
		});
	});
});
