require("dotenv").config();

const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");
const sequelize = new Sequelize(
  process.env.BD_NAME,
  process.env.RDS_USERNAME,
  process.env.RDS_PASSWORD,
  {
    host: process.env.RDS_HOSTNAME,
    dialect: "mysql",
    dialectModule: mysql2,
  }
);
sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

module.exports = sequelize;
