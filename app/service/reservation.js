const Service = require("egg").Service;
const parseTime = require("../utils/parseTime");
const Op = require("sequelize").Op;

class ReservationService extends Service {
  async getList(data) {
    const { ctx, app } = this;
    const { PReservation, PUser } = app.model.Tables;
    // let role = redisData.userInfo.roles;
    // let id = redisData.id;
    let sortedList = {};
    let result = await PReservation.findAll({
      where: {
        to_id: data.to_id,
        status: 1,
        start_time: {
          [Op.gt]: Date.now() - 1000 * 3600 * 24 * 31,
        },
      },
      attributes: [
        "id",
        "type_name",
        "method",
        "start_time",
        "end_time",
        "state",
      ],
      include: [
        {
          model: PUser,
          as: "from",
          attributes: ["id", "account", "name"],
        },
        {
          model: PUser,
          as: "to",
          attributes: ["id", "account", "name"],
        },
      ],
    });

    if (result.length) {
      result.forEach((item, index) => {
        let isMatched = false;
        let date = parseTime(item.dataValues.start_time);

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

        // return 123;
      });
      return new ctx.helper._success(sortedList);
    } else {
      return new ctx.helper._error("暂时没有数据");
    }
    // const Literal = this.app.mysql.literals.Literal;
    // let condition={
    //     columns:['from_id', 'to_id']
    // };
    // if(role=)
    // let sql = `SELECT r.id, r.from_id, u1.name AS from_name ,r.to_id, r.type_name, u2.name AS to_name ,r.start_time, r.end_time, r.status, r.method FROM p_reservation r, p_user u1, p_user u2 WHERE r.from_id = u1.id AND r.to_id=u2.id AND u1.status <> 0 AND u2.status <> 0 AND r.state <> 0 AND r.to_id='${to_id}'`;

    // console.log(sql);

    // return await this.app.mysql.query(sql);
  }

  async addReservation(data) {
    const { ctx, app } = this;
    const { PReservation, PUser } = app.model.Tables;
    //8:30-17:30
    //检测是否在上班时间
    let start_time = Number(data.start_time);
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
      this.ctx.status = 400;
      return new this.ctx.helper._error("不在办公时间");
    } else if (start_time < Date.now()) {
      this.ctx.status = 400;
      return new this.ctx.helper._error("不能选择已过去的时间");
    } else {
      //获得该医生预约记录（31天前所有）
      let appoList = await PReservation.findAll({
        where: {
          to_id: data.to_id,
          state: 1,
          start_time: {
            [Op.gt]: Date.now() - 1000 * 3600 * 24 * 31,
          }
        },
      });

      let end_time = start_time + 1000 * 60 * 60 * 2;
      let conflict = null;
      console.log(appoList);

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
        let result = await PReservation.create({
          from_id: data.from_id,
          to_id: data.to_id,
          start_time: start_time,
          end_time: end_time,
          date_time: Date.now(),
          type_name: data.type_name,
          method: data == 2 ? 2 : 1,
        });
        console.log(result);

        if (result) {
          return new this.ctx.helper._success();
        } else {
          return new this.ctx.helper._error();
        }
      } else {
        return new this.ctx.helper._error("预约时间冲突", {
          conflict_start_time: conflict.start_time,
          conflict_end_time: conflict.end_time,
        });
      }
    }
  }

  async modify(data) {
    let { PReservation } = this.app.model.Tables;
    let { ctx } = this;
    (data.status || data.status == 0) && delete data.status;

    try {
      let conflict = null;
      if (data.start_time) {
        //8:30-17:30
        //检测是否在上班时间
        let start_time = Number(data.start_time);
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
          this.ctx.status = 400;
          return new this.ctx.helper._error("不在办公时间");
        } else if (start_time < Date.now()) {
          //已过去时间
          this.ctx.status = 400;
          return new this.ctx.helper._error("不能选择已过去的时间");
        } else {
          //获得该医生预约记录（31天前所有）
          let appoList = await PReservation.findAll({
            where: {
              to_id: data.to_id,
              state: 1,
              start_time: {
                [Op.gt]: Date.now() - 1000 * 3600 * 24 * 31,
              }
            },
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
        let condition = { id: data.id, status: 1 };
        // 防止修改的参数需要删除
        delete data.id;
        (data.status == 0 || data.status) && delete data.status;
        if (data.method != 1 && data.method != 2) {
          delete data.method;
        }
        //计算结束时间
        if (data.start_time) {
          data.end_time = String(Number(data.start_time) + 1000 * 3600 * 2);
        }
        let result = await PReservation.update(data, { where: condition });
        console.log(result);

        if (result[0] > 0) {
          ctx.status = 200;
          return new this.ctx.helper._success();
        } else {
          ctx.status = 400;
          return new this.ctx.helper._error("没有修改");
        }
      } else {
        ctx.status = 500;
        return new this.ctx.helper._error("预约时间冲突", {
          conflict_start_time: conflict.start_time,
          conflict_end_time: conflict.end_time,
        });
      }
    } catch (error) {
      console.log(error);
      this.ctx.status = 500;
      return new this.ctx.helper._error(error);
    }
  }

  async del(data) {
    const { ctx } = this;
    const { PReservation } = this.app.model.Tables;
    try {
      let condition = { id: data.id, status: 1 };
      let result = await PReservation.update(
        { status: 0 },
        { where: condition }
      );
      console.log(result);

      if (result[0] > 0) {
        ctx.status = 200;
        return new ctx.helper._success();
      } else {
        ctx.status = 404;
        return new ctx.helper._error("没有删除");
      }
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }
}

module.exports = ReservationService;
