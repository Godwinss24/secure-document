import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../config/db'



class Document extends Model<InferAttributes<Document>, InferCreationAttributes<Document>> {
    declare id: CreationOptional<string>
    declare imageURL: string;
    declare userId: string;
    declare title: string;
    declare description: string;
}

Document.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    imageURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },


}, { sequelize, timestamps: true, freezeTableName: true })



export default Document