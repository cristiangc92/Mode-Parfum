//requerimos la informacion del json
const infoDb = require('../services/infoDB.service')
//creamos la logica de la ruta, en este caso mandamos el json
const getProductsName = async(req,res) => {
    try{  
        const { name } = req.query 
        if(name){  
            const products = await infoDb.productsDbInfo() 
            const productName = products.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
            if(productName.length){ 
                return res.send(productName)
            }else{ 
               return res.send([{error: "No fue encontrado"}])
            }
        }else{ 
            res.state(404).json([])
        }
    }catch(e){
        console.log(e)
    }
}
//exportamos la funcion para usarla en routes.
module.exports = {
    getProductsName
} 