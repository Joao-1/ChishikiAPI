import {
  Table,
  Column,
  Model,
  HasMany,
  AllowNull,
  DataType,
  Default,
  PrimaryKey,
} from "sequelize-typescript";
import UserProfile from "./UserProfiles";

@Table
class Guild extends Model {
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.STRING)
  id!: string;

  @AllowNull(false)
  @Default('!')
  @Column(DataType.STRING)
  prefix!: string;

  @AllowNull(false)
  @Default('en-US')
  @Column(DataType.STRING)
  language!: string;

  @Default('active')
  @Column(DataType.STRING)
  status!: string;

  @HasMany(() => UserProfile)
  userProfile!: UserProfile[];
}

export default Guild;