"use strict";

const Controller = require("egg").Controller;
const rolesList = require("../utils/rolesList");
const checkData = require("../utils/checkData2");

class ExeciseController extends Controller {
  /**
   * @api {Post} /api/exercise/add 增加题目
   * @apiGroup Exercise
   * @apiParam {String} title 问题题目
   * @apiParam {Array} option_obj 选项数组
   * @apiParam {Array} score_obj 分值数组
   * @apiParam {Number} type_id 问题类型：2躯体化，3强迫症状，4人际关系敏感，5抑郁，6焦虑，7敌对，8恐怖，9偏执，10精神病性，11其他
   * @apiParamExample 参数模版
   {
    "title":"test",
    "option_obj":["选项一","选项二","选项三","选项四"],
    "score_obj":["4","3","2","1"],
    "type_id":1
   }
   * 
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
    let checkRes = checkData(
      ctx,
      "title",
      "option_obj",
      "score_obj",
      "type_id"
    );
    if (checkRes.is_pass) {
      let body = ctx.request.body;
      ctx.body = await service.exercise.add(body);
    } else {
      ctx.status=400;
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }

  /**
   * @api {Post} /api/exercise/multiAdd 增加多条题目（excel）
   * @apiGroup Exercise
   * @apiParam {Array} exList 问题列表
   * @apiParam {String} title 问题题目
   * @apiParam {Array} option_obj 选项数组
   * @apiParam {Array} score_obj 分值数组
   * @apiParam {Number} type_id 问题类型：2躯体化，3强迫症状，4人际关系敏感，5抑郁，6焦虑，7敌对，8恐怖，9偏执，10精神病性，11其他
   * @apiParamExample 参数模版
   {
      "exList":[
        {
          "title":"test",
          "option_obj":["option1","option2","option3","option4"],
          "score_obj":["4","3","2","1"],
          "type_id":1},
        {
          "title":"test",
          "option_obj":["option1","option2","option3","option4"],
          "score_obj":["4","3","2","1"],
          "type_id":1
        }]
    }
   * 
   * 
   * @apiSuccessExample 成功返回
   {
    code:1,
    msg:'成功操作'
    }
   * 
   */
  async multiAdd() {
    const { ctx, service } = this;
    let checkRes = checkData(ctx, "exList");
    if (checkRes.is_pass) {
      let body = ctx.request.body;
      ctx.body = await service.exercise.multiAdd(body);
    } else {
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }

  /**
   * @api {Post} /api/exercise/getList 获得题目列表
   * @apiGroup Exercise
   * @apiParam {Number} type_id （可选）题目类型id--精确查询：2躯体化，3强迫症状，4人际关系敏感，5抑郁，6焦虑，7敌对，8恐怖，9偏执，10精神病性，11其他
   * @apiParam {String} title （可选）问题题目--模糊查询
   * @apiParam {Number} page_now （可选）现处页数
   * @apiParam {Number} num_in_page （可选）每页个数
   * 
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 1,
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
        },
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
        },
        {
            "id": 7,
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
        },
        {
            "id": 8,
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
    "pagging": {
        "size": 10,
        "current": 1,
        "total": 8
    }
}
   * 
   */
  async getList() {
    const { ctx, service } = this;
    let query = ctx.query;
    ctx.body = await service.exercise.getList(query);
  }
 

  /**
   * @api {Post} /api/exercise/update 修改题目
   * @apiGroup Exercise
   * @apiParam {Number} id 问题id
   * @apiParam {String} title 问题题目
   * @apiParam {Array} option_obj 选项数组
   * @apiParam {Array} score_obj 分值数组
   * @apiParam {Number} type_id 问题类型：2躯体化，3强迫症状，4人际关系敏感，5抑郁，6焦虑，7敌对，8恐怖，9偏执，10精神病性，11其他
   * @apiParamExample 参数模版
   {
    "id":"2",
	"title":"test",
	"option_obj":["问题一","问题二","问题三","问题四"],
	"score_obj":["4","3","2","1"],
	"type_id":1
}
   * 
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
    let checkRes = checkData(
      ctx,
      "id",
      "title",
      "option_obj",
      "score_obj",
      "type_id"
    );
    if (checkRes.is_pass) {
      let body = ctx.request.body;
      ctx.body = await service.exercise.update(body);
    } else {
      ctx.status=400;
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }

  /**
   * @api {Post} /api/exercise/del 删除题目
   * @apiGroup Exercise
   * @apiParam {Number} id 问题id
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

    if (checkDataRes) {
      let query = ctx.query;
      ctx.body = await service.exercise.del(query);
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataMsg);
    }
  }
}

module.exports = ExeciseController;

