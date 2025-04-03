// models/Event.ts
import { Optional, Model, NonAttribute, ForeignKey, DataTypes, BelongsToGetAssociationMixin } from "sequelize";
import sequelize from "../config/orm"; 
import { Celebrity } from "./Celebrity";
import { Fan } from "./Fan";

export interface EventAttributes {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
  amount:number|null;
  amountPaid:number|null
  status:  "Active"| "Pending"| "Expired"|"Unpaid"
  celebrityId:ForeignKey<Celebrity['id']>
  celebrity?: NonAttribute<Celebrity>;
  fanId:NonAttribute<Fan['id']>
}

//PAYMENTS
export type EventCreationAttributes = Optional<EventAttributes, "id">;

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public id!: number;
  public title!: string;
  public startDate!: Date;
  public endDate!: Date;
  public location!: string;
  public description!: string;
  public amount:number|null = null;
  public amountPaid:number|null = null;
  public celebrityId!:ForeignKey<Celebrity['id']>
  public fanId!:ForeignKey<Fan['id']>
    status!:  "Active"| "Pending"| "Expired"|"Unpaid"
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100]
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterStartDate(value: Date) {
          if (this.startDate && value <= this.startDate) {
            throw new Error('End date must be after start date');
          }
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 2000]
      }
    },

    fanId: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    amountPaid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM(  "Active","Pending", "Expired"),
    }
  },
  {
    sequelize,
    tableName: "events",
    timestamps: true,
  }
);