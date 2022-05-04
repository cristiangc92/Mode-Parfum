const { Users } = require("../db")

const userToAdmin = async(req , res) => { 
    const { id , admin } = req.body
    const oneUser = await Users.findOne({where: { id }})

    if(oneUser && admin === false){ 
       const updateToAdmin = await oneUser.update( 
            { isAdmin: true },
            { where: { id}}
        )
        return res.json(updateToAdmin)
    }else if(oneUser && admin === true){ 
        const updateToAdmin = await oneUser.update( 
            { isAdmin: false },
            { where: { id}}
        )
        return res.json(updateToAdmin)
    }
    res.json({ error: "Algo salio mal"})
}  

module.exports = { 
    userToAdmin
}