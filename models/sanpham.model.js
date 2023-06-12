var db = require("../config/db");
class SanPham {
  constructor(tensanpham, giasanpham, diachi, mota, hinhanh, idloaisanpham) {
    this.tensanpham = tensanpham;
    this.giasanpham = giasanpham;
    this.diachi = diachi;
    this.mota = mota;
    this.hinhanh = hinhanh;
    this.idloaisanpham = idloaisanpham;
  }

  async createSanPham() {
    var sql = `
        insert into sanpham(tensanpham, giasanpham, diachi, mota, hinhanh, idloaisanpham)
        values(
            '${this.tensanpham}',
            '${this.giasanpham}',
            '${this.diachi}',
            '${this.mota}',
            '${this.hinhanh}',
            '${this.idloaisanpham}'
        )
    `;
    var [newPro] = await db.execute(sql);
    return newPro;
  }

  static getAllSanPham(idLoaiSp) {
    var sql = `select sanpham.id, tensanpham, giasanpham, diachi, mota, sanpham.hinhanh, loaisanpham.tenloaisanpham
         from sanpham inner join loaisanpham on sanpham.idloaisanpham = loaisanpham.id`;
    if (idLoaiSp) {
      sql += ` where idloaisanpham = ${idLoaiSp}`;
    }
    return db.execute(sql);
  }

  //Lấy sản phẩm theo id loại sản phẩm
  static getSanPhamById(id) {
    var sql = `select * from sanpham where idloaisanpham = ${id}`;
    return db.execute(sql);
  }

  //Lấy sản phẩm theo id của sản phẩm
  static getChiTietSanPham(id) {
    var sql = `select sanpham.id, idloaisanpham, tensanpham, giasanpham, diachi, mota, sanpham.hinhanh, loaisanpham.tenloaisanpham
         from sanpham inner join loaisanpham on sanpham.idloaisanpham = loaisanpham.id where sanpham.id = ${id}`;
    return db.execute(sql);
  }

  static getSanPhamMoiNhat() {
    var sql = `select * from sanpham order by id desc limit 6`;
    return db.execute(sql);
  }

  // static  updateSanPham(id) {
  //   var sql = `update sanpham 
  //   set tensanpham = ${this.tensanpham}, giasanpham = ${this.giasanpham}, diachi = ${this.diachi}, 
  //   mota = ${this.mota}, hinhanh = ${this.hinhanh}, idloaisanpham = ${this.idloaisanpham}`;
  //   return db.execute(sql);
  // }

  static deleteSanPham(id) {
    var sql = `delete from sanpham where id = ${id}`;
    return db.execute(sql);
  }

  //Cách khác
  // static async addProduct(product) {
  //   try {
  //     const sql = `insert into sanpham(tensanpham, giasanpham, diachi, mota, hinhanh, idloaisanpham)
  //           values(?,?,?,?,?,?)`
  //     const [result, _] = await db.execute(sql, [product.tensanpham, product.giasanpham, product.diachi, product.mota, product.hinhanh, product.idloaisanpham]);
  //     return result.insertId;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }
}

module.exports = SanPham;
