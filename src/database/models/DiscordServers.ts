/* eslint-disable prettier/prettier */
import { AllowNull, BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import DiscordCommands from "./DiscordCommands";
import DiscordServerCommands from "./DiscordServerCommands";

@Table
class DiscordServers extends Model {
	@AllowNull(false)
	@PrimaryKey
	@Column(DataType.STRING)
	id!: string;

	@AllowNull(false)
	@Default("!")
	@Column(DataType.STRING)
	prefix!: string;

	@AllowNull(false)
	@Default("en-US")
	@Column(DataType.STRING)
	language!: string;

	@Default("active")
	@Column(DataType.STRING)
	status!: string;

	@BelongsToMany(() => DiscordCommands, () => DiscordServerCommands)
	commands!: DiscordCommands[];
}

export default DiscordServers;
