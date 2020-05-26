"use strict";

const Controller = require("egg").Controller;
const { _getRedis } = require("../utils/redisModel");
const parseTime = require("../utils/parseTime");

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
      //8:30-17:30
      //检测是否在上班时间
      let start_time = Number(ctx.request.body.start_time);
      let dateAppo = new Date(start_time);
      let startTxt = `${dateAppo.getFullYear()}-${
        dateAppo.getMonth() + 1
      }-${dateAppo.getDate()} 8:30:00`;
      let endTxt = `${dateAppo.getFullYear()}-${
        dateAppo.getMonth() + 1
      }-${dateAppo.getDate()} 17:30:00`;
      let officeStart = new Date(startTxt).getTime();
      let officeEnd = new Date(endTxt).getTime();
      if (
        start_time < officeStart ||
        start_time > officeEnd - 1000 * 60 * 60 * 2
      ) {
        //不在上班时间
        this.ctx.body = new this.ctx.helper._error("不在办公时间");
      } else if (start_time < Date.now()) {
        this.ctx.body = new this.ctx.helper._error("不能选择已过去的时间");
      } else {
        //获得该医生预约记录
        let appoList = await service.common.select("p_reservation", {
          to_id: ctx.request.body.to_id,
          state: 1,
        });

        let end_time = start_time + 1000 * 60 * 60 * 2;
        let conflict = null;

        //检测冲突
        for (let i = 0; i < appoList.length; i++) {
          //冲突
          if (
            !(
              Number(appoList[i].start_time) > end_time ||
              Number(appoList[i].end_time) < start_time
            )
          ) {
            conflict = appoList[i];
            break;
          }
        }
        console.log(conflict);

        if (!conflict) {
          let result = await service.common.insert("p_reservation", {
            from_id: ctx.request.body.from_id,
            to_id: ctx.request.body.to_id,
            start_time: start_time,
            end_time: end_time,
            date_time: Date.now(),
            type_name: ctx.request.body.type_name,
            method: ctx.request.body.method == 2 ? 2 : 1,
          });
          console.log(result);

          if (result.affectedRows) {
            this.ctx.body = new this.ctx.helper._success();
          } else {
            this.ctx.body = new this.ctx.helper._error(result.msg);
          }
        } else {
          this.ctx.body = new this.ctx.helper._error("预约时间冲突", {
            conflict_start_time: conflict.start_time,
            conflict_end_time: conflict.end_time,
          });
        }
      }
    } else {
      //缺少参数
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
        "2020-3-28": [
            {
                "id": 5,
                "from_id": 7,
                "from_name": null,
                "to_id": 2,
                "to_name": "editor",
                "method":1,
                "start_time": "1588035600000",
                "end_time": "1588042800",
                "status": 1 
            }
        ],
        "2020-3-20": [
            {
                "id": 5,
                "from_id": 7,
                "from_name": null,
                "to_id": 2,
                "to_name": "editor",
                "method":1,
                "start_time": "1587348000000",
                "end_time": "1587355200",
                "status": 2
            }
        ]
    }
   }
   * 
   */
  async getList() {
    const { ctx, service } = this;
    const { checkDataRes, checkDataMsg } = new ctx.helper._checkData(
      ctx,
      "to_id"
    );

    if (checkDataRes) {
      // let role = redisData.userInfo.roles;
      // let id = redisData.id;
      let sortedList = {};
      let result = await service.reservation.getList(ctx.query.to_id);
      if (result.length) {
        result.forEach((item, index) => {
          let isMatched = false;
          let date = parseTime(item.start_time);

          let keysList = Object.keys(sortedList);
          for (let i = 0; i < keysList.length; i++) {
            if (date == keysList[i]) {
              isMatched = true;
              sortedList[keysList[i]].push(item);
              break;
            }
          }

          if (!isMatched) {
            sortedList[date] = [item];
          }
          ctx.body = new this.ctx.helper._success(sortedList);
        });
      } else {
        this.ctx.body = new this.ctx.helper._error("暂时没有数据");
      }
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataMsg);
    }
  }


  /**
   * @api {Post} /api/reservation/modify 修改预约
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
    const { checkDataRes, checkDataMsg } = new ctx.helper._checkData(ctx, "id");
    // console.log(checkDataMsg);

    if (checkDataRes) {
      let conflict = null;
      if (ctx.request.body.start_time) {
        //8:30-17:30
        //检测是否在上班时间
        let start_time = Number(ctx.request.body.start_time);
        let dateAppo = new Date(start_time);
        let startTxt = `${dateAppo.getFullYear()}-${
          dateAppo.getMonth() + 1
        }-${dateAppo.getDate()} 8:30:00`;
        let endTxt = `${dateAppo.getFullYear()}-${
          dateAppo.getMonth() + 1
        }-${dateAppo.getDate()} 17:30:00`;
        let officeStart = new Date(startTxt).getTime();
        let officeEnd = new Date(endTxt).getTime();
        if (
          start_time < officeStart ||
          start_time > officeEnd - 1000 * 60 * 60 * 2
        ) {
          //不在上班时间
          this.ctx.body = new this.ctx.helper._error("不在办公时间");
        } else if (start_time < Date.now()) {
          //已过去时间
          this.ctx.body = new this.ctx.helper._error("不能选择已过去的时间");
        } else {
          //获得该医生预约记录
          let appoList = await service.common.select("p_reservation", {
            to_id: ctx.request.body.to_id,
            state: 1,
          });
          // console.log(appoList);

          let end_time = start_time + 1000 * 60 * 60 * 2;

          //检测冲突
          for (let i = 0; i < appoList.length; i++) {
            //不算之前的预约
            if (ctx.request.body.id == appoList[i].id) {
              continue;
            }
            //冲突
            if (
              !(
                Number(appoList[i].start_time) > end_time ||
                Number(appoList[i].end_time) < start_time
              )
            ) {
              conflict = appoList[i];
              break;
            }
          }
          console.log(conflict);
        }
      }
      if (!conflict) {
        //没有冲突
        let condition = { id: ctx.request.body.id, state: 1 };
        // 防止修改的参数需要删除
        delete ctx.request.body.id;
        (ctx.request.body.state == 0 || ctx.request.body.state) &&
          delete ctx.request.body.state;
        if (ctx.request.body.method != 1 && ctx.request.body.method != 2) {
          delete ctx.request.body.method;
        }
        let params = ctx.request.body;
        let result = await service.common.update(
          "p_reservation",
          params,
          condition
        );
        console.log(result);

        if (result.affectedRows) {
          this.ctx.body = new this.ctx.helper._success();
        } else {
          this.ctx.body = new this.ctx.helper._error(result.msg);
        }
      } else {
        this.ctx.body = new this.ctx.helper._error("预约时间冲突", {
          conflict_start_time: conflict.start_time,
          conflict_end_time: conflict.end_time,
        });
      }
    } else {
      //缺少参数
      this.ctx.body = new this.ctx.helper._lack(checkDataMsg);
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
      let result = await service.common.update(
        "p_reservation",
        { state: 0 },
        { id: ctx.request.body.id }
      );
      if (result.affectedRows) {
        ctx.body = new ctx.helper._success();
      }
    } else {
      //缺少参数
      this.ctx.body = new this.ctx.helper._lack(checkDataMsg);
    }
  }
}

module.exports = ReservationController;
