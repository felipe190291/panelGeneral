const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.js");
const Product = require("./product.jsx");
const Customer = require("./customers.jsx");

const Order = sequelize.define("Order", {
  order_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  order_status: {
    type: DataTypes.ENUM("pending", "on_route", "delivered", "cancelled"),
    allowNull: false,
  },
  order_paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  shipping_rule: {
    type: DataTypes.ENUM("home_delivery", "pickup_point"),
    allowNull: false,
  },
  observations: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
const OrderProduct = sequelize.define("OrderProduct", {
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Orders", // Nombre de la tabla de destino
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: "products", // Nombre de la tabla de destino
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});
Order.belongsToMany(Product, { foreignKey: "orderId", through: OrderProduct });
Product.belongsToMany(Order, {
  foreignKey: "productId",
  through: OrderProduct,
});
Customer.hasMany(Order, { foreignKey: "client_id" });
Order.belongsTo(Customer, { foreignKey: "client_id" });

module.exports = { Order, OrderProduct };
