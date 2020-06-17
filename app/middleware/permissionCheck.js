"use strict";

// const { _getCookie } = require('../utils/cookieModel');
const { _getRedis } = require("../utils/redisModel");
const permissions = require("../../basedData/permission");

module.exports = () => {
  return async function permissionCheck(ctx, next) {
    const redisRes = await _getRedis(ctx.request.headers["x-token"]);

    if (redisRes) {
      // ctx.redisData = redisRes;
      const { PRole, PPermission } = ctx.model.Tables;

      let role = await PRole.findOne({
        where: { id: redisRes.userInfo.roles.id, status: 1 },
        include: {
          model: PPermission,
          required: false,
          as: "permissions",
        },
      });

      let hasPermission = false;
      let apis = [];
      console.log(role);

      role.permissions.forEach((item) => {
        apis.push(...JSON.parse(item.apis));
      });

      console.log(apis);
      for (let i = 0; i < apis.length; i++) {
        console.log(apis[i]);
        if (ctx.request.url.startsWith(apis[i] || checkIgnore(ctx))) {
          hasPermission = true;
          //   await next();
          break;
        }
      }
      if (hasPermission) {
        await next();
      } else {
        // await next();
        ctx.status = 403;
        ctx.body = new ctx.helper._error("没有权限");
      }
      //   await next();
    } else {
      ctx.status = 401;
      ctx.body = new ctx.helper._notLogin();
      // await next();
    }
  };

  function checkIgnore(ctx) {
    let isIgnore = false;
    let ignoreArr = ["/api/user/register"];
    for (let i = 0; i < ignoreArr.length; i++) {
      if (ctx.request.url.startsWith(ignoreArr[i])) {
        isIgnore = true;
        break;
      }
    }
    return isIgnore;
  }
};
