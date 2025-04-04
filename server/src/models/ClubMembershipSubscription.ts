import {
  Model,
  DataTypes,
  Optional,
  ForeignKey,
  NonAttribute,
} from "sequelize";

import sequelize from "../config/orm";
import { Celebrity } from "./Celebrity";
import Charity from "./Charity";
import ClubMembership from "./ClubMembership";
import { Fan } from "./Fan";
import { Souvenir } from "./Souvenir";

interface ClubMembershipSubscriptionAttributes {
  id: number;
  fanId: ForeignKey<Fan["id"]>;
  isMax: boolean | null;
  dateOfLastPayment: Date;
  membership?: NonAttribute<ClubMembership>;
  fan?: NonAttribute<Fan>;
  membershipId: ForeignKey<ClubMembership["id"]>;
  status: "Active" | "Pending" | "Expired" | "Unpaid";
}

export type ClubMembershipSubscriptionCreationAttributes = Optional<ClubMembershipSubscriptionAttributes, "id">;

export class ClubMembershipSubscription
  extends Model<ClubMembershipSubscriptionAttributes, ClubMembershipSubscriptionCreationAttributes>
  implements ClubMembershipSubscriptionAttributes
{
  public id!: number;
  public fanId!: ForeignKey<Fan["id"]>;
  public isMax!: boolean | null;
  public dateOfLastPayment!: Date;
  public membershipId!: ForeignKey<ClubMembership["id"]>;
  public status!: "Active" | "Pending" | "Expired" | "Unpaid";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public fan?: NonAttribute<Fan>;
}

ClubMembershipSubscription.init(
  {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
  
      fanId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: Fan,
              key: "id",
          },
      },

      membershipId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: ClubMembership,
              key: "id",
          },
      },

      status: {
          type: DataTypes.ENUM("Active", "Pending", "Expired", "Unpaid"),
          allowNull: false,
      },
      
      isMax: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
      },
    
      dateOfLastPayment: {
          type: DataTypes.DATE,
          allowNull: true,
      }
  },
  {
      sequelize,
      modelName: "ClubMembershipSubscription",
      timestamps: true,
  }
);

ClubMembershipSubscription.belongsTo(Fan, { foreignKey: "fanId", as: "clubMemberships" })

Fan.hasMany(ClubMembershipSubscription, { foreignKey: "fanId", as: "clubMemberships" });

export default ClubMembershipSubscription;
