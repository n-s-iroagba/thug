
import {
    Model,
    DataTypes,
    Optional,
    ForeignKey,
  } from "sequelize";
  import sequelize from "../config/orm";
import { Fan } from "./Fan";
import Charity from "./Charity";
import ClubMembership from "./ClubMembership";
import { Event } from "./Event";
import AppliedMeetGreet from "./AppliedMeetGreet";
  
  export interface PaymentAttributes {
    id: number;
    itemType: "ClubMembership" | "Charity" | "MeetGreet" | "Event";
    amount: number;
    date: Date;
    itemId:ForeignKey<ClubMembership['id']|Charity['id']|AppliedMeetGreet['id']|Event['id']>
    fanId: ForeignKey<Fan['id']>
  }
  
  export type PaymentCreationAttributes = Optional<PaymentAttributes, "id">;
  
  export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes>
    implements PaymentAttributes {
    public id!: number;
    public itemType!:  "ClubMembership" | "Charity" | "MeetGreet" | "Event";
    public amount!: number;
    public date!: Date;
    public fanId!: ForeignKey<Fan['id']>
    public itemId!:ForeignKey<ClubMembership['id']|Charity['id']|AppliedMeetGreet['id']|Event['id']>
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      fanId: {
        type: DataTypes.INTEGER,
        references: {
          model: Fan,
          key: 'id'
        },
      },
      itemType: {
        type: DataTypes.ENUM('ClubMembership', 'Charity', 'MeetGreet', 'Event')
      }
    },
    {
      sequelize,
      tableName: "payments",
    }
  );
  
  export default Payment;
  