import { IsNotEmpty } from "class-validator";

export default class RegisterGuildDTO {
	@IsNotEmpty()
	id: string;
}
