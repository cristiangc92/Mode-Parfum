const infoDb = require('../services/infoDB.service')

const getFamily = async(req,res) => {
    try{ 
        const { name } = req.query
        const allProduct = await infoDb.productsDbInfo() 
        let filtFamily = allProduct.filter(e=> e.family.dataValues.name.toLowerCase() === name.toLowerCase()) 
        res.json(filtFamily)
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    getFamily
}