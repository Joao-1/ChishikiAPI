import { INestApplication } from "@nestjs/common";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Test } from "@nestjs/testing";
import AppModule from "../../../../app.module";
import PrismaService from "../../../../providers/prisma/prisma.service";
import GuildRepository from "../../guilds.repository";
import { _IGuildsRepository } from "../../structure";

// eslint-disable-next-line no-undef
// jest.setTimeout(10000);
/* eslint-disable no-undef */
describe("GuildRepository", () => {
	let app: INestApplication;
	let repository: GuildRepository;
	let prisma: PrismaService;

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		repository = moduleFixture.get<GuildRepository>(_IGuildsRepository);
		prisma = moduleFixture.get<PrismaService>(PrismaService);
		app = moduleFixture.createNestApplication();

		await app.init();
	});

	describe("insert", () => {
		it("should return an error when trying to insert a new record into the database.", async () => {
			const err = "GuildRepository.insert error";
			jest.spyOn(prisma.guild, "create").mockImplementation(() => {
				throw new Error(err);
			});

			try {
				await repository.insert("123");
			} catch (error: any) {
				expect(prisma.guild.create).toBeCalledTimes(1);
				expect(prisma.guild.create).toBeCalledWith({ data: { id: "123" } });
				expect(error.message).toBe("An error occurred while trying to register a new guild in the database");
				expect(error.error.message).toBe(err);
				expect(error.place).toBe("GuildRepository");
			}
		});
	});

	describe("checkIfExistsById", () => {
		it("should return an error when trying to verify the existence of some guild by id.", async () => {
			const err = "GuildRepository.checkIfExistsById error";
			jest.spyOn(prisma.guild, "findFirst").mockImplementation(() => {
				throw new Error(err);
			});

			try {
				await repository.checkIfExistsById("1234");
			} catch (error: any) {
				expect(prisma.guild.findFirst).toBeCalledTimes(1);
				expect(prisma.guild.findFirst).toBeCalledWith({ where: { id: "1234" } });
				expect(error.message).toBe("An error occurred while trying to check if a guild exists by Id");
				expect(error.error.message).toBe(err);
				expect(error.place).toBe("GuildRepository");
			}
		});
	});
});
