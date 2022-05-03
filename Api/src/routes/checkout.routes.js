const express = require("express");
const router = express.Router();

const { checkout } = require("../controllers/checkout.controllers")

router.get("/", checkout);

module.exports = router;