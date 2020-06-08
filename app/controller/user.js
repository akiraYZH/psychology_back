"use strict";

const Controller = require("egg").Controller;
const rolesList = require("../utils/rolesList");
const checkData = require("../utils/checkData2");

class UserController extends Controller {
  //获取登录用户信息
  /**
   * @api {Get} /api/user/userInfo 获取登录用户token
   * @apiGroup User
   *
   *
   * @apiSuccessExample  成功返回
   * {
   *     "code": 1,
   *     "msg": "成功操作",
   *     "data": {
   *         "token": "1a180b3d5ed3594f34f7f8b4279e9004",
   *         "roles": "admin"
   *     }
   * }
   * @apiErrorExample  错误返回
   * {
   *   "code": -3,
   *   "msg": "请登录后再进行操作"
   * }
   */
  async userInfo() {
    const { ctx } = this;
    const result = await this.service.user.userInfo();
    ctx.body = result;
  }
  /**
   * @api {Post} /user/logout 登出
   * @apiGroup User
   *
   *
   * @apiSuccessExample  成功返回
   {
     code: 1,
     data: "success",
   }
   *
   */
  async logout() {
    const { ctx } = this;
    console.log(ctx.body);
    console.log(ctx.query);

    ctx.body = {
      code: 1,
      data: "success",
    };
  }

  //获取用户详情
  /**
   * @api {Get} /api/user/userDetail 获取用户详情
   * @apiGroup User
   * @apiParam {Header:token} token
   * @apiSuccessExample  成功返回
   {
    "code": 1,
    "msg": "成功操作",
    "data": {
        "id": 1,
        "roles": {
            "id": 1,
            "name": "admin"
        },
        "account": "admin",
        "password": "123456",
        "gender": 1,
        "name": null,
        "birthday": null,
        "phone": null,
        "avatar": null
    }
}
   */
  async userDetail() {
    const { ctx, service } = this;
    ctx.body = await service.user.userDetail();
  }

  //获取用户列表
  /**
   * @api {Get} /api/user/userList 获取用户列表
   * @apiGroup User
   * @apiParam {String} role_id（可选）精准查询 用户权限id
   * @apiParam {String} account （可选）模糊查询 账号
   * @apiParam {Number} page_now （可选）当前页，默认为1
   * @apiParam {Number} num_in_page （可选）页面内显示个数，默认为10
   * 
   * @apiSuccessExample  成功返回
   {
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "account": "admin",
            "name": null,
            "gender": 1,
            "roles": {
                "id": 1,
                "name": "admin"
            }
        }
    ],
    "pagging": {
        "size": 3,
        "current": 1,
        "total": 1
    }
}
   */
  async userList() {
    const { ctx, service } = this;
    ctx.body = await service.user.userList();
  }

  /**
   * @api {Post} /api/user/register 成员注册
   * @apiGroup User
   * @apiParam {String} account 用户账号
   * @apiParam {String} password 用户密码
   * @apiParam {String} role_id 用户权限
   * @apiParam {String} phone 用户电话
   * @apiSuccessExample 成功返回
   * {
   *    "code":1,
   *    "msg":'成功注册',
   *    "data":{
   *      "insertId": 7
   *    }
   * }
   *
   * @apiErrorExample 错误返回
   * {
   *  "code":0,
   *  "msg":"注册失败"
   * }
   *
   */
  
  async register() {
    const { ctx, service } = this;
    const { checkDataRes, checkDataMsg } = new ctx.helper._checkData(
      ctx,
      "account",
      "password",
      "role_id",
      "phone"
    );

    console.log(ctx.request.body);
    if (checkDataRes) {
      this.ctx.body = await service.user.register();
    } else {
      this.ctx.body = new this.ctx.helper._lack("role_id");
    }
  }

  //一次性多个注册
  /**
   * @api {Post} /api/user/multiAdd 多次注册新用户（excel导入）
   * @apiGroup User
   * @apiParam {Array} exList 注册用户数组
   * @apiParamExample {Array} request-example
   * {
   *   "exList":[
   *     {"account":"visitor14", "password":"123456", "roles":"visitor", "name":"john", "birthday":"1234567890123","gender":1},
   *     {"account":"visitor15", "password":"123456", "roles":"visitor"},
   *     {"account":"visitor16", "password":"123456", "roles":"visitor"},
   *     {"account":"visitor17", "password":"123456", "roles":"visitor"}
   *     ]
   * }
   * @apiSuccessExample 成功返回
   *{
   * "code":1,
   * "msg":'成功修改'
   * }
   * @apiErrorExample 错误返回
   *{
   * "code": 0,
   * "msg": "操作错误"
   *}
   */
  async multiAdd() {
    const { ctx, service } = this;
    // const { checkDataRes, checkDataMsg } = new ctx.helper._checkData(
    //   ctx
    // );
    let checkRes = checkData(ctx, "exList");
    if (checkRes.is_pass) {
      let result = await service.common.multiInsert(
        "p_user",
        ctx.request.body.exList
      );
      if (result.affectedRows) {
        ctx.body = new this.ctx.helper._success();
      } else {
        ctx.body = new this.ctx.helper._error();
      }
    } else {
      ctx.body = new this.ctx.helper._error(checkRes.msg);
    }
  }

  //成员修改
  /**
   * @api {Post} /api/user/userChange 成员修改
   * @apiGroup User
   * @apiParam {String} account 用户账号
   * @apiParam {String} phone （可选）电话
   * @apiParam {String} password （可选）电话，
   * @apiParam {String} name （可选）昵称
   * @apiParam {String} avatar （可选）用户头像地址
   * @apiParam {String} justice_id （可选）监狱id
   * @apiParam {String} parent_id （可选）上一级别id
   * @apiParam {String} is_marry （可选）是否已婚 1:是 2:否
   * @apiParam {String} education （可选）教育程度
   * @apiParam {String} job （可选）工作
   * @apiParam {String} urgent_name （可选）紧急联系人名字
   * @apiParam {String} urgent_relation （可选）紧急联系人关系
   * @apiParam {String} urgent_phone （可选）紧急联系人电话
   * @apiParam {String} roles （可选）权限
   *
   *
   *
   * @apiSuccessExample 成功返回
   * {
   *    code:1,
   *    msg:'成功修改'
   * }
   * @apiErrorExample 错误返回
   * {
   *    "code": 0,
   *    "msg": "操作错误"
   * }
   */
  async userChange() {
    const { ctx, service } = this;
    const { checkDataRes, checkDataMsg } = new ctx.helper._checkData(
      ctx,
      "account"
    );

    if (checkDataRes) {
      let condition = {
        account: ctx.request.body.account,
      };
      delete ctx.request.body.account;
      ctx.request.body.roles && delete ctx.request.body.roles;
      (ctx.request.body.status || ctx.request.body.status == 0) &&
        delete ctx.request.body.status;
      console.log(ctx.request.body);
      let result = await service.common.update(
        "p_user",
        ctx.request.body,
        condition
      );
      // console.log(result);
      if (result.affectedRows) {
        ctx.body = new this.ctx.helper._success("成功修改");
      } else if (result.msg) {
        this.ctx.body = new this.ctx.helper._error(result.msg);
      } else {
        this.ctx.body = new this.ctx.helper._error("修改失败");
      }
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataMsg);
    }
  }

  //成员删除
  /**
   * @api {Post} /api/user/userDel 成员删除
   * @apiGroup User
   * @apiParam {String} account 用户账号
   * @apiSuccessExample 成功返回
   *{
   *  "code":1,
   *  "msg":'成功修改'
   *}
   * @apiErrorExample 错误返回
   *{
   * "code": 0,
   * "msg": "操作错误"
   *}
   */
  async userDel() {
    const { ctx, service } = this;
    const { checkDataRes, checkDataMsg } = new ctx.helper._checkData(
      ctx,
      "account"
    );

    if (checkDataRes) {
      let condition = {
        account: ctx.request.body.account,
      };
      let result = await service.common.update(
        "p_user",
        {
          status: 0,
        },
        condition
      );
      if (result.affectedRows) {
        ctx.body = new this.ctx.helper._success("成功删除");
      } else if (result.msg) {
        this.ctx.body = new this.ctx.helper._error(result.msg);
      } else {
        this.ctx.body = new this.ctx.helper._error("删除失败");
      }
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataMsg);
    }
  }
}
module.exports = UserController;
