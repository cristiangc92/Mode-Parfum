const express = require("express");
const router = express.Router();

const { allPayments } = require("../controllers/allPayments.controllers")

router.get("/", allPayments);

module.exports = router;