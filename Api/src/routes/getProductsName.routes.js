const express = require("express");
const router = express.Router();
//requerimos getProducts de controllers
const { getProductsName } = require("../controllers/getProductsName.controllers");
//se lo mandamos como mildware
router.get("/", getProductsName);

module.exports = router; 