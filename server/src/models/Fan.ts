import {
  DataTypes,
  ForeignKey,
  Model,
  Optional,
  NonAttribute,
} from "sequelize";
import { User } from "./User";
import sequelize from "../config/orm";
import AppliedMeetGreet from "./AppliedMeetGreet";
import ClubMembershipSubscription from "./ClubMembershipSubscription";
import Message from "./Message";


interface FanAttributes {
  id: number;
  firstName: string;
  surname: string;
  profilePicture: string | null;
  countryOfResidence: string;
  gender: string;
  dateOfBirth: Date;
  userId: ForeignKey<User["id"]>;
  occupation: string;
  events?:NonAttribute<Event[]>
  meetGreets?: NonAttribute<AppliedMeetGreet[]>
  clubSubscriptions?:NonAttribute<ClubMembershipSubscription[]>
  messages?:NonAttribute<Message []>
  user?: NonAttribute<User>;

}

export type FanCreationAttributes = Optional<FanAttributes, "id">;

export class Fan
  extends Model<FanAttributes, FanCreationAttributes>
  implements FanAttributes
{
  public id!: number;
  public firstName!: string;
  public surname!: string;
  public profilePicture: string | null = null;
  public userId!: number;
  public countryOfResidence!: string;
  public occupation!: string;

  public dateOfBirth!: Date;
  public gender!: string;


  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Fan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
    countryOfResidence: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  
    occupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
  },
  {
    sequelize,
    tableName: "fans",
  }


);
Fan.belongsTo(User, { foreignKey: "userId", as: 'user' });
User.hasOne(Fan, { foreignKey: "userId" });