/* eslint-disable prettier/prettier */
import { Column, DataType, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import DiscordCommands from "./DiscordCommands";
import DiscordServers from "./DiscordServers";

@Table
class DiscordServerCommands extends Model {
	@ForeignKey(() => DiscordServers)
	@Column(DataType.STRING)
	DiscordServerId!: string;

	@ForeignKey(() => DiscordCommands)
	@Column(DataType.STRING)
	DiscordCommandId!: string;

	@Default("disabled")
	@Column(DataType.STRING)
	localStatus!: string;
}

export default DiscordServerCommands;
