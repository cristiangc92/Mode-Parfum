const { Router } = require("express");
const getProducts = require("./getProducts.routes");
const getProductsName = require("./getProductsName.routes");
const getNotes = require("./getNotes.routes");
const getOrderByPrice1 = require("./getOrderByPrice1.routes");
const getOrderByPrice2 = require("./getOrderByPrice2.routes");
const getId = require("./getId.routes");
const getFilterByMarca = require("./getMarca.routes");
const filterMultiple = require("./filterMultiple.routes");
const getFamily = require("./getFamily.routes");
const getAllMarca = require("./getAllMarca.routes"); 
const successPayment = require("./succesPayment.routes") 
const checkout = require("./checkout.routes")
const passwordReset = require("./passwordReset.routes") 
const newPassword = require("./newPassword.routes") 
const registerUser = require("./registerUser.routes") 
const loginUser = require("./loginUser.routes") 
const favouritesUser = require("./favouritesUser.routes") 
const favouritesId = require("./favouritesId.routes") 
const deleteProduct = require("./deleteProduct.routes") 
const allUsers = require("./allUsers.routes") 
const allPayments = require("./allPayments.routes") 
const addProduct = require("./addProduct.routes");
const userExist = require("./userExist.routes");

const router = Router();
//especificamos que ruta va a acceder la informacion de getProducts
router.use("/products", getProducts);
router.use("/product", getProductsName);
router.use("/notes", getNotes);
router.use("/checkout", checkout);
router.use("/orderByPrice1", getOrderByPrice1);
router.use("/orderByPrice2", getOrderByPrice2);
router.use("/filtradoId", getId);
router.use("/marca", getFilterByMarca);
router.use("/filterMultiple", filterMultiple);
router.use("/family", getFamily);
router.use("/marcas", getAllMarca); 
router.use("/success" , successPayment) 
router.use("/passwordReset", passwordReset) 
router.use("/newPassword", newPassword) 
router.use("/register", registerUser) 
router.use("/login" , loginUser) 
router.use("/favourites", favouritesUser) 
router.use("/favouritesId" , favouritesId) 
router.use("/deleteProduct", deleteProduct) 
router.use("/allUsers" , allUsers) 
router.use("/allPayments" , allPayments) 
router.use("/addProduct" , addProduct)
router.use("/oneUser" , userExist)

module.exports = router;

// ******************************************************************************
// USUARIOS TEST:
// VENDEDOR
// {
//     "id": 1103818355,
//     "nickname": "TETE3034221",
//     "password": "qatest8772",
//     "site_status": "active",
//     "email": "test_user_23426925@testuser.com"
// }

// COMPRADOR
// {
//     "id": 1103821005,
//     "nickname": "TEST13H7QYQT",
//     "password": "qatest2339",
//     "site_status": "active",
//     "email": "test_user_36306526@testuser.com"
// }

// ******************************************************************************

// Access Token USUARIO VENDEDOR
// APP_USR-5816583834132762-040916-8d2fb925bd3a46afdff9171639461127-1103818355

// ******************************************************************************