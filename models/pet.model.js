import { Model, DataTypes } from "sequelize"
import sequelize from "./dbconfig.js"
import Client from "./client.model.js"

class Pet extends Model {}
Pet.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    breed: { type: DataTypes.STRING },
    birth: { type: DataTypes.STRING },
    photo: { type: DataTypes.STRING },
  },
  { sequelize: sequelize, timestamps: false },
)

Pet.belongsTo(Client)
Client.hasMany(Pet)

export default Pet
