import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../config/db'



class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>
  declare email: string;
  declare password: string
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, 
  }

}, { sequelize, timestamps: true, freezeTableName: true })



export default User