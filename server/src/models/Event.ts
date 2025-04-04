// models/Event.ts

import {
  Optional,
  Model,
  NonAttribute,
  ForeignKey,
  DataTypes,
} from "sequelize";
import sequelize from "../config/orm";
import { Celebrity } from "./Celebrity";
import { Fan } from "./Fan";

// Attributes
export interface EventAttributes {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
  amount: number | null;
  amountPaid: number | null;
  status: "Active" | "Pending" | "Expired" | "Unpaid";
  celebrityId: ForeignKey<Celebrity["id"]>;
  fanId: ForeignKey<Fan["id"]>;
  celebrity?: NonAttribute<Celebrity>;
  fan?: NonAttribute<Fan>;
}

export type EventCreationAttributes = Optional<EventAttributes, "id" | "amount" | "amountPaid" | "celebrity" | "fan">;

export class Event
  extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes
{
  public id!: number;
  public title!: string;
  public startDate!: Date;
  public endDate!: Date;
  public location!: string;
  public description!: string;
  public amount!: number | null;
  public amountPaid!: number | null;
  public status!: "Active" | "Pending" | "Expired" | "Unpaid";
  public celebrityId!: ForeignKey<Celebrity["id"]>;
  public fanId!: ForeignKey<Fan["id"]>;

  public celebrity?: NonAttribute<Celebrity>;
  public fan?: NonAttribute<Fan>;

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
        len: [3, 100],
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterStartDate(value: Date) {
          // @ts-ignore
          if (this.startDate && value <= this.startDate) {
            throw new Error("End date must be after start date");
          }
        },
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 2000],
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    amountPaid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Active", "Pending", "Expired", "Unpaid"),
      allowNull: false,
      defaultValue: "Pending",
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Celebrity,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    fanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Fan,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "events",
    timestamps: true,
    underscored: true,
  }
);

// Associations


export default Event;
