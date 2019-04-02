const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-guide", "root", "nodejsguide", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;
