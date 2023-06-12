var SanPham = require("../../models/sanpham.model");

exports.getAll = async (req, res, next) => {
    try {
        var id = req.params.id;
        let [list] = await SanPham.getSanPhamById(id);
        if(list != null){
            res.status(201).json({list});
        }else{
            res.status(400).json({
                msg: "Danh sách sản phẩm trống"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

exports.getNewSanPham = async (req, res, next) => {
    try {
        let [list] = await SanPham.getSanPhamMoiNhat();
        if(list != null){
            res.status(201).json({list});
        }else{
            res.status(400).json({
                msg: "Danh sách sản phẩm trống"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}