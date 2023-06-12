var db = require("../config/db");
class DonHang{
    constructor(tennguoidung, sodienthoai, diachinhan, thucdon, tongtien, thanhtoan, ngaydatmua, trangthai){
        this.tennguoidung = tennguoidung;
        this.sodienthoai = sodienthoai;
        this.diachinhan = diachinhan;
        this.thucdon = thucdon;
        this.tongtien = tongtien;
        this.thanhtoan = thanhtoan;
        this.ngaydatmua = ngaydatmua;
        this.trangthai = trangthai;
    }

    async createDonHang(){
        let sql = `
            insert into donhang(tennguoidung, sodienthoai, diachinhan, thucdon, tongtien, thanhtoan, ngaydatmua, trangthai)
            values(
                '${this.tennguoidung}',
                '${this.sodienthoai}',
                '${this.diachinhan}',
                '${this.thucdon}',
                '${this.tongtien}',
                '${this.thanhtoan}',
                '${this.ngaydatmua}',
                '${this.trangthai}'
            )
        `

        return await db.execute(sql);
    }

    static getAllDonHang(){
        let sql = `select * from donhang`;
        return db.execute(sql);
    }

    static getDonHangByUsername(username){
        let sql = `select * from donhang where tennguoidung = '${username}' `;
        return db.execute(sql);
    }

    static updateDonHang(oldname, newname){
        let sql = `update donhang set tennguoidung = '${newname}' where tennguoidung = '${oldname}'`;
        return db.execute(sql);
    }

}

module.exports = DonHang;