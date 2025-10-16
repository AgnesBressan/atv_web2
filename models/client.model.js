import {Model, DataTypes } from "sequelize"
import sequelize from "./dbconfig.js"

class Client extends Model {}

Client.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  document: { type: DataTypes.STRING, allowNull: false }
}, {sequelize: sequelize, timestamps: false })

export default Client