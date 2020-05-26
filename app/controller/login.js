'use strict';

const Controller = require('egg').Controller;
const { _pwd } = require('../utils/cryp');
const { _setRedis } = require('../utils/redisModel');

class LoginController extends Controller {
    /**
   * @api {Get} /login/login 登陆，获取登录token
   * @apiGroup login
   *
   *
   * @apiSuccessExample  {json} Response-Example
   * {
   * "code": 1,
   * "msg": "成功操作",
   * "data": {
   *    "token": "a20d22b501b93a66d686d9fa35df6914",
   *    "roles": "admin"
   *  }
   * }
   */
  async login() {
    const { ctx, service } = this;
    const { checkDataRes, checkDataMsg } = new ctx.helper._checkData(ctx, 'account', 'password');
    if (checkDataRes) {
      console.log(ctx.request.body)
      const loginRes = await service.common.get('p_user', { account: ctx.request.body.account, password: ctx.request.body.password });

      if (loginRes) {
        const time = Date.now();
        const { id, name, roles, avatar } = loginRes;
        const { password: token } = new _pwd(id + time);
        _setRedis(token, {
          userInfo: { name, roles, avatar },
          id,
          time
        });
        this.ctx.body = new this.ctx.helper._success({ token ,roles});
      } else {
        this.ctx.body = new this.ctx.helper._error("账号或密码错误");
      }
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataMsg);
    }
  }
}

module.exports = LoginController;
