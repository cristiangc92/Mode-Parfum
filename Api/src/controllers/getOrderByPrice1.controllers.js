const infoDb = require("../services/infoDB.service");
//creamos la logica de la ruta, en este caso mandamos el json

const getOrderByPrice1 = async (req, res) => {
  try {
    const { ordenamiento } = req.params;
    const productsOrder = await infoDb.productsDbInfo();
    const sortedASC =
      ordenamiento === "ASC"
        ? productsOrder.sort(function (a, b) {
            if (a.price[0][1] > b.price[0][1]) {
              return 1;
            }
            if (b.price[0][1] > a.price[0][1]) {
              return -1;
            }
            return 0;
          })
        : productsOrder.sort(function (a, b) {
            if (a.price[0][1] < b.price[0][1]) {
              return 1;
            }
            if (b.price[0][1] < a.price[0][1]) {
              return -1;
            }
            return 0;
          });
    res.json(sortedASC);
  } catch (e) {
    console.log(e);
  }
};

// const getOrderByPrice = async (req, res) => {
//   try {
//     const { ordenamiento } = req.params;
//     const precioOrdenado = await Products.findAll({
//       order: [["price", ordenamiento]],
//     });
//     if (precioOrdenado.length) {
//       res.status(200).json(precioOrdenado);
//     } else {
//       res
//         .status(404)
//         .send({ message: "Hubo un error al obtener los productos" });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

module.exports = {
  getOrderByPrice1,
};
