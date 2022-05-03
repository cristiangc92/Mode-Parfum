const infoDb = require('../services/infoDB.service')
//creamos la logica de la ruta, en este caso mandamos el json
const getNotes = async(req,res) => {
    try{ 
        res.json(await infoDb.notesDbInfo())
    }catch(e){
        console.log(e)
    }
}
//exportamos la funcion para usarla en routes.
module.exports = {
    getNotes
}