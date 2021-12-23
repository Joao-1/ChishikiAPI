/* eslint-disable no-undef */
import { Server } from "http";
import request from "supertest";
import App from "../../src/app";
import DiscordCommands from "../../src/database/models/DiscordCommands";
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

describe("Create Discord Command", () => {
	it("should receive a code 201 when register a new Discord Command.", async () => {
		const registerDiscordCommandResponse = await httpVerbs.post("/discord/commands").send({
			name: "test command name",
			description: "test command description",
			type: "public",
		});

		expect(registerDiscordCommandResponse.statusCode).toBe(201);
		expect(registerDiscordCommandResponse.body.status).toBe("success");
		expect(registerDiscordCommandResponse.body).toHaveProperty("command");
	});

	it("should receive a code 422 when trying to register a Discord Command that already exists", async () => {
		await DiscordCommands.create({ name: "command", description: "commandDescription", type: "public" });
		const registerDiscordCommandAlreadyExistsResponse = await httpVerbs.post("/discord/commands").send({
			name: "command",
			description: "CommandDescription",
			type: "public",
		});

		expect(registerDiscordCommandAlreadyExistsResponse.statusCode).toBe(422);
		expect(registerDiscordCommandAlreadyExistsResponse.body.status).toBe("error");
	});
});

describe("Read Discord Command", () => {
	it("should receive a code 200 when get a Discord Command without params.", async () => {
		const readDiscordCommandsAllResponse = await httpVerbs.get("/discord/commands");

		expect(readDiscordCommandsAllResponse.statusCode).toBe(200);
		expect(readDiscordCommandsAllResponse.body).toHaveProperty("commands");
	});

	it("should receive a code 200 when get a Discord Command with params `status=disabled`.", async () => {
		await DiscordCommands.create({ name: "command", description: "commandDescription", type: "public" });
		const readDiscordCommandstatusResponse = await httpVerbs.get("/discord/commands?status=disabled");

		expect(readDiscordCommandstatusResponse.statusCode).toBe(200);
		expect(readDiscordCommandstatusResponse.body.commands[0].status).toBe("disabled");
	});

	it("should receive a code 200 when get a Discord Command with params `include=servers`.", async () => {
		await DiscordCommands.create({ name: "command", description: "commandDescription", type: "public" });
		const readDiscordCommandsIncludeResponse = await httpVerbs.get("/discord/commands?include[]=servers");

		expect(readDiscordCommandsIncludeResponse.statusCode).toBe(200);
		expect(readDiscordCommandsIncludeResponse.body.commands[0]).toHaveProperty("servers");
	});

	it("should receive a code 200 when get a Discord Command with params 'offset=2&limit=1'.", async () => {
		await DiscordCommands.create({ name: "command", description: "commandDescription", type: "public" });
		await DiscordCommands.create({ name: "command2", description: "commandDescription2", type: "public2" });
		const readDiscordCommandsOffsetLimitResponse = await httpVerbs.get("/discord/commands?offset=2&limit=1");

		expect(readDiscordCommandsOffsetLimitResponse.statusCode).toBe(200);
		expect(readDiscordCommandsOffsetLimitResponse.body.commands.length).toBe(1);
	});
});

describe("Joi Validations tests", () => {
	it("should receive a code 422 when register a new Discord Command without name, description or type", async () => {
		const registerDiscordCommandsResponse = await httpVerbs.post("/discord/commands");

		expect(registerDiscordCommandsResponse.statusCode).toBe(422);
		expect(registerDiscordCommandsResponse.body.error).toHaveProperty("details");
	});

	it("should receive a code 422 when get a Discord Commands with params `type` incorrect.", async () => {
		const readDiscordCommandsStatusResponse = await httpVerbs.get("/discord/commands?type=incorrect");

		expect(readDiscordCommandsStatusResponse.statusCode).toBe(422);
		expect(readDiscordCommandsStatusResponse.body.status).toBe("error");
	});
});
