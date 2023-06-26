var DonHang = require("../../models/donhang.model");

exports.getAll = async (req, res, next) => {
  try {
    var [list] = await DonHang.getAllDonHang();
    if (list != null) {
      res.status(201).json({ list });
    } else {
      res.status(400).json({
        msg: "Danh sách đơn hàng không có dữ liệu",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.getDonHangByUsername = async (req, res, next) => {
  try {
    let name = req.params.name;
    if(name == "admin"){
      let [list] = await DonHang.getAllDonHang();
      return res.status(201).json({ list });
    }
    let [list] = await DonHang.getDonHangByUsername(name);
    if (list != null) {
      return res.status(201).json({ list });
    } else {
      return res.status(400).json({
        msg: "Danh sách đơn hàng theo tên khách hàng không có dữ liệu",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.createDonHang = async (req, res, next) => {
  try {
    let {
      tennguoidung,
      sodienthoai,
      diachinhan,
      thucdon,
      tongtien,
      thanhtoan,
      ngaydatmua,
      trangthai,
    } = req.body;

    var obj = new DonHang(
      tennguoidung,
      sodienthoai,
      diachinhan,
      thucdon,
      tongtien,
      thanhtoan,
      ngaydatmua,
      trangthai
    );
    var data = await obj.createDonHang();
    var checkNumber = /^0\d{9}$/;
    if(!checkNumber.test(sodienthoai)){
      return res.status(400).json({
        msg: "Vui lòng nhập đúng số điện thoại"
      })
    }

    if (data != null) {
      return res.status(200).json({
        msg: "Thêm đơn hàng thành công",
      });
    } else {
      return res.status(400).json({
        msg: "Không thể thêm đơn hàng",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.updateDonHang = async (req, res, next) => {
  try {
    var { newName, oldName } = req.body;
    var data = await DonHang.updateDonHang(oldName, newName);
    if (data != null) {
      return res.status(201).json({ msg: "Cập nhật thành công" });
    } else {
      return res.status(400).json({ msg: "Không cập nhật được" });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    var {id, trangthai} = req.body;
    var data = await DonHang.updateStatusDonHang(id, trangthai);
    if (data != null) {
      return res.status(201).json({ msg: "Cập nhật trạng thái đơn hàng thành công" });
    } else {
      return res.status(400).json({ msg: "Không cập nhật được trạng thái đơn hàng" });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
}