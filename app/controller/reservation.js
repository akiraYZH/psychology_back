"use strict";

const Controller = require("egg").Controller;
const { _getRedis } = require("../utils/redisModel");

class ReservationController extends Controller {
  //增加预约
  /**
   * @api {Post} /api/reservation/addReservation 增加预约
   * @apiGroup Reservation
   * @apiParam {Number} from_id 预约人id
   * @apiParam {Number} to_id 预约咨询师id
   * @apiParam {String} start_time 预约时间（开始时间）
   * @apiParam {String} type_name 预约类型
   * @apiParam {Number} method 预约方式(1为来访， 2为线上)
   * 
   * 
   * @apiSuccessExample 成功返回
   {
    code:1,
    msg:'成功操作'
    }
   * 
   */
  async addReservation() {
    const { ctx, service } = this;
    const { checkDataRes, checkDataMsg } = new ctx.helper._checkData(
      ctx,
      "from_id",
      "to_id",
      "start_time",
      "type_name",
      "method"
    );

    if (checkDataRes) {
      let body = ctx.request.body;
      ctx.body = await service.reservation.addReservation(body);
    } else {
      //缺少参数
      ctx.status = 400;
      this.ctx.body = new this.ctx.helper._lack(checkDataMsg);
    }
  }

  /**
   * @api {Get} /api/reservation/getList 获得预约列表
   * @apiGroup Reservation
   * @apiParam {Number} to_id 被预约咨询师id
   * 
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作",
    "data": {
        "2020-6-10": [
            {
                "id": 1,
                "type_name": "abc",
                "method": 1,
                "start_time": "1591758326626",
                "end_time": "1591765526626",
                "state": 1,
                "from": {
                    "id": 1,
                    "account": "admin",
                    "name": null
                },
                "to": {
                    "id": 2,
                    "account": "664753092",
                    "name": null
                }
            }
        ]
    }
}
   * 
   */
  async getList() {
    const { ctx, service } = this;
    const checkDataRes = new ctx.helper.checkData(ctx, "to_id");

    if (checkDataRes.is_pass) {
      let query = ctx.query;
      let result = await service.reservation.getList(query);
      ctx.body = result;
    } else {
      ctx.status = 400;
      ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
   * @api {Put} /api/reservation/modify 修改预约
   * @apiGroup Reservation
   * @apiParam {Number} id 预约记录id
   * @apiParam {Number} from_id 预约人id
   * @apiParam {Number} to_id 预约咨询师id
   * @apiParam {String} start_time 预约时间（开始时间）
   * @apiParam {Number} status 预约状态：1待确认2确认待上门3成功上门4失约5咨询师主动取消
   * @apiParam {Number} method 预约方式(1为来访， 2为线上)
   * 
   * 
   * @apiSuccessExample 成功返回
   {
    code:1,
    msg:'成功操作'
    }
   * 
   */
  async modify() {
    const { ctx, service } = this;
    const checkDataRes = ctx.helper.checkData(ctx, "id");
    // console.log(checkDataMsg);

    if (checkDataRes.is_pass) {
      let body = ctx.request.body;
      ctx.body = await service.reservation.modify(body);
    } else {
      //缺少参数
      this.ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
   * @api {Post} /api/reservation/del 删除预约
   * @apiGroup Reservation
   * 
   * 
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
    // console.log(checkDataMsg);

    if (checkDataRes) {
      let query = ctx.query;
      
      ctx.body = await service.reservation.del(query);
    } else {
      //缺少参数
      this.ctx.body = new this.ctx.helper._lack(checkDataMsg);
    }
  }
}

module.exports = ReservationController;
