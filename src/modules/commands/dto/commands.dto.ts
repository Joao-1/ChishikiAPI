import { IsIn, IsNotEmpty } from "class-validator";

// eslint-disable-next-line import/prefer-default-export
export class RegisterCommandDTO {
	@IsNotEmpty()
	id: string;

	@IsNotEmpty()
	@IsIn(["public", "private", "custom"])
	scope: string;
}
