// eslint-disable-next-line max-classes-per-file
import { IsIn, IsNotEmpty, IsNumberString, IsOptional } from "class-validator";

export class RegisterCommandDTO {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	description: string;

	@IsNotEmpty()
	@IsIn(["public", "private", "custom"])
	scope: string;
}

export class GetCommandDTO {
	@IsNumberString()
	@IsOptional()
	offset: string;

	@IsNumberString()
	@IsOptional()
	limit: string;
}
