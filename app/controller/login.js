"use strict";

const Controller = require("egg").Controller;


class LoginController extends Controller {
  /**
   * @api {Get} /login/login 登陆，获取登录token, 发送请求时候放入请求头 "x-token": "3d9d1a155d7a6d2c84fae7bd9ba35466"
   * @apiGroup login
   *
   *
   * @apiSuccessExample  {json} Response-Example
   * {
    "code": 1,
    "msg": "成功操作",
    "data": {
        "token": "3d9d1a155d7a6d2c84fae7bd9ba35466",
        "roles": {
            "id": 1,
            "name": "admin"
        }
    }
}
   */
  async login() {
    const { ctx, service } = this;
    const { checkDataRes, checkDataMsg } = new ctx.helper._checkData(
      ctx,
      "account",
      "password"
    );
    if (checkDataRes) {
      ctx.body = await service.login.login()
    } else {
      this.ctx.status= 400;
      this.ctx.body = new this.ctx.helper._lack(checkDataMsg);
    }
  }
}

module.exports = LoginController;
