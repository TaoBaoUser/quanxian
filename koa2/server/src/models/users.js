const query = require("../util/mysql");

exports.findAllUser = async (name, password) => {
  let sql = `select * from users where name = ${name} and password = ${password}`;
  return query(sql);
};

exports.findRole = async (uid) => {
  let sql = `select * from user_role where uid = ${uid}`;
  return query(sql);
};

exports.findRoleName = async (uid) => {
  let sql = `SELECT r.name FROM user_role ur right JOIN roles r ON ur.rid = r.id WHERE ur.uid = ${uid}`;
  return query(sql);
};

exports.findMenu = async (rid) => {
  console.log(rid);
  let sql = `SELECT * FROM role_menu as r right JOIN menus as m ON r.mid = m.id  WHERE r.mid = m.id AND r.rid = ${rid}`;
  return query(sql);
};

exports.findMenuChlid = async (mid) => {
  let sql = `SELECT m2.* FROM menus m1 right JOIN menus m2 ON m1.id = m2.pid WHERE m1.id = m2.pid AND m2.pid = ${mid}`;
  return query(sql);
};

exports.adduser = async (username, password) => {
  let sql = `insert into users(name, password) value(${username}, ${password})`;
  return query(sql);
};

exports.findUserRole = async (username) => {
  let sql = `SELECT r.name AS role_name FROM users u RIGHT JOIN user_role ur ON u.id = ur.uid RIGHT JOIN roles r ON ur.rid = r.id WHERE u.name = ${username};`;
  return query(sql);
};

exports