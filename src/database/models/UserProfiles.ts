/* eslint-disable prettier/prettier */
import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import Guild from "./guild";

@Table
class UserProfile extends Model {
	@AllowNull(false)
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	id!: number;

	@ForeignKey(() => Guild)
	@AllowNull(false)
	@Column(DataType.STRING)
	GuildId!: string;

	@BelongsTo(() => Guild)
	guild!: Guild;
}

export default UserProfile;
