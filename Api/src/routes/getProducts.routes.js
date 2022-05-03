const express = require("express");
const router = express.Router();
//requerimos getProducts de controllers
const { getProducts } = require("../controllers/getProducts.controllers");
//se lo mandamos como mildware
router.get("/", getProducts); 

module.exports = router;
