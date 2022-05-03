const express = require("express");
const router = express.Router();
//requerimos getProducts de controllers
const {
  getOrderByPrice2,
} = require("../controllers/getOrderByPrice2.controllers");
//se lo mandamos como mildware
router.get("/:ordenamiento", getOrderByPrice2);

module.exports = router;