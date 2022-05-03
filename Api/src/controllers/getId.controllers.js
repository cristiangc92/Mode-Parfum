const infoDb = require('../services/infoDB.service')

const getId = async(req,res) => {
    try{
       //res.send("hola")
       
        const {id} = req.params
            if(id){
                let info = await infoDb.productsDbInfo()
                //console.log(info)
                const filtroId = info.filter(el=> el.id==id)
                filtroId.length ?
                res.status(200).json(filtroId):
                res.status(400).send('no se encontró perfume')
                

            }
        
        //res.json(await infoDb.productsDbInfo())
       
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    getId
}