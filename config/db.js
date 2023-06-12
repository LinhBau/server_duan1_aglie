require("dotenv").config();
var mysql2 = require("mysql2");
var connect = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWD
})

connect.connect((err) => {
    if(err) throw err;
    console.log("Connected to MySql database");
})

module.exports = connect.promise();