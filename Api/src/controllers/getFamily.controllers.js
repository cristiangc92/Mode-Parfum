const infoDb = require('../services/infoDB.service')
const { Family } = require("../db");
const getFamily = async(req,res) => {
    try{
        const allProduct = await Family.findAll()  
        res.json(allProduct)
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    getFamily
}