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
      let result = await service.common.insert("p_paper_user", {
        user_id: ctx.request.body.user_id,
        paper_id: ctx.request.body.paper_id,
        distributor_id: ctx.request.body.distributor_id,
        time_stamp: Date.now(),
      });
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
      ctx.request.body.list.forEach((item) => (item.time_stamp = Date.now()));
      console.log(ctx.request.body.list);

      let result = await service.common.multiInsert(
        "p_paper_user",
        ctx.request.body.list
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
   * @api {Post} /api/distribution/getList 获得分配试卷列表
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
      ctx.request.body.list.forEach((item) => (item.time_stamp = Date.now()));
      console.log(ctx.request.body.list);

      let result = await service.common.multiInsert(
        "p_paper_user",
        ctx.request.body.list
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
   * @api {Post} /api/distribution/getList 获得分配试卷列表
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
    "data": {
        "is_success": true,
        "page_total": 9,
        "page_now": 1,
        "num_in_page": 2,
        "list": [
            {
                "id": 1,
                "user_id": 6,
                "user_account": "visitor1",
                "user_name": "visitor",
                "distributor_id": 2,
                "distributor_name": "editor",
                "time_stamp": "1589427873139",
                "state": 0
            },
            {
                "id": 2,
                "user_id": 6,
                "user_account": "visitor1",
                "user_name": "visitor",
                "distributor_id": 2,
                "distributor_name": "editor",
                "time_stamp": "1589427900477",
                "state": 0
            }
        ]
    }
}
   * 
   */
  async getList() {
    const { ctx, service } = this;

    let result = await service.common.selectPagination2({
      db: "p_paper_user pu",
      param: {
        "pu.status": 1,
        "pu.user_id": ctx.request.body.user_id,
        "pu.distributor_id": ctx.request.body.distributor_id,
        "pu.paper_id": ctx.request.body.paper_id,
        "pu.state": ctx.request.body.state,
        page_now: ctx.request.body.page_now,
        num_in_page: ctx.request.body.num_in_page,
      },
      columns: [
        "pu.id",
        "pu.user_id",
        "u1.account AS user_account",
        "u1.name AS user_name",
        "pu.distributor_id",
        "u2.name AS distributor_name",
        "pu.time_stamp",
        "pu.state",
      ],
      search: {
        "u1.account": ctx.request.body.user_account,
        "u1.name": ctx.request.body.user_name,
      },
      joins: ["p_user u1", "p_user u2"],
      ons: ["pu.user_id=u1.id", "pu.distributor_id=u2.id"],
    });
    // console.log(result);

    if (result.is_success) {
      ctx.body = new this.ctx.helper._success(result);
    } else {
      ctx.body = new this.ctx.helper._error();
    }
  }

  /**
   * @api {Post} /api/distribution/update 获得分配
   * @apiGroup Distribution
   * @apiParam {Number} id 分配id
   * @apiParam {Number} user_id 用户id
   * @apiParam {Number} distributor_id 分发者id
   * @apiParam {Number} paper_id 试卷id
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
      "user_id",
      "distributor_id",
      "paper_id",
      "state"
    );
    if (checkDataRes.is_pass) {
      if (ctx.request.body.state == 1 || ctx.request.body.state == 0) {
        let result = await service.common.update(
          "p_paper_user",
          {
            user_id: ctx.request.body.user_id,
            distributor_id: ctx.request.body.distributor_id,
            paper_id: ctx.request.body.paper_id,
            state: ctx.request.body.state,
          },
          { id: ctx.request.body.id }
        );
        // console.log(result);

        if (result.affectedRows) {
          ctx.body = new this.ctx.helper._success();
        } else {
          ctx.body = new this.ctx.helper._error();
        }
      } else {
        ctx.body = new this.ctx.helper._lack("state只能为1或0");
      }
    } else {
      ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
   * @api {Post} /api/distribution/del 删除分配
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
      
        let result = await service.common.update(
          "p_paper_user",
          {
            status: 0
          },
          { id: ctx.request.body.id }
        );
        // console.log(result);

        if (result.affectedRows) {
          ctx.body = new this.ctx.helper._success();
        } else {
          ctx.body = new this.ctx.helper._error();
        }
    } else {
      ctx.body = new this.ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = DistributionController;
