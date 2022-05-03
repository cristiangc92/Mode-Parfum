const jwt = require("jsonwebtoken");
const { Users } = require("../db");
const deleteProduct = async(req , res) => { 
    try {
        const { idProduct } = req.body;
        const authorization = req.get("authorization");
    
        let token = "";
        if (authorization && authorization.toLowerCase().startsWith("bearer")) {
          token = authorization.substring(7);
        }
    
        let decodedToken = {};
        try {
          decodedToken = jwt.verify(token, process.env.SECRET);
        } catch (e) {
          console.log(e);
        }
    
        if (!token || !decodedToken.id) {
          return res.status(401).json({ error: "token missing or invalid" });
        }
        let { id } = decodedToken;
        const userId = await Users.findAll({
          where: {
            id: id,
          },
        });
        let arr = userId.map((e) => e.toJSON());
        arr[0].favourites = arr[0].favourites.filter((e) => e !== idProduct);
        // console.log(arr[0].favourites);
        await Users.update(
          {
            favourites: arr[0].favourites,
          },
          { where: { id: id } }
        );
        res.send("Favorito eliminado");
      } catch (error) {
        res.send(error);
      }
} 

module.exports = { 
    deleteProduct
}