import { ConfigModule } from "@nestjs/config";
import appConfig from "./appConfig";
import discordConfig from "./discordConfig";

const config = ConfigModule.forRoot({
	envFilePath: [".env"],
	load: [appConfig, discordConfig],
	isGlobal: true,
	expandVariables: true,
});

export default config;
