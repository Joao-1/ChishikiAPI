/* eslint-disable prettier/prettier */
import {
	AllowNull,
	AutoIncrement,
	BelongsToMany,
	Column,
	DataType,
	Default,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import DiscordServerCommands from "./DiscordServerCommands";
import DiscordServers from "./DiscordServers";

@Table({ timestamps: false })
class DiscordCommands extends Model {
	@AllowNull(false)
	@AutoIncrement
	@PrimaryKey
	@Column(DataType.INTEGER)
	id!: number;

	@AllowNull(false)
	@Column(DataType.STRING)
	name!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	description!: string;

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
