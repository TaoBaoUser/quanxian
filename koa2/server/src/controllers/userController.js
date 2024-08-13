const mysql = require("../models/users");
const sendResponse = require("../util/sendresponse");

const findUser = async (ctx) => {
  try {
    const { name, password } = ctx.request.body;
    if (!name || !password) {
      sendResponse(ctx, 400, "缺少必要的参数");
      return;
    }

    const dataRes = await mysql.findAllUser(name, password);
    if (dataRes.length === 0) {
      sendResponse(ctx, 404, "没有该用户");
    } else {
      sendResponse(ctx, 200, "成功", dataRes);
    }
  } catch (error) {
    sendResponse(ctx, 500, "服务器错误", error.message);
  }
};

const findRole = async (ctx) => {
  try {
    const { id } = ctx.request.body;
    if (!id) {
      sendResponse(ctx, 400, "缺少必要的参数");
      return;
    }

    const dataRes = await mysql.findRole(id);
    if (dataRes.length === 0) {
      sendResponse(ctx, 404, "该用户没有角色");
    } else {
      let inputData = {};
      let roleRid = [];
      let routerListRes = false;
      let routerList = [];
      for (let i = 0; i < dataRes.length; i++) {
        roleRid = roleRid.concat(await findRoleMy(dataRes[i].rid));
        if (await findRoute(dataRes[i].rid)) {
          routerList = routerList.concat(await findRoute(dataRes[i].rid));
        }
      }
      if (routerList.length != 0) {
        routerListRes = {
          status: 200,
          msg: "成功",
        };
      } else {
        routerList = null;
        routerListRes = {
          status: 200,
          msg: "成功",
        };
      }
      inputData = {
        roleRid,
        routerList,
      };
      sendResponse(ctx, routerListRes.status, routerListRes.msg, inputData);
    }
  } catch (error) {
    sendResponse(ctx, 500, "服务器错误", error.message);
  }
};

const addUser = async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      sendResponse(ctx, 400, "缺少必要的参数");
      return;
    }

    const addUserRes = await mysql.adduser(username, password);
    if (addUserRes) {
      sendResponse(ctx, 200, "成功", { status: "成功" });
    } else {
      sendResponse(ctx, 204, "失败", { status: "失败" });
    }
  } catch (error) {
    sendResponse(ctx, 500, "服务器错误", error.message);
  }
};

const findRoleMy = async (uid) => {
  return await mysql.findRoleName(uid);
};

const findRoute = async (rid) => {
  const menuRes = await mysql.findMenu(rid);
  let returnData = false;
  if (menuRes.length > 0) {
    for (let i = 0; i < menuRes.length; i++) {
      const child = await getChildRoute(menuRes[i].mid);
      menuRes[i].child = child;
    }
    returnData = menuRes;
  } else {
    returnData = undefined;
  }
  return returnData;
};

const getChildRoute = async (mid) => {
  return await mysql.findMenuChlid(mid);
};

const findAllUser3 = async (ctx) => {
  try {
    const { username } = ctx.query;
    if (!username) {
      sendResponse(ctx, 400, "缺少必要的参数");
      return;
    }
    const allUser = await mysql;
    const findUserRoleListRes = await mysql.findUserRole(username);
    if (findUserRoleListRes.length != 0) {
      sendResponse(ctx, 200, "成功", findUserRoleListRes);
    } else {
      sendResponse(ctx, 204, "没有获取到角色");
    }
  } catch (error) {
    sendResponse(ctx, 500, "服务器错误", error.message);
  }
};

module.exports = {
  findUser,
  findRole,
  addUser,
  findRoleMy,
  findRoute,
  getChildRoute,
  findAllUser3,
};
