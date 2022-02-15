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

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await truncateDb(prisma);
		app.close();
	});

	describe("Guild Register", () => {
		it("should return a new guild.", async () => {
			const response = await request(app.getHttpServer()).post("/guild").send({ id: "751646711251730452" });

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
			const response = await request(app.getHttpServer()).post("/guild").send({ id: "1234" });

			expect(response.status).toBe(422);
			expect(response.body.statusCode).toBe(422);
			expect(response.body.message).toBe(
				"Guild access with this id is unauthorized or does not exist on Discord servers"
			);
		});

		it("should return an error when trying to register a guild that is already registered.", async () => {
			await prisma.guild.create({ data: { id: "1234" } });
			const response = await request(app.getHttpServer()).post("/guild").send({ id: "1234" });
			expect(response.status).toBe(422);
			expect(response.body.statusCode).toBe(422);
			expect(response.body.message).toBe("There is already a guild with this id registered in the system");
		});
	});
});