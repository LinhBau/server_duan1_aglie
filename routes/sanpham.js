var express = require("express");
var router = express.Router();
var spCT = require("../controllers/sanpham.controller");
var checkLogin = require("../middlewares/check_login");

router.get("/", checkLogin.isLogin, spCT.getListSanPham);
router.post("/", spCT.getListSanPham);

router.get("/chitiet/:id", spCT.chiTietSanPham);

router.get("/addpro", spCT.add);
router.post("/addpro", spCT.add);

router.get("/upPro/:id", spCT.upSanPham);
router.post("/upPro/:id", spCT.upSanPham);

router.delete("/:id", spCT.delSanPham)

module.exports = router;