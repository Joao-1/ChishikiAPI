/* eslint-disable prettier/prettier */
import { AllowNull, BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import DiscordServerCommands from "./DiscordServerCommands";
import DiscordServers from "./DiscordServers";

@Table
class DiscordCommands extends Model {
	@AllowNull(false)
	@PrimaryKey
	@Column(DataType.STRING)
	id!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	name!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	type!: string;

	@Default("disabled")
	@Column(DataType.STRING)
	globalStatus!: string;

	@BelongsToMany(() => DiscordServers, () => DiscordServerCommands)
	servers!: DiscordServers;
}

export default DiscordCommands;
