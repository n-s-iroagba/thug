import {
  Model,
  DataTypes,
  Optional,
  ForeignKey,
} from "sequelize";
import { User } from "./User";
import sequelize from "../config/orm";

interface AdminAttributes {
  id: number;
  username: string;

  userId: number; 
}

type AdminCreationAttributes = Optional<AdminAttributes, "id">;

export class Admin extends Model<AdminAttributes, AdminCreationAttributes>
  implements AdminAttributes {

  public id!: number;
  public username!: string;
  public userId!: ForeignKey<User['id']>; // Correctly typed as ForeignKey<number>
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Optionally, define associations here
  static associate(models: any) {
    // Define associations, e.g., Admin.belongsTo(models.SuperAdmin);
  }
}


  Admin.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    
    
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, tableName: "admins", timestamps: true }
  );

  
