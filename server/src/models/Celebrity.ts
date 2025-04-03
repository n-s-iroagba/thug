import { Model, DataTypes, Optional, NonAttribute } from "sequelize";
import sequelize from "../config/orm";
import ClubMembership from "./ClubMembership";
import Souvenir from "./Souvenir";
import Charity from "./Charity";
import { Event } from "./Event";
import AppliedMeetGreet from "./AppliedMeetGreet";

export interface CelebrityAttributes {
  id: number;
  firstName: string;
  surname: string;
  bio: string;
  image: string;
  isConfirmed: boolean;
  stageName: string;
  events?: NonAttribute<Event[]>
  clubMemberships?:NonAttribute<ClubMembership[]>
  sourvenirs?:NonAttribute<Souvenir[]>
  charities?:NonAttribute<Charity[]>
  meetGreets?:NonAttribute<AppliedMeetGreet[]>
}

export type CelebrityCreationAttributes = Optional<CelebrityAttributes, "id">;

export class Celebrity
  extends Model<CelebrityAttributes, CelebrityCreationAttributes>
  implements CelebrityAttributes
{
  public id!: number;
  public firstName!: string;
  public surname!: string;
  public bio!: string;
  public image!: string;
  public isConfirmed!: boolean;
  public stageName!: string;


  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Celebrity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "celebrities",
  }
);
Celebrity.hasMany(
  Event,{
    foreignKey: "celebrityId",
    as: "events",
  }
)