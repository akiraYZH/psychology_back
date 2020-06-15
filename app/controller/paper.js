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
   * @api {Get} api/paper/getList 获得试卷列表
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
    "data": [
        {
            "id": 1,
            "title": "试卷一",
            "time_stamp": "1591960228598",
            "editor": {
                "id": 1,
                "account": "admin",
                "name": "admin"
            }
        }
    ],
    "pagging": {
        "size": 10,
        "current": 1,
        "total": 1
    }
}
   * 
   */
  async getList() {
    const { ctx, service } = this;
    let query = ctx.query;
    console.log(query);
    
    ctx.body = await service.paper.getList(query);

    
    
  }

  /**
   * @api {Get} api/paper/detail-score 获得试卷详情(包含分数)
   * @apiGroup Paper
   * @apiParam {Number} id 试卷id
   * 
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作",
    "data": {
        "id": 1,
        "title": "试卷一",
        "time_stamp": "1591960228598",
        "editor": {
            "id": 1,
            "account": "admin",
            "name": "admin"
        },
        "exercises": [
            {
                "id": 1,
                "title": "test",
                "option_score_obj": [
                    {
                        "option": "option一",
                        "score": "4"
                    },
                    {
                        "option": "选项二",
                        "score": "3"
                    },
                    {
                        "option": "选项三",
                        "score": "2"
                    },
                    {
                        "option": "选项四",
                        "score": "1"
                    }
                ],
                "mold_id": 1,
                "type_id": 1
            },
            {
                "id": 2,
                "title": "test",
                "option_score_obj": [
                    {
                        "option": "选项一",
                        "score": "4"
                    },
                    {
                        "option": "选项二",
                        "score": "3"
                    },
                    {
                        "option": "选项三",
                        "score": "2"
                    },
                    {
                        "option": "选项四",
                        "score": "1"
                    }
                ],
                "mold_id": 1,
                "type_id": 1
            },
            {
                "id": 3,
                "title": "test",
                "option_score_obj": [
                    {
                        "option": "选项一",
                        "score": "4"
                    },
                    {
                        "option": "选项二",
                        "score": "3"
                    },
                    {
                        "option": "选项三",
                        "score": "2"
                    },
                    {
                        "option": "选项四",
                        "score": "1"
                    }
                ],
                "mold_id": 1,
                "type_id": 1
            },
            {
                "id": 4,
                "title": "test",
                "option_score_obj": [
                    {
                        "option": "选项一",
                        "score": "4"
                    },
                    {
                        "option": "选项二",
                        "score": "3"
                    },
                    {
                        "option": "选项三",
                        "score": "2"
                    },
                    {
                        "option": "选项四",
                        "score": "1"
                    }
                ],
                "mold_id": 1,
                "type_id": 1
            },
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
    }
}
   * 
   */
  async detailScore() {
    const { ctx, service } = this;
    let checkRes = checkData(ctx, "id");
    if (checkRes.is_pass) {
      let query = ctx.query;
      ctx.body = await service.paper.detailScore(query);
    } else {
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }

  

  /**
   * @api {Put} api/paper/update 更新试卷
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
      let body = ctx.request.body;
      ctx.body = await service.paper.update(body);
    } else {
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }

  /**
   * @api {Delete} api/paper/del 删除试卷
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
      let query = ctx.query;
      ctx.body = await service.paper.del(query);
    } else {
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }
}

module.exports = PaperController;
