import { INestApplication } from "@nestjs/common";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Test } from "@nestjs/testing";
import AppModule from "../../../../app.module";
import DiscordJsService from "../discordJS.service";
import { _IDiscordJsService } from "../structure";
/* eslint-disable no-undef */
describe("DiscordJsService", () => {
	let app: INestApplication;
	let discordJs: DiscordJsService;

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		discordJs = moduleFixture.get<DiscordJsService>(_IDiscordJsService);
		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it("should return true when trying verify if Guild exists in Discord Servers", async () => {
		discordJs.rest.get = jest.fn().mockImplementation(() => {
			return { id: "123" };
		});
		const verifyResult = await discordJs.verifyIfGuildExists("1234");
		expect(discordJs.rest.get).toBeCalledTimes(1);
		expect(discordJs.rest.get).toBeCalledWith("/guilds/1234");
		expect(verifyResult).toBe(true);
	});

	it("should return an error when trying to verify the existence of a guild from the Discord servers", async () => {
		const err = "ServicesProvidersError.DiscordError error";
		discordJs.rest.get = jest.fn().mockImplementation(() => {
			throw new Error(err);
		});
		try {
			await discordJs.verifyIfGuildExists("1234");
		} catch (error) {
			expect(error.message).toBe("Error when trying to verify the existence of a guild from Discord servers");
			expect(error.error.message).toBe(err);
			expect(error.place).toBe("DiscordJsService");
		}
	});
});
