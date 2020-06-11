"use strict";

const Controller = require("egg").Controller;

class RoleController extends Controller {
  /**
   * @api {Post} /api/role/add 增加权限角色
   * @apiGroup Role
   * @apiParam {String} name 角色名称
   * @apiParam {Array} permissions 权限标识符数组
   * @apiSuccessExample 成功返回
   {
    code:1,
    msg:'成功操作',
    data:{
        "insertId": 7
    }
   }
   * 
   */
  async add() {
    const { ctx, service } = this;
    const checkRes = ctx.helper.checkData(ctx, "name", "permissions");

    if (checkRes.is_pass) {
      let body = ctx.request.body;
      ctx.body = await service.role.add(body);
    } else {
      //缺少参数
      this.status=400;
      this.ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }

  /**
   * @api {Get} /api/role/get 获得权限角色列表
   * @apiGroup Role
   * @apiSuccessExample
   {
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 1,
            "name": "admin",
            "permissions": []
        },
        {
            "id": 2,
            "name": "心理咨询师",
            "permissions": []
        }
    ]
}
   * 
   */
  async get() {
    const { ctx, service } = this;
    ctx.body = await service.role.get();
  }

  /**
   * @api {Put} /api/role/update 修改角色名称
   * @apiGroup Role
   * @apiParam {Number} id 权限角色id
   * @apiParam {String} name 角色名称
   * @apiParam {Array} permissions 权限标识符数组
   * @apiSuccessExample 成功返回
   {
    code:1,
    msg:'成功操作'
    }
   * 
   */
  async update() {
    const { ctx, service } = this;
    const checkRes = ctx.helper.checkData(ctx, "id", "name", "permissions");

    if (checkRes.is_pass) {
      let body = ctx.request.body;
      ctx.body = await service.role.update(body);
    } else {
      ctx.body = new ctx.helper._lack(checkRes.msg);
    }
  }

  /**
   * @api {Post} /api/reservation_type/update 删除预约类型
   * @apiGroup ReservationType
   * @apiParam {Number} id 类型id
   * @apiSuccessExample 成功返回
   {
    code:1,
    msg:'成功操作'
    }
   * 
   */
  async del() {
    const { ctx, service } = this;
    const { checkDataRes, checkDataMsg } = new ctx.helper._checkData(ctx, "id");
    if (checkDataRes) {
      let query = ctx.query;
      ctx.body = await service.role.del(query);
    } else {
      ctx.body = new ctx.helper._lack(checkDataMsg);
    }
  }
}

module.exports = RoleController;
