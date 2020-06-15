const Service = require("egg").Service;
const Op = require("sequelize").Op;

class RecordService extends Service {
  async add(data) {
    const { ctx } = this;
    // getPermissions: [Function],
    // countPermissions: [Function],
    // hasPermission: [Function],
    // hasPermissions: [Function],
    // setPermissions: [Function],
    // addPermission: [Function],
    // addPermissions: [Function],
    // removePermission: [Function],
    // removePermissions: [Function],
    // createPermission: [Function]
    const { PRecord, PType } = this.app.model.Tables;
    // console.log(PRole.prototype);
    //创建事务对象
    let transaction = await this.ctx.model.transaction();
    try {
      if (ctx.request.body.type_id == 1) {
        //答卷
        let checkRes = ctx.helper.checkData(
          ctx,
          "title",
          "operator_id",
          "worker_id",
          "type_id",
          "paper_exercises"
        );
        if (checkRes.is_pass) {
          let typeList = {};
          let scoreTotal = 0;
          let evaluationList = await PType.findAll();
          let evaluation = {};

          // 分类
          data.paper_exercises.forEach((item) => {
            //顺便加总分
            scoreTotal += Number(item.score);
            if (!Object.keys(typeList).length) {
              typeList[item.type_id] = {};
              typeList[item.type_id].type_id = item.type_id;
              typeList[item.type_id].list = [];
              typeList[item.type_id].scoreTotal = item.score;
              typeList[item.type_id].list.push(item);
              typeList[item.type_id].name = evaluationList.find(
                (item2) => item2.id == item.type_id
              ).name;
            } else {
              let isMatched = false;
              for (key in typeList) {
                if (key == item.type_id) {
                  typeList[key].list.push(item);
                  typeList[key].scoreTotal += item.score;
                  isMatched = true;
                  break;
                }
              }
              if (!isMatched) {
                typeList[item.type_id] = {};
                typeList[item.type_id].type_id = item.type_id;
                typeList[item.type_id].list = [];
                typeList[item.type_id].scoreTotal = item.score;
                typeList[item.type_id].list.push(item);
                typeList[item.type_id].name = evaluationList.find(
                  (item2) => item2.id == item.type_id
                ).name;
              }
            }
          });

          //各项平均分
          for (key in typeList) {
            typeList[key].scoreAvg = (
              typeList[key].scoreTotal / typeList[key].list.length
            ).toFixed(2);
          }

          evaluation.scoreTotal = scoreTotal;
          switch (scoreTotal) {
            case scoreTotal > 240:
              evaluation.general = evaluationList.find(
                (item) => item.name == "总分"
              ).high;
              evaluation.general_advice = evaluationList.find(
                (item) => item.name == "总分"
              ).high_advice;
              break;
            case scoreTotal > 180:
              evaluation.general = evaluationList.find(
                (item) => item.name == "总分"
              ).middle;
              evaluation.general_advice = evaluationList.find(
                (item) => item.name == "总分"
              ).middle_advice;
              break;
            case scoreTotal > 160:
              evaluation.general = evaluationList.find(
                (item) => item.name == "总分"
              ).low;
              evaluation.general_advice = evaluationList.find(
                (item) => item.name == "总分"
              ).low_advice;
            default:
              evaluation.general = evaluationList.find(
                (item) => item.name == "总分"
              ).symtom_free;
              evaluation.general_advice = evaluationList.find(
                (item) => item.name == "总分"
              ).symtom_free_advice;
              break;
          }

          // console.log(typeList);
          let list = [];
          for (key in typeList) {
            for (let i = 0; i < evaluationList.length; i++) {
              if (key == evaluationList[i].id) {
                list.push({
                  type_id: key,
                  name: evaluationList[i].name,
                  status:
                    typeList[key].scoreAvg > 3
                      ? evaluationList[i].high
                      : typeList[key].scoreAvg > 2
                      ? evaluationList[i].low
                      : evaluationList[i].symtom_free,
                  advice:
                    typeList[key].scoreAvg > 3
                      ? evaluationList[i].high_advice
                      : typeList[key].scoreAvg > 2
                      ? evaluationList[i].low_advice
                      : evaluationList[i].symtom_free_advice,
                  level:
                    typeList[key].scoreAvg > 3
                      ? "重度症状"
                      : typeList[key].scoreAvg > 2
                      ? "轻度症状"
                      : "无症状",
                  scoreAvg: typeList[key].scoreAvg,
                });
                break;
              }
            }
          }

          evaluationList.forEach((item) => {
            let is_matched = false;
            for (let i = 0; i < list.length; i++) {
              if (item.id == list[i].type_id) {
                is_matched = true;
                break;
              }
            }
            if (!is_matched) {
              list.push({
                type_id: item.type_id,
                name: item.name,
                status: null,
                advice: null,
                level: null,
                scoreAvg: null,
              });
            }
          });

          evaluation.list = list;

          let result = await PRecord.create({
            title: data.title,
            operator_id: data.operator_id,
            worker_id: data.worker_id,
            type_id: data.type_id,
            paper_exercises: JSON.stringify(data.paper_exercises),
            paper_evaluation: JSON.stringify(evaluation),
            time_stamp: Date.now(),
            score: scoreTotal,
          });
          if (result) {
            ctx.status = 200;
            return new this.ctx.helper._success();
          } else {
            ctx.status = 500;
            return new this.ctx.helper._error();
          }
        } else {
          ctx.status = 400;
          return new this.ctx.helper._lack(checkRes.msg);
        }
      } else if (ctx.request.body.type_id == 2) {
        //访谈
        let checkRes = ctx.helper.checkData(
          ctx,
          "operator_id",
          "worker_id",
          "type_id",
          "content",
          "title"
        );
        if (checkRes.is_pass) {
          let result = await PRecord.create({
            operator_id: data.operator_id,
            worker_id: data.worker_id,
            type_id: data.type_id,
            title: data.title,
            content: data.content.trim(),
            time_stamp: Date.now(),
          });
          if (result) {
            ctx.status = 200;
            return new this.ctx.helper._success();
          } else {
            ctx.status = 500;
            return new this.ctx.helper._error();
          }
        } else {
          ctx.status = 400;
          return new this.ctx.helper._lack(checkRes.msg);
        }
      } else {
        //不matched
        ctx.status = 400;
        ctx.body = new this.ctx.helper._lack("type_id只能是1或2");
      }
    } catch (error) {
      //回滚
      console.log(error);

      console.log(error);

      await transaction.rollback();
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async getUserList(keyword = "") {
    let sql = `SELECT DISTINCT r.operator_id, u.account, u.name FROM p_record r INNER JOIN p_user u ON r.operator_id=u.id WHERE r.status =1`;
    console.log(keyword, 133);

    if (keyword) {
      sql += ` AND (u.account LIKE '%${keyword}%' OR u.name LIKE '%${keyword}%')`;
    }
    console.log(sql);

    return await this.app.mysql.query(sql);
  }

  async getRecords(data) {
    const { ctx, service } = this;
    const { PRecord, PUser } = this.app.model.Tables;

    console.log(data,9999999);
    try {
      
      let options = {
        where: {
          operator_id: data.operator_id,
          worker_id: data.worker_id,
          // title: { "like": `%${data.title}%` },
          status: 1,
        },
        attributes: ["id", "type_id", "time_stamp", "title"],
        offset: Number(data.now_page)
          ? (Number(data.now_page) - 1) * Number(data.now_page)
          : 0,
        limit: Number(data.num_in_page) || 10,
        include: [
          {
            model: PUser,
            required: false,
            attributes: ["id", "account", "name"],
            as: "user",
            where:{
              account:{[Op.like]:`%${data.account}%`},
              name:{[Op.like]:`%${data.name}%`}
            }
          },
          {
            model: PUser,
            required: false,
            attributes: ["id", "account", "name"],
            as: "doctor",
          },
        ],
      };

      const result = await ctx.helper.selectWithPagging(PRecord, options);
x
      console.log(result);

      ctx.status = 200;
      let template = new ctx.helper._success();
      return Object.assign(template, result);
    } catch (e) {
      console.log(e);

      this.ctx.status = 500;
      return new this.ctx.helper._error();
    }
  }

  // async getRecords(operator_id = null) {
  //   // let sql = `SELECT r.id, r.operator_id, u.account, u.name, r.worker_id, u2.name AS work_name, r.time_stamp, r.type_id, r.content, r.score, r.title, r.paper_evaluation, r.paper_exercises FROM p_record r, p_user u, p_user u2 WHERE r.operator_id=u.id AND r.worker_id=u2.id AND r.status='1'`;
  //   let sql = `SELECT r.id, r.operator_id, u.account, u.name, r.worker_id, u2.name AS worker_name, r.title,r.time_stamp, r.type_id FROM p_record r, p_user u, p_user u2 WHERE r.operator_id=u.id AND r.worker_id=u2.id AND r.status='1'`;
  //   console.log(operator_id, 133);
  //   if (operator_id) {
  //     sql += ` AND r.operator_id = '${operator_id}'`;
  //   }

  //   return await this.app.mysql.query(sql);
  // }

  async getOneRecord(id = null) {
    let sql = `SELECT r.id, r.operator_id, u.account, u.name, r.worker_id, u2.name AS work_name, r.time_stamp, r.type_id, r.content, r.score, r.title, r.paper_evaluation, r.paper_exercises FROM p_record r, p_user u, p_user u2 WHERE r.operator_id=u.id AND r.worker_id=u2.id AND r.status='1'`;
    // let sql = `SELECT r.id, r.operator_id, u.account, u.name, r.worker_id, u2.name AS worker_name, r.title,r.time_stamp, r.type_id FROM p_record r, p_user u, p_user u2 WHERE r.operator_id=u.id AND r.worker_id=u2.id AND r.status='1'`;
    console.log(id, 133);
    if (id) {
      sql += ` AND r.id = '${id}'`;
    }

    return await this.app.mysql.query(sql);
  }
}

module.exports = RecordService;
