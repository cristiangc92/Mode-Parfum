const { Users, Products} = require("../db");
const jwt = require("jsonwebtoken");

const favouritesUserId = async(req , res) => { 
    try {
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
        const userId = await Users.findOne({
          where: {
            id: id,
          },
        });
    
        const products = await userId.dataValues.favourites.map(async (e) => {
          return await Products.findAll({ where: { id: e } });
        });
        const allProducts = await Promise.all(products);
        const favProducts = allProducts.map((e) => e.map((e) => e.dataValues));
        res.json(favProducts);
      } catch (err) {
        console.log(err);
      }
} 

module.exports = { 
    favouritesUserId
}