var User = require("../../models/user.model");

exports.getAllUser = async (req, res, next) => {
    try {
        let [user] = await User.getAllUser();
        return res.status(201).json({user});
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

exports.signIn = async (req, res, next) => {
    try {
        let {username, password} = req.body;
        let [obj] = await User.signIn(username, password);
        if(obj.length > 0){
            // console.log(obj.username);
            return res.status(201).json({
                msg: "Đăng nhập thành công", user: obj});
        }else{
            return res.status(400).json({msg: "Thông tin không chính xác"});
        }
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

exports.signUp = async (req, res, next) => {
    try {
        // Xử lý yêu cầu đăng ký người dùng
        let {username, password} = req.body;
        let [listUser, _] = await User.getAllUser();
        let isExit = false;
        listUser.forEach(row => {
          if(username == row.username){
            console.log("Username đã tồn tại");
            isExit = true;
          }
        })
        if(isExit){
            return;
        }
        let objUser = new User(username, password);
        await objUser.createUser();
    
        // Thiết lập tiêu đề HTTP
        res.set('Content-Type', 'application/json');
        return res.status(200).json({
          msg: "Signup user success"
        });
      } catch (error) {
        return res.status(500).json({
          msg: error.message
        });
      }
}

exports.updateUser = async (req, res, next) => {
    try {
        var id = req.params.id;
        var {username, password} = req.body;
        var bau = await User.updateUser(id, username, password);
        if(bau){
            res.status(200).json({
                msg: "Update user success"
            })
        }else{
            res.status(400).json({
                msg: "Can't update user"
            })
        }
    } catch (error) {
        return res.status(500).json({
          msg: error.message
        });
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        //Test Update in github
    } catch (error) {
        console.log(error);
    }
}

