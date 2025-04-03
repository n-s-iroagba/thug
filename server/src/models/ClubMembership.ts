import { DataTypes, Model, Optional, NonAttribute, ForeignKey } from "sequelize";
import sequelize from "../config/orm";
import { Celebrity } from "./Celebrity";


export interface ClubMembershipAttributes {
  id: number;
  tier: string;
  features: string;  // Store the features as a comma-separated string
  celebrityId?: ForeignKey<Celebrity['id']>;
  celebrity?:NonAttribute<Celebrity>

}

export type ClubMembershipCreationAttributes = Optional<ClubMembershipAttributes, "id" | "celebrityId">;

export class ClubMembership
  extends Model<ClubMembershipAttributes, ClubMembershipCreationAttributes>
  implements ClubMembershipAttributes {

  public id!: number;
  public tier!: string;
  public features!: string;  // Comma-separated string
  public celebrityId?: ForeignKey<Celebrity['id']>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly celebrity?: NonAttribute<Celebrity>;
}

ClubMembership.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tier: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    features: {
      type: DataTypes.JSON, // ✅ Corrected type
      allowNull: false,
      defaultValue: [],
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "club_memberships",
    timestamps: true,
    underscored: true,
  }
);
ClubMembership.belongsTo(Celebrity, { foreignKey: "celebrityId", as: "celebrity" });
Celebrity.hasMany(ClubMembership, { foreignKey: "celebrityId", as: "clubMemberships" });

export default ClubMembership;
