const { Users } = require("../db");
const jwt = require("jsonwebtoken"); 
const favouritesUser = async(req, res) => { 
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
        // console.log(id);
        const userId = await Users.findAll({
          where: {
            id: id,
          },
        });
        let arr = userId.map((e) => e.toJSON());
        arr[0].favourites.push(idProduct);
        function filterArray(favourites) {
          var found = {};
          var out = favourites.filter(function (element) {
            return found.hasOwnProperty(element) ? false : (found[element] = true);
          });
          return out;
        }
        await Users.update(
          {
            favourites: filterArray(arr[0].favourites),
          },
          { where: { id: id } }
        );
        res.send(userId);
      } catch (err) {
        console.log(err);
      }
}


module.exports = { 
    favouritesUser
}