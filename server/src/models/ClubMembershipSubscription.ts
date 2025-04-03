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
    dateOflastPayment:Date;
    membership?: NonAttribute<ClubMembership>;
    fan?: NonAttribute<Fan>;
    membershipId:ForeignKey<['id']>
    status:  "Active"| "Pending"| "Expired"|"Unpaid"
  }
  
  type ClubMembershipSubscriptionCreationAttributes = Optional<ClubMembershipSubscriptionAttributes, "id">;
  
  export class ClubMembershipSubscription
    extends Model<ClubMembershipSubscriptionAttributes, ClubMembershipSubscriptionCreationAttributes>
    implements ClubMembershipSubscriptionAttributes
  {
    dateOflastPayment!: Date;
    public id!: number;
    public fanId!: ForeignKey<Fan["id"]>;
    public isMax!: boolean | null;
    fan?: NonAttribute<Fan>;
    membershipId!:ForeignKey<['id']>
    public readonly createdAt!: Date;
      status!:  "Active"| "Pending"| "Expired"|"Unpaid"
    public readonly updatedAt!: Date;
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

      status: {
        type: DataTypes.ENUM( "Active", "Pending", "Expired"),
        allowNull: false,
      },
      isMax: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    
      dateOflastPayment: {
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
  
  
  export default ClubMembershipSubscription;
  