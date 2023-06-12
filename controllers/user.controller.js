const { config } = require("dotenv");
var User = require("../models/user.model");
exports.getListUser = async (req, res, next) => {
  var [list] = await User.getAllUser();
  res.render("user/list", { list: list });
};

exports.loginScreen = (req, res) => {
  var msg = req.query.error ? req.query.error : null;
  res.render("user/login", { msg: msg });
};

exports.login = async (req, res, next) => {
  var [list] = await User.getAllUser();
  var msg = "";
  let { username, password } = req.body;
  let [obj] = await User.signIn(username, password);
  if (obj.length > 0) {
    // msg = "Đăng nhập thành công";
    req.session.objLogin = obj;
    return res.redirect("/sp");
  } else {
    msg = "Thông tin không chính xác";
    return res.render("user/login", {
      msg: msg,
      username: username,
      password: password,
    });
  }
};

exports.registerScreen = (req, res) => {
  var msg = req.query.error ? req.query.error : null;
  res.render("user/register", { msg: msg });
};

exports.register = async (req, res, next) => {
  var msg = "";
  var { username, passwd, repasswd } = req.body;
  var [listUser, _] = await User.getAllUser();

  if (passwd !== repasswd) {
    msg = "Xác nhận mật khẩu không đúng";
    return res.render("user/register", {
      msg: msg,
      username: username,
      passwd: passwd,
      repasswd: repasswd,
    });
  }

  var isExit = false;
  listUser.forEach((row) => {
    if (username == row.username) {
      console.log("Username đã tồn tại");
      isExit = true;
    }
  });

  if (isExit) {
    msg = "Tên người dùng đã tồn tại, vui lòng nhập tên khác";
    return res.render("user/register", {
      msg: msg,
      username: username,
      passwd: passwd,
      repasswd: repasswd,
    });
  }

  var objUser = new User(username, passwd);
  await objUser.createUser();
  console.log("Create user success");
  msg = "Đăng kí thành công";
  return res.render("user/register", {
    msg: msg,
    username: username,
    passwd: passwd,
    repasswd: repasswd,
  });
};

exports.logoutScreen = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/users/login");
    }
  });
};

exports.deleteUser = async (req, res, next) => {
  var id = req.params.id;
  console.log("Id: " +id);
  try {
    await User.deleteUser(id);
    console.log("Delete success");
    res.redirect("/users");
  } catch (error) {
    console.log(error);
  }
}
