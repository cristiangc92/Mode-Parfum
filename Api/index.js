//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Esto es un budda
// Esto es un comentario sobre budda
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const service = require("./src/services/createDB.service"); 
const { Users } = require("./src/db") 
const bcrypt = require("bcrypt"); 
const saltRounds = 10;
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    service.infoDb(); 
    console.log("%s listening at 3001"); // eslint-disable-line no-console 
    process.env.NODE_ENV === "production"
      ? (url = process.env.BASE_URL)
      : (url = "http://localhost:3001");

    //USUARIO ADMIN   
 
    bcrypt.hash(process.env.PASSWORD , saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
      } 
        await Users.findOrCreate({
          where: { 
            id: 100,
            username: process.env.USER_ADMIN,
            password: hash,
            favourites: [], 
            isAdmin: true, 
            payment: 0,
          },

        });
    }); 

    //USUARIOS COMPRADOS
  });
});
