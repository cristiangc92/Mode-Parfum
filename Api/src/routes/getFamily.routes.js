const express = require("express");
const router = express.Router();

const { getFamily } = require("../controllers/getFamily.controllers")

router.get("/", getFamily);

module.exports = router;