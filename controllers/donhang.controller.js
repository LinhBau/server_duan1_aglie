var DonHang = require("../models/donhang.model");

exports.getListDonHang = async (req, res, next) => {
    var [list] = await DonHang.getAllDonHang();
    res.render("donhang/list", {list: list})
}