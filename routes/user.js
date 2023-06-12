var express = require("express");
var router = express.Router();
var userCT = require("../controllers/user.controller");
var check_login = require("../middlewares/check_login");

router.get("/", check_login.isLogin, userCT.getListUser);
router.post("/", userCT.getListUser);

router.get("/login", userCT.loginScreen);
router.post("/login", userCT.login);

router.get("/register", userCT.registerScreen);
router.post("/register", userCT.register);

router.get("/logout", userCT.logoutScreen);

router.get("/:id", userCT.deleteUser);

module.exports = router;