/* eslint-disable no-undef */
import { Server } from "http";
import request from "supertest";
import App from "../../src/app";
import DiscordServers from "../../src/database/models/DiscordServers";
import db from "../utils/database/getDatabase";
import truncate from "../utils/truncate";

const { connection } = db();

const app = new App();
let server: Server;
let httpVerbs: request.SuperTest<request.Test>;

beforeAll(async () => {
	await app.load();
	server = app.start(3000);
	httpVerbs = request(server);
});

afterAll(async () => {
	server.close();
	connection.close();
});

afterEach(async () => {
	await truncate(connection.models);
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
	it("should receive a code 200 when get a Discord Server without params.", async () => {
		const readDiscordServerAllResponse = await httpVerbs.get("/discord/server");

		expect(readDiscordServerAllResponse.statusCode).toBe(200);
		expect(readDiscordServerAllResponse.body).toHaveProperty("servers");
	});

	it("should receive a code 200 when get a Discord Server with params `status=disabled`.", async () => {
		await DiscordServers.create({ id: 321, status: "disabled" });
		const readDiscordServerStatusResponse = await httpVerbs.get("/discord/server?status=disabled");

		expect(readDiscordServerStatusResponse.statusCode).toBe(200);
		expect(readDiscordServerStatusResponse.body.servers[0].status).toBe("disabled");
	});

	it("should receive a code 200 when get a Discord Server with params `include=commands`.", async () => {
		await DiscordServers.create({ id: 777 });
		const readDiscordServerIncludeResponse = await httpVerbs.get("/discord/server?include[]=commands");

		expect(readDiscordServerIncludeResponse.statusCode).toBe(200);
		expect(readDiscordServerIncludeResponse.body.servers[0]).toHaveProperty("commands");
	});

	it("should receive a code 200 when get a Discord Server with params 'servers[]=888&servers[]=666'.", async () => {
		await DiscordServers.create({ id: 888 });
		await DiscordServers.create({ id: 666 });
		const readDiscordServerServersResponse = await httpVerbs.get("/discord/server?servers[]=888&servers[]=666");

		expect(readDiscordServerServersResponse.statusCode).toBe(200);
		expect(readDiscordServerServersResponse.body.servers[0].id).toBe("888");
		expect(readDiscordServerServersResponse.body.servers[1].id).toBe("666");
	});

	it("should receive a code 200 when get a Discord Server with params 'offset=2&limit=1'.", async () => {
		await DiscordServers.create({ id: 111 });
		await DiscordServers.create({ id: 222 });
		const readDiscordServerOffsetLimitResponse = await httpVerbs.get("/discord/server?offset=2&limit=1");

		expect(readDiscordServerOffsetLimitResponse.statusCode).toBe(200);
		expect(readDiscordServerOffsetLimitResponse.body.servers.length).toBe(1);
	});
});

describe("Put Discord Server", () => {
	it("should receive a code 204 when put a Discord Server with a new value", async () => {
		await DiscordServers.create({ id: 1111 });
		const putDiscordServerResponse = await httpVerbs.put("/discord/server/1111");

		expect(putDiscordServerResponse.statusCode).toBe(204);
	});

	it("should receive a code 404 when put a Discord Server that does not exist", async () => {
		const putDiscordServerResponse = await httpVerbs.put("/discord/server/000");

		expect(putDiscordServerResponse.statusCode).toBe(404);
	});
});

describe("Joi Validations tests", () => {
	it("should receive a code 422 when register a new Discord Server without id.", async () => {
		const registerDiscordServerResponse = await httpVerbs.post("/discord/server").send({
			id: "",
		});

		expect(registerDiscordServerResponse.statusCode).toBe(422);
		expect(registerDiscordServerResponse.body.status).toBe("error");
	});

	it("should receive a code 422 when get a Discord Server with params `status` incorrect.", async () => {
		const readDiscordServerStatusResponse = await httpVerbs.get("/discord/server?status=incorrect");

		expect(readDiscordServerStatusResponse.statusCode).toBe(422);
		expect(readDiscordServerStatusResponse.body.status).toBe("error");
	});

	it("should receive a code 422 when trying to update a Discord Server without providing the id", async () => {
		const putDiscordServerResponse = await httpVerbs.put("/discord/server/t3st");

		expect(putDiscordServerResponse.statusCode).toBe(422);
		expect(putDiscordServerResponse.body.status).toBe("error");
	});
});
