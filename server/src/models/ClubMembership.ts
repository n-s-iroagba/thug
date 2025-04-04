import { DataTypes, Model, Optional, NonAttribute, ForeignKey } from "sequelize";
import sequelize from "../config/orm";
import { Celebrity } from "./Celebrity";

export interface ClubMembershipAttributes {
  id: number;
  tier: string;
  features: string[];  // Store the features as a comma-separated string
  celebrityId: ForeignKey<Celebrity['id']>; // Make celebrityId required
  celebrity?: NonAttribute<Celebrity>;
}

export type ClubMembershipCreationAttributes = Optional<ClubMembershipAttributes, "id">; // celebrityId is required now

export class ClubMembership
  extends Model<ClubMembershipAttributes, ClubMembershipCreationAttributes>
  implements ClubMembershipAttributes {

  public id!: number;
  public tier!: string;
  public features!: string[];  // Comma-separated string
  public celebrityId!: ForeignKey<Celebrity['id']>; // Make celebrityId required

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
      type: DataTypes.STRING, // Corrected to STRING for tier
      allowNull: false,
    },
    features: {
      type: DataTypes.JSON, // ✅ Corrected type
      allowNull: false,
      defaultValue: [],
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Now required
    },
  },
  {
    sequelize,
    tableName: "club_memberships",
    timestamps: true,
    underscored: true,
  }
);

Celebrity.hasMany(ClubMembership, { foreignKey: "celebrityId", as: "clubMemberships" });
ClubMembership.belongsTo(Celebrity, { foreignKey: "celebrityId", as: "celebrity" });

export default ClubMembership;
