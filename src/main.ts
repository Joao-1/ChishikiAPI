import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import AppModule from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(3000);

	const configService = app.get(ConfigService);

	await app.listen(configService.get("app.port"));
}

bootstrap();
