var db = require("../config/db");
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async createUser() {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDay();
    let created_at = `${year}/${month}/${day}`;

    let sql = `
            insert into user(username, password, created_at)
            values(
                '${this.username}',
                '${this.password}',
                '${created_at}'
            )
        `;

    return await db.execute(sql);
  }

  static signIn(username, password) {
    let sql = `select * from user where username = '${username}' and password = '${password}'`;
    return db.execute(sql);
  }

  static getAllUser() {
    let sql = "select * from user";
    return db.execute(sql);
  }

  static updateUser(id, username, password) {
    var sql = `update user set username = '${username}', password = '${password} 'where id = ${id}`;
    return db.execute(sql);
  }

  static deleteUser(id) {
    var sql = `delete from user where id = ${id}`;
    return db.execute(sql);
  }
}

module.exports = User;
