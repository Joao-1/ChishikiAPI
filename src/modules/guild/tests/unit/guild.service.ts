/* eslint-disable import/no-extraneous-dependencies */
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import AppModule from "../../../../app.module";
import DiscordJsService from "../../../external/discord.js/discordJS.service";
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
		}).compile();

		service = moduleFixture.get<GuildService>(GuildService);
		repository = moduleFixture.get<GuildRepository>(GuildRepository);
		discordJs = moduleFixture.get<DiscordJsService>(DiscordJsService);
		app = moduleFixture.createNestApplication();

		await app.init();
	});

	describe("registerGuild", () => {
		it("should return a new guild.", async () => {
			const returnValue = { id: "123", prefix: "!", language: "en_US", status: "active" };
			jest.spyOn(repository, "checkIfExistsById").mockReturnValue(Promise.resolve(false));
			jest.spyOn(discordJs, "verifyIfGuildExists").mockReturnValue(Promise.resolve(true));
			jest.spyOn(repository, "insert").mockReturnValue(Promise.resolve(returnValue));

			const fakeGuild = await service.registerGuild("123");

			expect(repository.checkIfExistsById).toBeCalledTimes(1);
			expect(repository.checkIfExistsById).toBeCalledWith("123");
			expect(discordJs.verifyIfGuildExists).toBeCalledTimes(1);
			expect(discordJs.verifyIfGuildExists).toBeCalledWith("123");
			expect(repository.insert).toBeCalledTimes(1);
			expect(fakeGuild).toBe(returnValue);
		});

		it("should return an error saying that the guild is already registered.", async () => {
			jest.spyOn(repository, "checkIfExistsById").mockReturnValue(Promise.resolve(true));

			try {
				await service.registerGuild("1234");
			} catch (error) {
				expect(repository.checkIfExistsById).toBeCalledTimes(1);
				expect(repository.checkIfExistsById).toBeCalledWith("1234");
				expect(error.response.message).toBe("There is already a guild with this id registered in the system");
				expect(error.response.statusCode).toBe(422);
				expect(error.status).toBe(422);
			}
		});

		it("should return an error saying the guild doesn't exist on Discord servers.", async () => {
			jest.spyOn(repository, "checkIfExistsById").mockReturnValue(Promise.resolve(false));
			jest.spyOn(discordJs, "verifyIfGuildExists").mockReturnValue(Promise.resolve(false));

			try {
				await service.registerGuild("12345");
			} catch (error) {
				expect(discordJs.verifyIfGuildExists).toBeCalledTimes(1);
				expect(discordJs.verifyIfGuildExists).toBeCalledWith("12345");
				expect(error.response.message).toBe(
					"Guild access with this id is unauthorized or does not exist on Discord servers"
				);
				expect(error.response.statusCode).toBe(422);
				expect(error.status).toBe(422);
			}
		});
	});
});
