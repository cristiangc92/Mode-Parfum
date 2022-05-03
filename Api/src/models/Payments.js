const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("payments", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.STRING,
    },
    money: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.STRING,
    },
    expiration_month: {
      type: DataTypes.INTEGER,
    },
    expiration_year: {
      type: DataTypes.INTEGER,
    },
    first_six_digits: {
      type: DataTypes.STRING,
    },
    last_four_digits: {
      type: DataTypes.STRING,
    },
    shipping: {
      type: DataTypes.INTEGER,
    },
    installments: {
      type: DataTypes.INTEGER,
    },
    operation_type: {
      type: DataTypes.STRING,
    },
    card_name: {
      type: DataTypes.STRING,
    },
    card_type: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    status_detail: {
      type: DataTypes.STRING,
    },
    transaction_amount: {
      type: DataTypes.FLOAT,
    },
    installment_amount: {
      type: DataTypes.FLOAT,
    },
    net_received_amount: {
      type: DataTypes.FLOAT,
    },
    total_paid_amount: {
      type: DataTypes.FLOAT,
    },

    /* date: {
        type: DataTypes.STRING,
      } */
  });
};
