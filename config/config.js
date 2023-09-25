require('dotenv').config(); // this is important!
module.exports = {
  "development": {
    "username": process.env.SQLUser,
    "password": process.env.SQLPwd,
    "database": process.env.SQLDB,
    "host": process.env.SQLHost,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.SQLUser,
    "password": process.env.SQLPwd,
    "database": process.env.SQLDB,
    "host": process.env.SQLHost,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.SQLUser,
    "password": process.env.SQLPwd,
    "database": process.env.SQLDB,
    "host": process.env.SQLHost,
    "dialect": "mysql"
  }
}