"use strict";

const Controller = require("egg").Controller;
const rolesList = require("../utils/rolesList");
const checkData = require("../utils/checkData2");

class RecordController extends Controller {
  /**
   * @api {Post} /api/record/add 增加记录
   * @apiGroup Record
   * @apiParam {Number} type_id 1为试卷, 2为访谈记录
   * @apiParam {Number} operator_id 操作人id
   * @apiParam {Number} worker_id 负责人id
   * @apiParamExample 参数模版（type_id为1时，试卷记录）
   {
      "title": "试卷",
      "operator_id": "3",
      "worker_id": "2",
      "type_id": "1",
      "paper_exercises": [
        {
          "question": "问题1",
          "anwserIndex": 1,
          "score": 1,
          "type_id": 2,
          "options": [
            { "option": "选项1", "score": "4" },
            { "option": "选项2", "score": "3" },
            { "option": "选项3", "score": "2" },
            { "option": "选项4", "score": "1" }
          ]
        },
        {
          "question":"问题2",
          "anwserIndex":0,
          "score":1,
          "type_id":2,
          "options":[
            { "option": "选项1", "score": "4" },
            { "option": "选项2", "score": "3" },
            { "option": "选项3", "score": "2" },
            {" option": "选项4", "score": "1" }
          ]
        }
      ]
    }
   *
   * @apiParamExample 参数模版（type_id为2时， 访谈记录）
   {
      "operator_id":"3",
      "worker_id":"2",
      "type_id":"2",
      "title":"面谈记录标题",
      "content":"这次访谈很有成效， 继续努力。"
    }
   *
   * @apiSuccessExample 成功返回
   {
    code:1,
    msg:'成功操作'
    }
   * 
   */
  async add() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    ctx.body = await service.record.add(body);
  }

  /**
   * @api {Get} api/record/getUserList 获得已经做题的用户列表
   * @apiGroup Record
   * @apiParam {String} keyword 根据账号或用户名查询（模糊）
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "operator_id": 3,
            "account": "worker",
            "name": "worker"
        }
    ]
}
   * 
   */
  async getUserList() {
    const { ctx, service } = this;
    let result = null;
    if (!ctx.query.keyword) {
      result = await service.record.getUserList();
    } else {
      result = await service.record.getUserList(ctx.query.keyword.trim());
    }

    if (result.length) {
      ctx.body = new ctx.helper._success(result);
    } else {
      ctx.body = new ctx.helper._success("暂无数据");
    }
  }

  /**
   * @api {Get} api/record/getRecords 获得记录列表
   * @apiGroup Record
   * @apiParam {Number} operator_id (可选)用户id：可获得某用户的记录
   * @apiParam {Number} worker_id (可选)负责人id：可获得工作人员负责的记录
   * @apiParam {String} account (可选)模糊搜索：用户账号
   * @apiParam {String} name (可选)模糊搜素：用户昵称
   * 
   * 
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 1,
            "type_id": 1,
            "time_stamp": "1592207689287",
            "title": "试卷",
            "user": {
                "id": 3,
                "account": "664753",
                "name": null
            },
            "doctor": {
                "id": 2,
                "account": "664753092",
                "name": null
            }
        },
        {
            "id": 2,
            "type_id": 1,
            "time_stamp": "1592207888812",
            "title": "试卷",
            "user": {
                "id": 3,
                "account": "664753",
                "name": null
            },
            "doctor": {
                "id": 2,
                "account": "664753092",
                "name": null
            }
        },
        {
            "id": 3,
            "type_id": 2,
            "time_stamp": "1592207949189",
            "title": "面谈记录标题",
            "user": {
                "id": 3,
                "account": "664753",
                "name": null
            },
            "doctor": {
                "id": 2,
                "account": "664753092",
                "name": null
            }
        }
    ],
    "pagging": {
        "size": 10,
        "current": 1,
        "total": 3
    }
}
   * 
   */
  async getRecords() {
    const { ctx, service } = this;
    let query = ctx.query;
    console.log(query);
    
    ctx.body = await service.record.getRecords(query)
  }

  /**
   * @api {Get} api/record/getOneRecord 获得某一条记录的详情
   * @apiGroup Record
   * @apiParam {Number} id 记录id
   * @apiSuccessExample 成功返回（type_id为2，访谈记录）
   {
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 5,
            "operator_id": 3,
            "account": "worker",
            "name": "worker",
            "worker_id": 2,
            "work_name": "editor",
            "time_stamp": "1588149221180",
            "type_id": 2,
            "content": "123",
            "title": "面谈标题"
        }
    ]
}
   * @apiSuccessExample 成功返回（type_id为1，做题记录）
   {
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 10,
            "operator_id": 3,
            "account": "worker",
            "name": "worker",
            "worker_id": 2,
            "work_name": "editor",
            "time_stamp": "1589286109676",
            "type_id": 1,
            "score": "2",
            "title": "试卷",
            "paper_evaluation": {
                "scoreTotal": 2,
                "general": "您在量表上的总得分较低，表明您的心理健康状况良好。主要表现为：您很少因心理原因出现身体不适感；能积极面对社会和生活中的各种问题，信任他人，对人友善；一般没有过于焦虑、悲伤等情况。",
                "general_advice": "您拥有比较健康的心态和良好的情绪状态，能够较好地处理生活中的挫折和压力。能很好地适应工作、社会生活，并从中获得满足和快乐，个人价值感和幸福感较高。希望您继续保持这种积极的心态和良好的行为方式。",
                "list": [
                    {
                        "type_id": "2",
                        "name": "躯体化",
                        "status": "表示你的生活处于规律状态中，睡眠和饮食情况都很好。",
                        "advice": "您能较好地应对社会生活中的压力，能调整自己的心态，能够有效防止心理因素躯体化。建议您能够保持积极、乐观的生活态度。",
                        "level": "无症状",
                        "scoreAvg": "1.00"
                    },
                    {
                        "name": "总分",
                        "status": null,
                        "advice": null,
                        "level": null,
                        "scoreAvg": null
                    },
                    {
                        "name": "强迫症状",
                        "status": null,
                        "advice": null,
                        "level": null,
                        "scoreAvg": null
                    },
                    {
                        "name": "人际关系敏感",
                        "status": null,
                        "advice": null,
                        "level": null,
                        "scoreAvg": null
                    },
                    {
                        "name": "抑郁",
                        "status": null,
                        "advice": null,
                        "level": null,
                        "scoreAvg": null
                    },
                    {
                        "name": "焦虑",
                        "status": null,
                        "advice": null,
                        "level": null,
                        "scoreAvg": null
                    },
                    {
                        "name": "敌对",
                        "status": null,
                        "advice": null,
                        "level": null,
                        "scoreAvg": null
                    },
                    {
                        "name": "恐怖",
                        "status": null,
                        "advice": null,
                        "level": null,
                        "scoreAvg": null
                    },
                    {
                        "name": "偏执",
                        "status": null,
                        "advice": null,
                        "level": null,
                        "scoreAvg": null
                    },
                    {
                        "name": "精神病性",
                        "status": null,
                        "advice": null,
                        "level": null,
                        "scoreAvg": null
                    },
                    {
                        "name": "其他",
                        "status": null,
                        "advice": null,
                        "level": null,
                        "scoreAvg": null
                    }
                ]
            },
            "paper_exercises": [
                {
                    "question": "问题1",
                    "anwserIndex": 1,
                    "score": 1,
                    "type_id": 2,
                    "options": [
                        {
                            "option": "选项1",
                            "score": "4"
                        },
                        {
                            "option": "选项2",
                            "score": "3"
                        },
                        {
                            "option": "选项3",
                            "score": "2"
                        },
                        {
                            "option": "选项4",
                            "score": "1"
                        }
                    ]
                },
                {
                    "question": "问题2",
                    "anwserIndex": 0,
                    "score": 1,
                    "type_id": 2,
                    "options": [
                        {
                            "option": "选项1",
                            "score": "4"
                        },
                        {
                            "option": "选项2",
                            "score": "3"
                        },
                        {
                            "option": "选项3",
                            "score": "2"
                        },
                        {
                            " option": "选项4",
                            "score": "1"
                        }
                    ]
                }
            ]
        }
    ]
}
   * 
   */
  async getOneRecord() {
    const { ctx, service } = this;
    let checkRes = checkData(ctx, "id");
    if (checkRes.is_pass) {
      let query = ctx.query;
      ctx.body= await service.record.getOneRecord(query);
    } else {
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }

  /**
   * @api {Put} api/record/updateTalkRecord 更新面谈内容
   * @apiGroup Record
   * @apiParam {Number} id 面谈记录id
   * @apiParam {Number} operator_id 记录主体id
   * @apiParam {Number} worker_id 记录主体负责人id
   * @apiParam {Number} type_id 类型id：必须为2， 2为面谈记录， 做题记录不能被修改
   * @apiParam {String} content 面谈内容
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作"
   }
   * 
   */
  async updateTalkRecord() {
    const { ctx, service } = this;
    let checkRes = checkData(
      ctx,
      "id",
      "operator_id",
      "worker_id",
      "type_id",
      "content"
    );
    if (checkRes.is_pass) {
      if (ctx.request.body.type_id == 2) {
     
        let body = ctx.request.body;
        ctx.body = await service.record.updateTalkRecord(body);
      } else {
        ctx.body = new this.ctx.helper._lack("type_id参数应为2");
      }
    } else {
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }

  //删除记录
  /**
   * @api {Delete} api/record/del 删除记录
   * @apiGroup Record
   * @apiParam {Number} id 记录id
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作"
   }
   * 
   */
  async del() {
    const { ctx, service } = this;
    let checkRes = checkData(ctx, "id");
    if (checkRes.is_pass) {
      let query = ctx.query;
      ctx.body = await service.record.del(query);
    } else {
      ctx.status=400;
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }
}

module.exports = RecordController;

