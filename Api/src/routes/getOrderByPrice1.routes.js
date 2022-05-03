const express = require("express");
const router = express.Router();
//requerimos getProducts de controllers
const {
  getOrderByPrice1,
} = require("../controllers/getOrderByPrice1.controllers");
//se lo mandamos como mildware
router.get("/:ordenamiento", getOrderByPrice1);

module.exports = router;