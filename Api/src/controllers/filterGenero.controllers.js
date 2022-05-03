// const { Products, Notes, Family } = require("../db");
// const filterGenero = async (req, res) => {
//     const { filtro } = req.params;
//     try {
//         const filter = await Products.findAll({
//             where: {
//                 genre: filtro
//             },
//             include: [
//                 {
//                     model: Notes,
//                     attributes: ["name"],
//                     through: {
//                         attributes: [],
//                     },
//                 },
//                 {
//                     model: Family,
//                     attributes: ["name"],
//                 },
//             ]
//         })
//         if (filter.length) {
//             return res.json(filter)

//         } else {
//             return res.json([])
//         }
//     } catch (e) {
//         console.log(e)
//     }
// }

// module.exports = {
//     filterGenero
// }