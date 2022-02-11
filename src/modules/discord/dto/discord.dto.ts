import { IsNotEmpty } from "class-validator";

export default class RegisterDiscordServerDTO {
	@IsNotEmpty()
	id: string;
}
