const express = require("express");
const router = express.Router();

const { favouritesUser } = require("../controllers/favouritesUser.controllers")

router.post("/", favouritesUser);

module.exports = router;