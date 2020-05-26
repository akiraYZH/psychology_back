"use strict";

const Controller = require("egg").Controller;
const { _getRedis } = require("../utils/redisModel");
const checkData= require("../utils/checkData2");
const parseTime = require("../utils/parseTime");


class ReservationTypeController extends Controller {
  /**
   * @api {Post} /api/reservation_type/add 增加预约类型
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
    const checkRes = checkData(
      ctx,
      "type_name",
      "description"
    );

    if (checkRes.is_pass) {
      let result = await service.common.insert("p_reservation_type", {
        type_name: ctx.request.body.type_name,
        description:ctx.request.body.description
      });
      if (result.affectedRows) {
        ctx.body = new ctx.helper._success({ insertId: result.insertId });
      } else {
        ctx.body = new ctx.helper._error();
      }
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
            "type_name": "test1"
        }
    ]
   }
   * 
   */
  async getList() {
    const { ctx, service } = this;

    let result = await service.common.select("p_reservation_type", {status:1}, ["id", "type_name", "description"]);
    
    if (result.length) {
      ctx.body = new ctx.helper._success(result);
    } else {
      ctx.body = new ctx.helper._error("暂无数据");
    }
  }

  /**
   * @api {Post} /api/reservation_type/update 修改类型名称
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
    const checkRes = checkData(
      ctx,
      "id",
      "type_name",
      "description"
    );
    let result = await service.common.update("p_reservation_type", {type_name:ctx.request.body.type_name, description:ctx.request.body.description}, {id:ctx.request.body.id, status:1});
    if(checkRes.is_pass){
      if (result.changedRows) {
        ctx.body = new ctx.helper._success();
      } else {
        ctx.body = new ctx.helper._error();
      }
    }else{
      ctx.body = new ctx.helper._lack(checkMsg.msg);
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
    const { checkDataRes, checkDataMsg } = new ctx.helper._checkData(
      ctx,
      "id"
    );
    let result = await service.common.update("p_reservation_type", {status:0}, {id:ctx.request.body.id});
    if(checkDataRes){
      if (result.changedRows) {
        ctx.body = new ctx.helper._success();
      } else {
        ctx.body = new ctx.helper._error();
      }
    }else{
      ctx.body = new ctx.helper._lack(checkDataMsg);
    }
    
  }
}



module.exports = ReservationTypeController;
