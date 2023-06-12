var db = require("../config/db");

class LoaiSanPham{
    constructor(tenloaisanpham){
        this.tenloaisanpham = tenloaisanpham;
    }

    static getAll(){
        var sql = "select * from loaisanpham";
        return db.execute(sql);
    }
}

module.exports = LoaiSanPham;