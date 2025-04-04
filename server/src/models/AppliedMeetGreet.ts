import { DataTypes, ForeignKey, Model, NonAttribute, Optional } from "sequelize";
import sequelize from "../config/orm";
import { Payment } from "./Payment"; // Assuming you have a Payment model
import { Fan } from "./Fan";
import { Celebrity } from "./Celebrity";

export type AppliedMeetGreetAttributes = {
  id: number;
  fanId: ForeignKey<Fan['id']>;
  celebrityId: ForeignKey<Celebrity['id']>;
  payments?: NonAttribute< Payment[]>;
  date: Date | null;
  durationInDays: number;
  price: string;
    status:  "Active"| "Pending"| "Expired"|"Unpaid"
};

export type AppliedMeetGreetCreationAttributes = Optional<AppliedMeetGreetAttributes, "id" | "payments" >;

export class AppliedMeetGreet
  extends Model<AppliedMeetGreetAttributes, AppliedMeetGreetCreationAttributes>
  implements AppliedMeetGreetAttributes
{
  celebrityId!:ForeignKey<Celebrity['id']>;
  public id!: number;
  public fanId!: ForeignKey<Fan['id']>;
  public payments?:NonAttribute< Payment[]> ;
  public date!: Date | null;
  public durationInDays!: number;
  public price!: string;
  status!:  "Active"| "Pending"| "Expired"|"Unpaid"
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AppliedMeetGreet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "jobs", key: "id" },
      onDelete: "CASCADE",
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    durationInDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(  "Active","Pending", "Expired"),
    },
    celebrityId:{
      type: DataTypes.INTEGER,
    }
  },
  {
    sequelize,
    tableName: "applied_meet_greets",
    timestamps: true,
    underscored: true,
  }
);

// Define associations
// AppliedMeetGreet.belongsTo(Celebrity, { foreignKey: "celebrityId", as: "celebrity" });
Celebrity.hasMany(AppliedMeetGreet, { foreignKey: "celebrityId", as: "invitedAppliedMeetGreets" });

Fan.hasMany(AppliedMeetGreet, { foreignKey: "fanId", as: "appliedMeetGreets" });

export default AppliedMeetGreet;
