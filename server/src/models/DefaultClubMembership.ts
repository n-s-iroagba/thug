import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/orm";

export interface DefaultClubMembershipAttributes {
  id: number;
  tier: string;
  features: string[];
  price: number;
}

export type DefaultClubMembershipCreationAttributes = Optional<DefaultClubMembershipAttributes, "id">;

export class DefaultClubMembership
  extends Model<DefaultClubMembershipAttributes, DefaultClubMembershipCreationAttributes>
  implements DefaultClubMembershipAttributes {

  public id!: number;
  public tier!: string;
  public features!: string[];
  public price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DefaultClubMembership.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    features: {
      type: DataTypes.JSON, // ✅ Corrected type
      allowNull: false,
      defaultValue: [],
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "default_club_memberships",
    timestamps: true,
    underscored: true,
  }
);

export default DefaultClubMembership;
