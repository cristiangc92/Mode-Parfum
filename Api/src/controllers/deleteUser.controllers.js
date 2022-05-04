const { Users } = require("../db")

const deleteUser = async(req , res) => {
    const { id } = req.body
    const oneUser = await Users.findByPk(id)
    if(oneUser){
        await Users.destroy({where: { id}})
        return res.json({ succes: "Usuario eliminado correctamente"})
    }
}

module.exports = { 
    deleteUser
}