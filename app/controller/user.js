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
    console.log(ctx.body);
    console.log(ctx.query);
    try {
      ctx.body = new ctx.helper._success(ctx.redisData.userInfo);
    } catch (e) {
      ctx.body = new ctx.helper._notLogin();
    }
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
   * @apiParam {String} account 用户名
   * @apiSuccessExample  成功返回
   * {
   *  "code": 1,
   *  "msg": "成功操作",
   *  "data": {
   *      "id": 1,
   *      "roles": "admin",
   *      "account": "admin",
   *      "password": "123456",
   *      "gender": 1,
   *      "name": "admin",
   *      "birthday": null,
   *      "phone": "110",
   *      "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
   *  }
   * }
   */
  async userDetail() {
    const { ctx, service } = this;
    const { checkDataRes, checkDataMsg } = new ctx.helper._checkData(
      ctx,
      "account"
    );

    if (checkDataRes) {
      console.log(ctx.request.body);
      const result = await service.common.get("p_user", {
        account: ctx.query.account,
        status: 1,
      });
      console.log(result);
      
      if (result) {
        const {
          id,
          roles,
          account,
          password,
          name,
          gender,
          birthday,
          phone,
          avatar,
          is_marry,
          job,
          urgent_name,
          urgent_relation,
          urgent_phone,
          visitor_id,
        } = result;
        // console.log(roles);

        if (roles == "admin" || roles == "doctor" || roles == "worker") {
          this.ctx.body = new this.ctx.helper._success({
            id,
            roles,
            account,
            password,
            gender,
            name,
            birthday,
            phone,
            avatar,
          });
        } else {
          this.ctx.body = new this.ctx.helper._success({
            id,
            roles,
            account,
            password,
            name,
            gender,
            birthday,
            phone,
            avatar,
            is_marry,
            job,
            urgent_name,
            urgent_relation,
            urgent_phone,
            visitor_id,
          });
        }
      } else {
        this.ctx.body = new this.ctx.helper._error("获得用户信息失败");
      }
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataMsg);
    }
  }

  //获取用户列表
  /**
   * @api {Get} /api/user/userList 获取用户列表
   * @apiGroup User
   * @apiParam {String} roles （可选）精准查询 用户权限：admin，doctor， worker， criminal，visitor
   * @apiParam {String} account （可选）模糊查询 账号
   * @apiParam {Number} page_now （可选）当前页，默认为1
   * @apiParam {Number} num_in_page （可选）页面内显示个数，默认为10
   * 
   * @apiSuccessExample  成功返回
   {
    "code": 1,
    "msg": "成功操作",
    "data": {
        "is_success": true,
        "page_total": 4,
        "page_now": 1,
        "num_in_page": 10,
        "list": [
            {
                "roles": "admin",
                "account": "admin",
                "name": "admin",
                "gender": 1
            },
            {
                "roles": "doctor",
                "account": "doctor",
                "name": "editor",
                "gender": 1
            },
            {
                "roles": "worker",
                "account": "worker",
                "name": "worker",
                "gender": 1
            },
            {
                "roles": "visitor",
                "account": "visitor",
                "name": "visitor",
                "gender": 1
            },
            {
                "roles": "criminal",
                "account": "fuxing",
                "name": "crimial",
                "gender": 1
            },
            {
                "roles": "visitor",
                "account": "visitor1",
                "name": null,
                "gender": 1
            },
            {
                "roles": "visitor",
                "account": "visitor2",
                "name": null,
                "gender": 1
            },
            {
                "roles": "visitor",
                "account": "ddd",
                "name": null,
                "gender": 1
            },
            {
                "roles": "visitor",
                "account": "ddf",
                "name": null,
                "gender": 1
            },
            {
                "roles": "visitor",
                "account": "fff",
                "name": null,
                "gender": 1
            }
        ]
    }
}
   */
  async userList() {
    const { ctx, service } = this;

    // console.log(ctx.query.roles)
    let result = null;
    if (ctx.query.roles) {
      //按照角色精准查询
      result = await service.common.selectPagination(
        "p_user",
        {
          roles: ctx.query.roles,
          status: 1,
          page_now: ctx.query.page_now,
          num_in_page: ctx.query.num_in_page,
        },
        ["roles", "account", "name", "gender"]
      );
    } else if (ctx.query.account) {
      //根据账号模糊查询
      result = await service.common.selectPagination(
        "p_user",
        {
          account: ctx.query.account,
          status: 1,
          page_now: ctx.query.page_now,
          num_in_page: ctx.query.num_in_page,
        },
        ["roles", "account", "name", "gender"],
        true
      );
    } else {
      result = await service.common.selectPagination(
        "p_user",
        {
          status: 1,
          page_now: ctx.query.page_now,
          num_in_page: ctx.query.num_in_page,
        },
        ["roles", "account", "name", "gender"]
      );
    }

    if (result.is_success) {
      this.ctx.body = new this.ctx.helper._success(result);
    } else {
      this.ctx.body = new this.ctx.helper._error("查找不到用户");
    }
  }

  /**
   * @api {Post} /api/user/register 成员注册
   * @apiGroup User
   * @apiParam {String} account 用户账号
   * @apiParam {String} password 用户密码
   * @apiParam {String} roles 用户权限
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
      "roles"
    );

    console.log(ctx.request.body);

    if (checkDataRes) {
      if (rolesList.includes(ctx.request.body.roles)) {
        let result = await service.common.insert("p_user", ctx.request.body);
        // console.log(result);
        if (result.affectedRows) {
          ctx.body = new this.ctx.helper._success("成功注册", {
            insertId: result.insertId,
          });
        } else if (result.msg) {
          this.ctx.body = new this.ctx.helper._error(result.msg);
        } else {
          this.ctx.body = new this.ctx.helper._error("注册失败");
        }
      } else {
        this.ctx.body = new this.ctx.helper._lack("roles");
      }
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataMsg);
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
