/* eslint-disable no-undef */
import { Server } from "http";
import request from "supertest";
import App from "../../src/app";
import DiscordServers from "../../src/database/models/DiscordServers";
import db from "../utils/database/getDatabase";
import truncate from "../utils/truncate";

const app = new App();
let server: Server;
let httpVerbs: request.SuperTest<request.Test>;

beforeAll(async () => {
	await app.load();
	server = app.start(3000);
	httpVerbs = request(server);
});

afterAll(async () => {
	const { connection } = db();
	await truncate(connection.models);
	connection.close();
	server.close();
});

describe("Create Discord Server", () => {
	it("should receive a code 201 when register a new Discord Server.", async () => {
		const registerDiscordServerResponse = await httpVerbs.post("/discord/server").send({
			id: "751646711251730452",
		});

		expect(registerDiscordServerResponse.statusCode).toBe(201);
		expect(registerDiscordServerResponse.body.status).toBe("success");
		expect(registerDiscordServerResponse.body).toHaveProperty("server");
	});

	it("should receive a code 422 when register a Discord Server with an existing id.", async () => {
		await DiscordServers.create({ id: "123" });
		const registerDiscordServerError422Response = await httpVerbs.post("/discord/server").send({
			id: "123",
		});

		expect(registerDiscordServerError422Response.statusCode).toBe(422);
		expect(registerDiscordServerError422Response.body.status).toBe("error");
	});
});

describe("Read Discord Server", () => {
	it("should receive a code 201 when get a Discord Server without params.", async () => {
		const registerDiscordServerResponse = await httpVerbs.get("/discord/server");

		expect(registerDiscordServerResponse.statusCode).toBe(200);
		expect(registerDiscordServerResponse.body.status).toBe("success");
		expect(registerDiscordServerResponse.body).toHaveProperty("servers");
	});
});
