var express = require("express");
var router = express.Router();
var sanPhamCT = require("../../controllers/client/sanpham.controller");

router.route("/spnew").get(sanPhamCT.getNewSanPham);
router.route("/:id").get(sanPhamCT.getAll);

module.exports = router;