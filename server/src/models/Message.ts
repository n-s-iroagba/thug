import {
  DataTypes,
  ForeignKey,
  Model,
  Optional,
  NonAttribute,
} from "sequelize";
import sequelize from "../config/orm";

import { Celebrity } from "./Celebrity";
import { Fan } from "./Fan";


interface MessageAttributes {
  id: number;
  fanId:ForeignKey<Fan['id']>
  celebrityId:ForeignKey<Celebrity['id']>
    
    fan?:NonAttribute<Fan>
    celebrity?:NonAttribute<Celebrity>
  isSeen: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  content:string
}

export interface MessageCreationAttributes
  extends Optional<
    MessageAttributes,
    "id" | "createdAt" | "updatedAt"
  > {}

export class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes
{

  declare id: number;
  fanId!:ForeignKey<Fan['id']>
  celebrityId!:ForeignKey<Celebrity['id']>
  fan?:NonAttribute<Fan>
  celebrity?:NonAttribute<Celebrity>
  declare content: string;
  declare isSeen: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;


}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },


    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    isSeen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
   
    celebrityId: {
      type: DataTypes.INTEGER,
    },
    fanId: {
      type: DataTypes.INTEGER,
    }
  },
  {
    sequelize,
    tableName: "messages",
    timestamps: true,
  }
);


Fan.hasMany(Message, { foreignKey: "fanId", as: "messages" });

// Message.belongsTo(Celebrity, { foreignKey: "celebrityId", as: "fan" });
Celebrity.hasMany(Message, { foreignKey: "celebrityId", as: "receivedMessages" });
export default Message;
