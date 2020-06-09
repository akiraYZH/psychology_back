"use strict";

const Controller = require("egg").Controller;
const checkData = require("../utils/checkData2");

class ReservationTypeController extends Controller {
  /**
   * @api {Post} /api/reservationType/add 增加预约类型
   * @apiGroup ReservationType
   * @apiParam {String} type_name 类型名称
   * @apiParam {String} description 类型描述
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
    const checkRes = checkData(ctx, "type_name", "description");

    if (checkRes.is_pass) {
      ctx.body = await service.reservationType.add();
    } else {
      //缺少参数
      this.ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }

  /**
   * @api {Get} /api/reservation_type/getList 获得预约类型列表
   * @apiGroup ReservationType
   * @apiSuccessExample
   {
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 1,
            "type_name": "有病",
            "description": "有病就要医治"
        },
        {
            "id": 2,
            "type_name": "有病",
            "description": "有病就要医治"
        }
    ]
}
   * 
   */
  async getList() {
    const { ctx, service } = this;
    ctx.body = await service.reservationType.getList();
  }

  /**
   * @api {Put} /api/reservation_type/update 修改类型名称
   * @apiGroup ReservationType
   * @apiParam {Number} id 类型id
   * @apiParam {String} type_name 类型名称
   * @apiParam {String} description 类型描述
   * @apiSuccessExample 成功返回
   {
    code:1,
    msg:'成功操作'
    }
   * 
   */
  async update() {
    const { ctx, service } = this;
    const checkRes = checkData(ctx, "id", "type_name", "description");

    if (checkRes.is_pass) {
      let body = ctx.request.body;
      ctx.body = await service.reservationType.update(body);
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
      ctx.body = await service.reservationType.del(query);
    } else {
      ctx.body = new ctx.helper._lack(checkDataMsg);
    }
  }
}

module.exports = ReservationTypeController;
