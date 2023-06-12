var express = require('express');
var router = express.Router();
var homeCT = require("../controllers/home.contrller");

router.get("/", homeCT.home);

module.exports = router;