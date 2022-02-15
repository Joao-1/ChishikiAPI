import appConfig from "./appConfig";
import discordConfig from "./discordConfig";

const config = {
	envFilePath: [`.env.${process.env.NODE_ENV}`.trim()],
	load: [appConfig, discordConfig],
	isGlobal: true,
	expandVariables: true,
};

export default config;
