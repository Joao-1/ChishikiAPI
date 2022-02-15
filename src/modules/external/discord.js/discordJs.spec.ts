import { INestApplication } from "@nestjs/common";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Test } from "@nestjs/testing";
import AppModule from "../../../app.module";
import DiscordJsService from "../../external/discord.js/discordJS.service";
/* eslint-disable no-undef */
describe("DiscordJsService", () => {
	let app: INestApplication;
	let discordJs: DiscordJsService;

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		discordJs = moduleFixture.get<DiscordJsService>(DiscordJsService);
		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it("should return an error when trying to verify the existence of a guild from the Discord servers", async () => {
		discordJs.rest.get = jest.fn().mockImplementation(() => {
			throw new Error("ServicesProvidersError.DiscordError error");
		});
		try {
			await discordJs.verifyIfGuildExists("");
		} catch (error) {
			expect(error.message).toBe("Error when trying to verify the existence of a guild from Discord servers");
			expect(error.error.message).toBe("ServicesProvidersError.DiscordError error");
		}
	});
});
