const express = require("express");
const router = express.Router();

const { favouritesUserId } = require("../controllers/favouritesId.controllers")

router.post("/", favouritesUserId);

module.exports = router;