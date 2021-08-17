"use strict";
require("dotenv").config();
const userModel = require("./users");
const { Sequelize, DataTypes } = require("sequelize");
const foodModel = require("./food/model");
const clothesModel = require("./clothes/model");
const dataCollection = require("./data-collection");

// let sequelizeOptions={
//   dialectOptions:{
//     ssl:{
//       require:true,
//       rejectUnauthorized:false
//     }
//   }
// };
const DATABASE_URL =
  process.env.NODE_ENV == "test"
    ? "sqlite:memory"
    : 'postgresql://osama:0000@localhost:5432/lab8';

const sequelize = new Sequelize(DATABASE_URL,{});
const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  food: new dataCollection(food),
  clothes: new dataCollection(clothes),
};