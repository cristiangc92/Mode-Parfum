const express = require("express");
const router = express.Router();

const { deleteProduct } = require("../controllers/deleteProduct.controllers")

router.post("/", deleteProduct);

module.exports = router;