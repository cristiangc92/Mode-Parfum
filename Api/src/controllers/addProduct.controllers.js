const { Products , Brand , Family , Notes } = require("../db")
const addProduct = async(req, res) => { 
    const { name, type, genre, img, idBrand, idFamily, price, stock, available , notes } = req.body;

    const idMarca = await Brand.findOne({where:{ id: idBrand }})
    const idFamilia = await Family.findOne({where:{ id: idFamily }})
    // console.log(idMarca.id)
    // console.log(idFamilia.id)
  
    if(idMarca.id && idFamilia.id){ 
      const newProduct = await Products.findOrCreate({ 
        where: { 
          name, 
          type, 
          genre, 
          img, 
          idBrand: idMarca.id, 
          idFamily: idFamilia.id, 
          price, 
          stock, 
          available
        }
      })  
      const allNotes = await Notes.findAll({ 
        where: { 
          name: notes
        }
      })
    
      console.log(allNotes)  
      console.log(newProduct)
      await newProduct[0].addNotes(allNotes) 
      res.send(newProduct)
    }
} 

module.exports = { 
    addProduct
}