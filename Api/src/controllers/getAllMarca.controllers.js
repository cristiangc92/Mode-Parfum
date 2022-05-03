const { Brand } = require("../db");

const getAllMarca = async (req, res) => {
  try {
    const marcas = await Brand.findAll()
    return res.json(marcas);
  } catch (error) {
    console.log(error);
  }
}; 

module.exports = { 
    getAllMarca
} 