import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export class Wallet extends Model<InferAttributes<Wallet>, InferCreationAttributes<Wallet>> {
    declare id: CreationOptional<number>
      declare currency: string;
      declare address:string;
    }