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
    "data": {
        "is_success": true,
        "page_total": 3,
        "page_now": 1,
        "num_in_page": 1,
        "list": [
            {
                "id": 2,
                "title": "test",
                "option_score_obj": [
                    {
                        "question": "选项1",
                        "score": "4"
                    },
                    {
                        "question": "选项2",
                        "score": "3"
                    },
                    {
                        "question": "选项3",
                        "score": "2"
                    },
                    {
                        "question": "选项4",
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
  async getList() {
    const { ctx, service } = this;
    let query = ctx.query;
    ctx.body = await service.exercise.getList(query);
  }
  // async getList() {
  //   const { ctx, service } = this;
  //   let aTypes = await service.common.select("p_type","", ["id","name"]);
  //   // console.log(ctx.query.roles)
  //   let result = null;
  //   if (ctx.request.body.type_id) {
  //     //按照类型精准查询
  //     result = await service.common.selectPagination(
  //       "p_exercises",
  //       {
  //         type_id: ctx.request.body.type_id,
  //         status: 1,
  //         page_now: ctx.request.body.page_now,
  //         num_in_page: ctx.request.body.num_in_page,
  //       },
  //       ["id", "title", "option_score_obj", "mold_id", "type_id"]
  //     );
  //   } else if (ctx.request.body.title) {
  //     //根据题目模糊查询
  //     result = await service.common.selectPagination(
  //       "p_exercises",
  //       {
  //         title: ctx.request.body.title,
  //         status: 1,
  //         page_now: ctx.request.body.page_now,
  //         num_in_page: ctx.request.body.num_in_page,
  //       },
  //       ["id", "title", "option_score_obj", "mold_id", "type_id"],
  //       true
  //     );
  //   } else {
  //     result = await service.common.selectPagination(
  //       "p_exercises",
  //       {
  //         status: 1,
  //         page_now: ctx.request.body.page_now,
  //         num_in_page: ctx.request.body.num_in_page,
  //       },
  //       ["id", "title", "option_score_obj", "mold_id", "type_id"]
  //     );
  //   }

  //   if (result.is_success) {
  //     result.list.forEach((item) => {
  //       item.option_score_obj = eval(item.option_score_obj);
  //       // console.log(aTypes);
        
  //       for(let i =0; i<aTypes.length; i++){
  //         if(item.type_id==aTypes[i].id){
            
  //           item.type_name=aTypes[i].name;
  //           break;
  //         }
  //       }
  //     });
  //     this.ctx.body = new this.ctx.helper._success(result);
  //   } else {
  //     this.ctx.body = new this.ctx.helper._error("查找不到数据");
  //   }
  // }

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
      if (
        ctx.request.body.option_obj.length == ctx.request.body.score_obj.length
      ) {
        let option_score_obj = [];
        let aOptions = ctx.request.body.option_obj;
        let aScores = ctx.request.body.score_obj;

        aOptions.forEach((item, index) => {
          option_score_obj.push({ question: item, score: aScores[index] });
        });

        let result = await service.common.update(
          "p_exercises",
          {
            title: ctx.request.body.title,
            option_obj: JSON.stringify(aOptions),
            score_obj: JSON.stringify(aScores),
            option_score_obj: JSON.stringify(option_score_obj),
            type_id: 1,
          },
          { id: ctx.request.body.id, status: 1 }
        );

        if (result.changedRows) {
          ctx.body = new this.ctx.helper._success();
        } else {
          ctx.body = new this.ctx.helper._error();
        }
      } else {
        ctx.body = new this.ctx.helper._error("有题目没有设置分数");
      }
    } else {
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
      let condition = {
        id: ctx.request.body.id,
      };
      let result = await service.common.update(
        "p_exercises",
        {
          status: 0,
        },
        condition
      );
      if (result.changedRows) {
        ctx.body = new this.ctx.helper._success("成功删除");
      } else if (result.msg) {
        this.ctx.body = new this.ctx.helper._error(result.msg);
      } else {
        this.ctx.body = new this.ctx.helper._error("删除失败");
      }
    } else {
      this.ctx.body = new this.ctx.helper._lack(checkDataMsg);
    }
  }
}

module.exports = ExeciseController;

