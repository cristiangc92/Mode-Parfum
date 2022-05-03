const { DataTypes, INTEGER } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "products",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // brand: {
      //   type: DataTypes.STRING,
      // },
      type: {
        type: DataTypes.STRING,
      },
      genre: {
        type: DataTypes.STRING,
      },
      // family: {
      //   type: DataTypes.STRING
      // },
      // notes: {
      //   type: DataTypes.STRING
      // },
      // stock: {
      //   type: DataTypes.STRING
      // },
      img: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER)),
      },
      stock: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      available: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
    }
  );
};
