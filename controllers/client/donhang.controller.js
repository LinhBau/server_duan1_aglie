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
    let [list] = await DonHang.getDonHangByUsername(name);
    if (list != null) {
        return res.status(201).json({list});
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
    if (data != null) {
        returnres.status(200).json({
        msg: "Thêm đơn hàng thành công",
      });
    } else{
        return res.status(500).json({
            msg: "Không thể thêm đơn hàng"
        })
    }
     
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
