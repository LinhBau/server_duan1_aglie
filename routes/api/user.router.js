var express = require("express");
var router = express.Router();
var userCT = require("../../controllers/client/user.controller");

router.route("/").get(userCT.getAllUser);
router.route("/signin").post(userCT.signIn);
router.route("/signup").post(userCT.signUp);
router.route("/:id").post(userCT.updateUser);
router.route("/:id").delete(userCT.deleteUser);

module.exports = router;