var express = require("express");
var router = express.Router();
var donHangCT = require("../../controllers/client/donhang.controller");

router.route("/").get(donHangCT.getAll);
router.route("/:name").get(donHangCT.getDonHangByUsername);

router.post("/add", donHangCT.createDonHang);
router.post("/up/", donHangCT.updateDonHang);


module.exports = router;