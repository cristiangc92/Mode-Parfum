const express = require("express");
const router = express.Router();

const { addProduct } = require("../controllers/addProduct.controllers")

router.post("/", addProduct);

module.exports = router;