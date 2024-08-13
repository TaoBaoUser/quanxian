const mysql = require("mysql2");
const config = require("./config");

const pool = mysql.createPool(config);
const query = async (sql) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject("数据库连接错误");
      } else {
        connection.query(sql, (error, data) => {
          if (error) {
            reject("数据库查询错误");
          } else {
            resolve(data);
          }
        });
        connection.release();
      }
    });
  });
};

module.exports = query;
