// eslint-disable-next-line max-classes-per-file
import { IsIn, IsNotEmpty, IsNumberString, IsOptional } from "class-validator";

export class RegisterGuildDTO {
	@IsNotEmpty()
	id: string;
}

export class GetGuildDTO {
	@IsNumberString()
	@IsOptional()
	offset: string;

	@IsOptional()
	@IsNumberString()
	limit: string;

	@IsIn(["commands"])
	@IsOptional()
	include: string[];
}
