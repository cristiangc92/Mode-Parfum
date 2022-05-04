const express = require("express");
const router = express.Router();

const { deleteUser } = require("../controllers/deleteUser.controllers")

router.delete("/", deleteUser);

module.exports = router;