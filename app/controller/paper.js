"use strict";

const Controller = require("egg").Controller;
const rolesList = require("../utils/rolesList");
const checkData = require("../utils/checkData2");

class PaperController extends Controller {
  /**
   * @api {Post} /api/paper/add 增加试卷
   * @apiGroup Paper
   * @apiParam {String} title 试卷名称
   * @apiParam {Array} exercises_json 题目id数组
   * @apiParam {Number} worker_id 创建人id
   * @apiParamExample 参数模版
   {
      "title":"试卷一",
      "exercises_json":["1","2","3","4","5"] //题目id
      "worker_id":"1" //创建人id
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
    let checkRes = checkData(ctx, "title", "exercises_json", "worker_id");
    if (checkRes.is_pass) {
      let body = ctx.request.body;
      ctx.body = await service.paper.add(body);
      
    } else {
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }

  /**
   * @api {Post} api/paper/getList 获得试卷列表
   * @apiGroup Paper
   * @apiParam {String} title (可选)试卷名称:模糊查询
   * @apiParam {String} name (可选)编制人昵称:模糊查询
   * @apiParam {String} start_time (可选)区间开始时间， 传区间开始当天0点的时间戳
   * @apiParam {String} end_time (可选)区间结束时间， 传区间结束当天24:00点，即第下一天0点的时间戳
   * @apiParam {String} page_now(可选)当前页
   * @apiParam {String} num_in_page(可选)每页个数
   * 
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作",
    "data": {
        "is_success": true,
        "page_total": 2,
        "page_now": "2",
        "num_in_page": "1",
        "list": [
            {
                "id": 2,
                "title": "试卷一",
                "worker_id": 2,
                "name": "editor",
                "time_stamp": "1588223983506"
            }
        ]
    }
}
   * 
   */
  async getList() {
    const { ctx, service } = this;
    let query = ctx.query;
    console.log(query);
    
    ctx.body = await service.paper.getList(query);

    
    // let result = await service.common.selectPagination(
    //   "p_paper",
    //   {
    //     "p_paper.status": 1,
    //     page_now: ctx.request.body.page_now,
    //     num_in_page: ctx.request.body.num_in_page,
    //     "p_paper.title": ctx.request.body.title,
    //     "p_user.name": ctx.request.body.name,
    //   },
    //   [
    //     "p_paper.id",
    //     "p_paper.title",
    //     "p_paper.worker_id",
    //     "p_user.name",
    //     "p_paper.time_stamp",
    //   ],
    //   true,
    //   ["p_user"],
    //   ["p_paper.worker_id=p_user.id"]
    // );
    // // result.forEach((item) => {
    // //   item.exercises_json = eval(item.exercises_json);
    // // });
    // if (result.is_success) {
    //   // 过滤时间
    //   if (ctx.request.body.start_time && ctx.request.body.end_time) {
    //     // 获得区间
    //     result.list = result.list.filter(
    //       (item) =>
    //         item.time_stamp > ctx.request.body.start_time &&
    //         item.time_stamp < ctx.request.body.end_time
    //     );
    //   } else if (ctx.request.body.end_time) {
    //     // 只传结束时间
    //     result.list = result.list.filter(
    //       (item) => item.time_stamp < ctx.request.body.end_time
    //     );
    //   } else if (ctx.request.body.start_time) {
    //     // 只传开始时间
    //     result.list = result.list.filter(
    //       (item) => item.time_stamp > ctx.request.body.start_time
    //     );
    //   }

    //   ctx.body = new this.ctx.helper._success(result);
    // } else {
    //   ctx.body = new this.ctx.helper._error("暂无数据");
    // }
  }

  /**
   * @api {Get} api/paper/detailAdmin 获得试卷详情(包含分数)
   * @apiGroup Paper
   * @apiParam {Number} id 试卷id
   * 
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 1,
            "title": "试卷一",
            "list": [
                [
                    {
                        "id": 6,
                        "title": "test",
                        "option_score_obj": [
                            {
                                "question": "option1",
                                "score": "4"
                            },
                            {
                                "question": "option2",
                                "score": "3"
                            },
                            {
                                "question": "option3",
                                "score": "2"
                            },
                            {
                                "question": "option4",
                                "score": "1"
                            }
                        ],
                        "mold_id": 1,
                        "type_id": 1
                    }
                ],
                [
                    {
                        "id": 3,
                        "title": "test",
                        "option_score_obj": [
                            {
                                "question": "问题一",
                                "score": "4"
                            },
                            {
                                "question": "问题二",
                                "score": "3"
                            },
                            {
                                "question": "问题三",
                                "score": "2"
                            },
                            {
                                "question": "问题四",
                                "score": "1"
                            }
                        ],
                        "mold_id": 1,
                        "type_id": 1
                    }
                ],
                [
                    {
                        "id": 4,
                        "title": "test2",
                        "option_score_obj": [
                            {
                                "question": "问题一",
                                "score": "4"
                            },
                            {
                                "question": "问题二",
                                "score": "3"
                            },
                            {
                                "question": "问题三",
                                "score": "2"
                            },
                            {
                                "question": "问题四",
                                "score": "1"
                            }
                        ],
                        "mold_id": 1,
                        "type_id": 1
                    }
                ],
                [
                    {
                        "id": 5,
                        "title": "test",
                        "option_score_obj": [
                            {
                                "question": "option1",
                                "score": "4"
                            },
                            {
                                "question": "option2",
                                "score": "3"
                            },
                            {
                                "question": "option3",
                                "score": "2"
                            },
                            {
                                "question": "option4",
                                "score": "1"
                            }
                        ],
                        "mold_id": 1,
                        "type_id": 1
                    }
                ]
            ]
        }
    ]
}
   * 
   */
  async detailAdmin() {
    const { ctx, service } = this;
    let checkRes = checkData(ctx, "id");
    if (checkRes.is_pass) {
      let result = await service.common.select(
        "p_paper",
        { id: ctx.query.id, status: 1 },
        ["id", "title", "exercises_json"]
      );

      if (result.length) {
        let aIds = eval(result[0].exercises_json);
        let questionList = await service.paper.detailAdmin(aIds);
        let list = [];

        aIds.forEach((id) => {
          for (let i = 0; i < questionList.length; i++) {
            if (Number(id) == questionList[i].id) {
              questionList[i].option_score_obj = eval(
                questionList[i].option_score_obj
              );
              list.push(questionList.splice(i, 1));
              break;
            }
          }
        });

        if (questionList.length) {
          delete result[0].exercises_json;
          result[0].list = list;
          ctx.body = new this.ctx.helper._success(result);
        } else {
          ctx.body = new this.ctx.helper._error("暂无数据");
        }
      } else {
        ctx.body = new this.ctx.helper._error("暂无数据");
      }
    } else {
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }

  //获得试卷详情(不包含分数)
  /**
   * @api {Get} api/paper/detailAdmin 获得试卷详情(不包含分数)
   * @apiGroup Paper
   * @apiParam {Number} id 试卷id
   * 
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 1,
            "title": "试卷一",
            "list": [
                [
                    {
                        "id": 6,
                        "title": "test",
                        "option_obj": [
                            "option1",
                            "option2",
                            "option3",
                            "option4"
                        ],
                        "mold_id": 1,
                        "type_id": 1
                    }
                ],
                [
                    {
                        "id": 3,
                        "title": "test",
                        "option_obj": [
                            "问题一",
                            "问题二",
                            "问题三",
                            "问题四"
                        ],
                        "mold_id": 1,
                        "type_id": 1
                    }
                ],
                [
                    {
                        "id": 4,
                        "title": "test2",
                        "option_obj": [
                            "问题一",
                            "问题二",
                            "问题三",
                            "问题四"
                        ],
                        "mold_id": 1,
                        "type_id": 1
                    }
                ],
                [
                    {
                        "id": 5,
                        "title": "test",
                        "option_obj": [
                            "option1",
                            "option2",
                            "option3",
                            "option4"
                        ],
                        "mold_id": 1,
                        "type_id": 1
                    }
                ]
            ]
        }
    ]
}
   * 
   */
  async detail() {
    const { ctx, service } = this;
    let checkRes = checkData(ctx, "id");
    if (checkRes.is_pass) {
      let result = await service.common.select(
        "p_paper",
        { id: ctx.query.id, status: 1 },
        ["id", "title", "exercises_json"]
      );

      if (result.length) {
        let aIds = eval(result[0].exercises_json);
        let questionList = await service.paper.detail(aIds);
        let list = [];

        aIds.forEach((id) => {
          for (let i = 0; i < questionList.length; i++) {
            if (Number(id) == questionList[i].id) {
              questionList[i].option_obj = eval(questionList[i].option_obj);
              list.push(questionList.splice(i, 1));
              break;
            }
          }
        });

        if (questionList.length) {
          delete result[0].exercises_json;
          result[0].list = list;
          ctx.body = new this.ctx.helper._success(result);
        } else {
          ctx.body = new this.ctx.helper._error("暂无数据");
        }
      } else {
        ctx.body = new this.ctx.helper._error("暂无数据");
      }
    } else {
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }

  /**
   * @api {Post} api/paper/update 更新试卷
   * @apiGroup Paper
   * @apiParam {Number} id 试卷id
   * @apiParam {String} title 试卷名称
   * @apiParam {Array} exercises_json 题目id数组
   * @apiParamExample 参数模版
   {
      "id":1,
      "title":"试卷一",
      "exercises_json":["6","2","3","4","5"]
   }
   * 
   * @apiSuccessExample 成功返回
   {
    code:1,
    msg:'成功操作'
    }
   * 
   */
  async update() {
    const { ctx, service } = this;
    let checkRes = checkData(ctx, "id", "title", "exercises_json", "worker_id");
    console.log(checkRes);
    if (checkRes.is_pass) {
      let result = await service.common.update(
        "p_paper",
        {
          title: ctx.request.body.title,
          exercises_json: JSON.stringify(ctx.request.body.exercises_json),
          worker_id: ctx.request.body.worker_id,
          time_stamp: Date.now(),
        },
        { id: ctx.request.body.id, status: 1 }
      );

      if (result.affectedRows) {
        ctx.body = new this.ctx.helper._success();
      } else {
        ctx.body = new this.ctx.helper._error();
      }
    } else {
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }

  /**
   * @api {Post} api/paper/del 删除试卷
   * @apiGroup Paper
   * @apiParam {Number} id 试卷id
   * @apiSuccessExample 成功返回
   {
    code:1,
    msg:'成功操作'
    }
   * 
   */
  async del() {
    const { ctx, service } = this;
    let checkRes = checkData(ctx, "id");
    if (checkRes.is_pass) {
      let result = await service.common.update(
        "p_paper",
        {
          status: 0,
        },
        { id: ctx.request.body.id }
      );

      if (result.affectedRows) {
        ctx.body = new this.ctx.helper._success();
      } else {
        ctx.body = new this.ctx.helper._error();
      }
    } else {
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }
}

module.exports = PaperController;
