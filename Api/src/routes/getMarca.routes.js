const express = require("express");
const router = express.Router();
//requerimos getProducts de controllers
const { filterByMarca } = require("../controllers/getMarca.controllers");
//se lo mandamos como mildware
router.get("/:marca", filterByMarca);

module.exports = router;