// eslint-disable-next-line max-classes-per-file
import { IsArray, IsNotEmpty, IsNumberString, IsOptional } from "class-validator";

export class RegisterGuildDTO {
	@IsNotEmpty()
	id: string;
}

export class GetGuildDTO {
	@IsNumberString()
	@IsOptional()
	offset: string;

	@IsNumberString()
	@IsOptional()
	limit: string;

	@IsArray()
	@IsOptional()
	include: string[];
}
