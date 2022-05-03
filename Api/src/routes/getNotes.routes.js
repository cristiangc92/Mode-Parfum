const express = require("express");
const router = express.Router();
//requerimos getProducts de controllers
const { getNotes } = require("../controllers/getNotes.controllers");
//se lo mandamos como mildware
router.get("/", getNotes);

module.exports = router;