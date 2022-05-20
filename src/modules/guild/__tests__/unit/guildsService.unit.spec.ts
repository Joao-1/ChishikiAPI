/* eslint-disable import/no-extraneous-dependencies */
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Guild } from "@prisma/client";
import AppModule from "../../../../app.module";
import GuildRepository from "../../guilds.repository";
import GuildService from "../../guilds.service";
import { _IGuildsRepository, _IGuildsService } from "../../structure";

/* eslint-disable no-undef */
describe("GuildService", () => {
	let app: INestApplication;
	let service: GuildService;
	let repository: GuildRepository;

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		service = moduleFixture.get<GuildService>(_IGuildsService);
		repository = moduleFixture.get<GuildRepository>(_IGuildsRepository);
		app = moduleFixture.createNestApplication();

		await app.init();
	});

	describe("registerGuild", () => {
		it("should return a new guild.", async () => {
			const returnValue = { id: "123", prefix: "!", language: "en_US", status: "active" };
			jest.spyOn(repository, "checkIfExistsById").mockReturnValue(Promise.resolve(false));
			jest.spyOn(repository, "insert").mockReturnValue(Promise.resolve(returnValue));

			const fakeGuild = await service.registerGuild("123");

			expect(repository.checkIfExistsById).toBeCalledTimes(1);
			expect(repository.checkIfExistsById).toBeCalledWith("123");
			expect(repository.insert).toBeCalledTimes(1);
			expect(fakeGuild).toBe(returnValue);
		});

		it("should return an error saying that the guild is already registered.", async () => {
			jest.spyOn(repository, "checkIfExistsById").mockReturnValue(Promise.resolve(true));

			try {
				await service.registerGuild("1234");
			} catch (error: any) {
				// expect(repository.checkIfExistsById).toBeCalledTimes(1);
				expect(repository.checkIfExistsById).toBeCalledWith("1234");
				expect(error.response.message).toBe("There is already a guild with this id registered in the system");
				expect(error.response.statusCode).toBe(422);
				expect(error.status).toBe(422);
			}
		});

		it("should return an error saying the guild doesn't exist on Discord servers.", async () => {
			jest.spyOn(repository, "checkIfExistsById").mockReturnValue(Promise.resolve(false));

			try {
				await service.registerGuild("12345");
			} catch (error: any) {
				expect(error.response.message).toBe(
					"Guild access with this id is unauthorized or does not exist on Discord servers"
				);
				expect(error.response.statusCode).toBe(422);
				expect(error.status).toBe(422);
			}
		});
	});

	describe("GetGuilds", () => {
		it("should return one guild without additional params", async () => {
			const guild: Guild = { id: "123", prefix: "!", language: "pt_BR", status: "active" };
			jest.spyOn(repository, "read").mockReturnValue(Promise.resolve([guild]));

			const getGuildsReturn = await service.getGuilds({});

			expect(getGuildsReturn[0].id).toBe("123");
			expect(repository.read).toHaveBeenCalledWith({ include: undefined, skip: 0, take: 99 });
		});
		it("should return one guild with your commands", async () => {
			jest.spyOn(repository, "read").mockReturnValue(Promise.resolve([{} as Guild]));

			await service.getGuilds({ include: ["commands"] });

			expect(repository.read).toHaveBeenCalledWith({ include: { commands: true }, skip: 0, take: 99 });
		});

		it("should return 20 guilds out of 50, starting at 10 and going up to 30", async () => {
			const guilds: Guild[] = [];
			for (let i = 1; i <= 50; i++) {
				guilds.push({ id: i.toString(), prefix: "!", language: "pt_BR", status: "active" });
			}
			jest.spyOn(repository, "read").mockReturnValue(Promise.resolve(guilds));

			const getGuildsFiltredWithOffSetAndLimit = await service.getGuilds({ offset: "10", limit: "20" });

			await service.getGuilds({ offset: "10", limit: "20" });

			expect(repository.read).toHaveBeenCalledWith({ include: undefined, skip: 10, take: 20 });
			expect(getGuildsFiltredWithOffSetAndLimit[0].id).toBe("1");
			expect(getGuildsFiltredWithOffSetAndLimit[29].id).toBe("30");
		});
	});
});
