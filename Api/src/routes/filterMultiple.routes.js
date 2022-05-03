const express = require("express");
const router = express.Router();

const { filterMultiple } = require("../controllers/filterMultiple.controllers")

router.get("/", filterMultiple);

module.exports = router;