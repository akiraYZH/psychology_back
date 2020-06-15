"use strict";

const Controller = require("egg").Controller;
const checkData = require("../utils/checkData2");
class DistributionController extends Controller {
  /**
   * @api {Post} /api/distribution/add 分配试卷
   * @apiGroup Distribution
   * @apiParam {Number} user_id 用户id
   * @apiParam {Number} distributor_id 分发人id
   * @apiParam {Number} paper_id 试卷id
   * 
   * 
   * @apiSuccessExample 成功返回
   {
    code:1,
    msg:'成功操作'
    }
   * 
   */
 
    /**apidoc
     * 
     */
  async add() {
    const { ctx, service } = this;
    let checkRes = checkData(ctx, "user_id", "paper_id", "distributor_id");
    if (checkRes.is_pass) {
      let body = ctx.request.body;
      ctx.body = await service.distribution.add(body);
    } else {
      ctx.status=400;
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }

  /**
   * @api {Post} /api/distribution/multiAdd 批量分配试卷
   * @apiGroup Distribution
   * @apiParam {Array} list 分配数组
   * @apiParam {Number} user_id 用户id
   * @apiParam {Number} distributor_id 分发人id
   * @apiParam {Number} paper_id 试卷id
   * @apiParamExample 参数模版
   * {
	"list":[
		{
			"user_id":6,
			"distributor_id":2,
			"paper_id":2
		},
		{
			"user_id":6,
			"distributor_id":2,
			"paper_id":2
		},
		{
			"user_id":6,
			"distributor_id":2,
			"paper_id":2
		}
		]
}
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
    let checkRes = checkData(ctx, "list");
    if (checkRes.is_pass) {
      let body = ctx.request.body;
      ctx.body = await service.distribution.multiInsert(body);
    } else {
      ctx.status=400;
      ctx.body = new this.ctx.helper._lack(checkRes.msg);
    }
  }



  /**
   * @api {Get} /api/distribution/getList 获得分配试卷列表
   * @apiGroup Distribution
   * @apiParam {Number} user_id (可选)精确搜索：用户id
   * @apiParam {Number} distributor_id (可选)精确搜索：分发者id
   * @apiParam {Number} paper_id (可选)精确搜索：试卷id
   * @apiParam {Number} state (可选)精确搜索：1:完成， 0：未完成
   * @apiParam {String} user_account (可选)模糊搜索：用户账号
   * @apiParam {String} user_name (可选)模糊搜索：用户名称
   * @apiParam {Number} page_now (可选)现处页
   * @apiParam {Number} num_in_page (可选)每页个数
   * 
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 5,
            "time_stamp": "1592218451862",
            "state": 0,
            "user": {
                "id": 6,
                "account": "visitor15",
                "name": null
            },
            "distributor": {
                "id": 2,
                "account": "664753092",
                "name": null
            },
            "paper": {
                "id": 1,
                "title": "试卷一",
                "time_stamp": "1591960228598"
            }
        },
        {
            "id": 6,
            "time_stamp": "1592218451862",
            "state": 0,
            "user": {
                "id": 6,
                "account": "visitor15",
                "name": null
            },
            "distributor": {
                "id": 2,
                "account": "664753092",
                "name": null
            },
            "paper": {
                "id": 1,
                "title": "试卷一",
                "time_stamp": "1591960228598"
            }
        },
        {
            "id": 7,
            "time_stamp": "1592218451862",
            "state": 0,
            "user": {
                "id": 6,
                "account": "visitor15",
                "name": null
            },
            "distributor": {
                "id": 2,
                "account": "664753092",
                "name": null
            },
            "paper": {
                "id": 1,
                "title": "试卷一",
                "time_stamp": "1591960228598"
            }
        },
        {
            "id": 8,
            "time_stamp": "1592218515142",
            "state": 0,
            "user": {
                "id": 6,
                "account": "visitor15",
                "name": null
            },
            "distributor": {
                "id": 2,
                "account": "664753092",
                "name": null
            },
            "paper": {
                "id": 1,
                "title": "试卷一",
                "time_stamp": "1591960228598"
            }
        },
        {
            "id": 9,
            "time_stamp": "1592218515142",
            "state": 0,
            "user": {
                "id": 6,
                "account": "visitor15",
                "name": null
            },
            "distributor": {
                "id": 2,
                "account": "664753092",
                "name": null
            },
            "paper": {
                "id": 1,
                "title": "试卷一",
                "time_stamp": "1591960228598"
            }
        },
        {
            "id": 10,
            "time_stamp": "1592218515142",
            "state": 0,
            "user": {
                "id": 6,
                "account": "visitor15",
                "name": null
            },
            "distributor": {
                "id": 2,
                "account": "664753092",
                "name": null
            },
            "paper": {
                "id": 1,
                "title": "试卷一",
                "time_stamp": "1591960228598"
            }
        }
    ],
    "pagging": {
        "size": 10,
        "current": 1,
        "total": 6
    }
}
   * 
   */
  async getList() {
    const { ctx, service } = this;
    let query = ctx.query;
    ctx.body = await service.distribution.getList(query);

  }

  /**
   * @api {Put} /api/distribution/update 修改分配
   * @apiGroup Distribution
   * @apiParam {Number} id 分配id
   * @apiParam {Number} state 1:完成， 0：未完成
   * 
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作"
}
   * 
   */
  async update() {
    const { ctx, service } = this;
    let checkDataRes = checkData(
      ctx,
      "id",
      "state"
    );
    if (checkDataRes.is_pass) {
      if (ctx.request.body.state == 1 || ctx.request.body.state == 0) {
        let body = ctx.request.body;
        ctx.body = await service.distribution.update(body);
      } else {
        ctx.status=400;
        ctx.body = new this.ctx.helper._lack("state只能为1或0");
      }
    } else {
      ctx.status=400;
      ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
   * @api {Delete} /api/distribution/del 删除分配
   * @apiGroup Distribution
   * @apiParam {Number} id 分配id
   * 
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作"
}
   * 
   */
  async del() {
    const { ctx, service } = this;
    let checkDataRes = checkData(ctx, "id");
    if (checkDataRes.is_pass) {
      
        let query = ctx.query;
        ctx.body = await service.distribution.del(query);
    } else {
      ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = DistributionController;
