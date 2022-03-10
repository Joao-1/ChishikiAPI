import { registerAs } from "@nestjs/config";

export default registerAs("discord", () => ({
	clientId: process.env.DISCORD_CLIENT_ID,
	token: process.env.DISCORD_TOKEN,
}));
