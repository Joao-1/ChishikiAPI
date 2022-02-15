import { INestApplication } from "@nestjs/common";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Test } from "@nestjs/testing";
import AppModule from "../../../../app.module";
import PrismaService from "../../../../providers/prisma/prisma.service";
import GuildRepository from "../../guild.repository";

/* eslint-disable no-undef */
describe("GuildRepository", () => {
	let app: INestApplication;
	let repository: GuildRepository;
	let prisma: PrismaService;

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		repository = moduleFixture.get<GuildRepository>(GuildRepository);
		prisma = moduleFixture.get<PrismaService>(PrismaService);
		app = moduleFixture.createNestApplication();

		await app.init();
	});

	it("should return an error when trying to insert a new record into the database.", async () => {
		jest.spyOn(prisma.guild, "create").mockImplementation(() => {
			throw new Error("GuildRepository.insertGuild error");
		});

		try {
			await repository.insertGuild("");
		} catch (error) {
			expect(error.message).toBe("An error occurred while trying to register a new guild in the database");
			expect(error.error.message).toBe("GuildRepository.insertGuild error");
		}
	});

	it("should return an error when trying to verify the existence of some guild by id.", async () => {
		jest.spyOn(prisma.guild, "findFirst").mockImplementation(() => {
			throw new Error("GuildRepository.checkIfGuildExistsById error");
		});

		try {
			await repository.checkIfGuildExistsById("");
		} catch (error) {
			expect(error.message).toBe("An error occurred while trying to check if a guild exists by Id");
			expect(error.error.message).toBe("GuildRepository.checkIfGuildExistsById error");
		}
	});
});
