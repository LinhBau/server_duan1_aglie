var SanPham = require("../models/sanpham.model");
var LoaiSanPham = require("../models/loaisanpham.model");
var db = require("../config/db");

exports.getListSanPham = async (req, res, next) => {
  try {
    var dk = null;
    if (typeof req.body.findsp != "undefined") {
      dk = req.body.findsp;
    }
    var [list] = await SanPham.getAllSanPham(dk);
    var [listLsp] = await LoaiSanPham.getAll();
  } catch (error) {
    console.log(error);
  }
  res.render("sanpham/list", { dulieu: list, dulieuTL: listLsp });
};

exports.chiTietSanPham = async (req, res, next) => {
  try {
    var id = req.params.id;
    var [list, _] = await SanPham.getChiTietSanPham(id);
    console.log();
    console.log(list);
  } catch (error) {
    console.log(error);
  }
  res.render("sanpham/chitiet", { list: list });
};

exports.add = async (req, res, next) => {
  var [listLsp] = await LoaiSanPham.getAll();
  if (req.method == "POST") {
    // const { tensanpham, giasanpham, diachi, mota, hinhanh, idloaisanpham } = req.body;
    // const sql = `insert into sanpham(tensanpham, giasanpham, diachi, mota, hinhanh, idloaisanpham)
    // values (?,?,?,?,?,?)`;
    // const values = [tensanpham, giasanpham, diachi, mota, hinhanh, idloaisanpham];
    // db.query(sql, values, (err, results) => {
    //   if(err) throw err;
    //   console.log(`Added new product: %{tensanpham}`);
    //   res.send("Add Success");
    // })
    var { tensanpham, giasanpham, diachi, mota, hinhanh, idloaisanpham } =
      req.body;
    var obj = new SanPham(
      tensanpham,
      giasanpham,
      diachi,
      mota,
      hinhanh,
      idloaisanpham
    );

    try {
      await obj.createSanPham();
      // res.redirect("/sp");
    } catch (error) {
      console.log(error);
    }
  }
  res.render("sanpham/add", { dulieuTL: listLsp });
};

exports.upSanPham = async (req, res, next) => {
  var id = req.params.id;
  var [list] = await SanPham.getChiTietSanPham(id);
  var [listLsp] = await LoaiSanPham.getAll();
  if (req.method == "POST") {
    var { tensanpham, giasanpham, diachi, mota, hinhanh, idloaisanpham } = req.body;
    var sql = `update sanpham set tensanpham = ?, giasanpham = ?, diachi = ?, mota = ?, hinhanh = ?, idloaisanpham = ? where id = ${id}`;
    var values = [tensanpham, giasanpham, diachi, mota, hinhanh, idloaisanpham];
    db.query(sql, values, (err, results) => {
      if(err) throw err;
      console.log("Update success");
    })

    res.redirect("/sp");
  }
  res.render("sanpham/update", { list: list, dulieuTL: listLsp });
};

exports.delSanPham = async (req, res, next) => {
  // var id = req.params.id;
  // db.query('delete from sanpham where id = ?', [id], function(error, result, fields){
  //   if(error) throw error;
  //   console.log('Sản phẩm đã được xóa thành công');
  // })
  try {
    var id = req.params.id;
    await SanPham.deleteSanPham(id);
    res.send("Delete success");
  } catch (error) {
    console.log(error);
  }
};
