const { Brand, Products, Notes, Family } = require("../db");
const filterByMarca = async (req, res) => {
  const { marca } = req.params;
  try {
    const productosFiltrados = await Products.findAll({
      include: [
        {
          model: Brand,
          where: {
            "name": marca
          }
        },
        {
          model: Notes,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Family,
          attributes: ["name"],
        },
      ]
    })
    return res.json(productosFiltrados);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { filterByMarca };
