const express = require("express");
const router = express.Router();

const { checkout } = require("../controllers/checkout.controllers")

router.post("/", checkout);

module.exports = router;