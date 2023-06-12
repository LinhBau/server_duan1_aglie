var express = require("express");
var router = express.Router();
var donHangCT = require("../controllers/donhang.controller");
var checkLogin = require("../middlewares/check_login");


router.get("/", checkLogin.isLogin, donHangCT.getListDonHang);
router.post("/", donHangCT.getListDonHang);

// router.get("/add", theLoaiCT.addTL);
// router.post("/add", theLoaiCT.addTL);

// router.get("/up/:id", theLoaiCT.upTL);
// router.post("/up/:id", theLoaiCT.upTL);

// router.delete("/:id", theLoaiCT.delTL);

module.exports = router;