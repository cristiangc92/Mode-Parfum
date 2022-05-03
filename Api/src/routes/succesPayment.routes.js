const express = require("express");
const router = express.Router();
//requerimos getProducts de controllers
const { successPayment } = require("../controllers/successPayment.controllers")
//se lo mandamos como mildware
router.get("/", successPayment);

module.exports = router; 