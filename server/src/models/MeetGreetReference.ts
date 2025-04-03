import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/orm";
export type MeetGreetReferenceAttributes = {
    id: number;
    celebrityId: number | null;
    pricePerDay: number;
    features: string[];
}


export type MeetGreetReferenceCreationAttributes = Omit<MeetGreetReferenceAttributes, "id" | "celebrityId">;


export class MeetGreetReference
  extends Model<MeetGreetReferenceAttributes, MeetGreetReferenceCreationAttributes>
  implements MeetGreetReferenceAttributes 
{
  public id!: number;
  public celebrityId: number|null = null;
  public pricePerDay!: number;
  public features!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MeetGreetReference.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      celebrityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pricePerDay: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      features: {
        type: DataTypes.JSON, // JSON is suitable for an array of strings
        allowNull: false,
        defaultValue: [], // Ensure it has an empty array as the default value
      },
    },
    {
      sequelize,
      tableName: "meet_greet_references",
      timestamps: true,
      underscored: true,
    }
  );
  

export default MeetGreetReference;
