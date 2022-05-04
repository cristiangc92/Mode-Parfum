const express = require("express");
const router = express.Router();

const { userToAdmin } = require("../controllers/userToAdmin.controllers")

router.post("/", userToAdmin);

module.exports = router;
