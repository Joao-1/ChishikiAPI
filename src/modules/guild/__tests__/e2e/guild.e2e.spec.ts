/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { PrismaClient } from "@prisma/client";
import * as request from "supertest";
import truncateDb from "../../../../../test/utils/testsUtils";
import AppModule from "../../../../app.module";

describe("Guild", () => {
	let app: INestApplication;
	const prisma = new PrismaClient();
	let req: request.SuperTest<request.Test>;

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		req = request(app.getHttpServer());
		await app.init();
	});

	beforeEach(async () => {
		await truncateDb(prisma);
	});

	afterAll(async () => {
		app.close();
	});

	describe("Guild Register", () => {
		it("should return a new guild.", async () => {
			const response = await req.post("/guild").send({ id: "751646711251730452" });

			expect(response.status).toBe(201);
			expect(response.body.status).toBe("success");
			expect(response.body.guild).toStrictEqual({
				id: "751646711251730452",
				prefix: "!",
				language: "en-US",
				status: "active",
			});
		});

		it("should return an error when trying to register a guild that does not exist on Discord servers.", async () => {
			const response = await req.post("/guild").send({ id: "1234" });

			expect(response.status).toBe(422);
			expect(response.body.statusCode).toBe(422);
			expect(response.body.message).toBe(
				"Guild access with this id is unauthorized or does not exist on Discord servers"
			);
		});

		it("should return an error when trying to register a guild that is already registered.", async () => {
			await prisma.guild.create({ data: { id: "1234" } });

			const response = await req.post("/guild").send({ id: "1234" });

			expect(response.status).toBe(422);
			expect(response.body.statusCode).toBe(422);
			expect(response.body.message).toBe("There is already a guild with this id registered in the system");
		});
	});

	describe("Get Guild", () => {
		it("should return one guild", async () => {
			await prisma.guild.create({ data: { id: "12345" } });

			const getOneGuildResponse = await req.get("/guild").send();

			expect(getOneGuildResponse.body).toHaveProperty("guilds");
			expect(getOneGuildResponse.body.guilds[0].id).toBe("12345");
		});

		it("should return two guilds of five", async () => {
			await prisma.guild.createMany({ data: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }] });

			const getTwoOfFiveGuildResponse = await req.get("/guild").query({ offset: 3, limit: 2 });

			expect(getTwoOfFiveGuildResponse.body).toHaveProperty("guilds");
			expect(getTwoOfFiveGuildResponse.body.guilds).toHaveLength(2);
			expect(getTwoOfFiveGuildResponse.body.guilds[0].id).toBe("4");
			expect(getTwoOfFiveGuildResponse.body.guilds[1].id).toBe("5");
		});
	});
});
