const express = require("express");
const router = express.Router();

const { getId } = require("../controllers/getId.controllers")

router.get("/:id", getId);

module.exports = router;