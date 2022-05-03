const express = require("express");
const router = express.Router();

const { getAllMarca} = require("../controllers/getAllMarca.controllers")

router.get("/",  getAllMarca );

module.exports = router; 