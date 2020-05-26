"use strict";

const Controller = require("egg").Controller;
console.log(123);
const checkData = require("../utils/checkData2");
class MessageController extends Controller {
  /**
   * @api {Post} /api/msg/add 增加站内信息
   * @apiGroup message
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作",
    "data": {
        "insertId": 3
    }
}
   * 
   */
  async add() {
    const { ctx, service } = this;
    console.log("msg add");

    let checkDataRes = checkData(ctx, "from_id", "to_id", "content");
    if (checkDataRes.is_pass) {
      let result = await service.common.insert("p_msg", {
        from_id: ctx.request.body.from_id,
        to_id: ctx.request.body.to_id,
        content: ctx.request.body.content,
      });
      if (result.affectedRows) {
        ctx.body = new ctx.helper._success({ insertId: result.insertId });
      } else {
        ctx.body = new ctx.helper._error("暂无数据");
      }
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
   * @api {Post} /api/msg/getList 获得站内信息
   * @apiGroup message
   * @apiParam {Number} from_id （可选）精准查询:来源用户id， 系统为-1
   * @apiParam {Number} to_id （可选）精确查询：目标用户id
   * @apiParam {Number} state （可选）精确查询：1:为未读， 0:为已读
   * @apiParam {String} from_name （可选）模糊查询：来源用户昵称
   * @apiParam {String} from_account （可选）模糊查询：来源用户账号
   * @apiParam {String} to_name （可选）模糊查询：目标用户昵称
   * @apiParam {Number} page_now （可选）当前页，默认为1
   * @apiParam {Number} num_in_page （可选）页面内显示个数，默认为10
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作",
    "data": {
        "is_success": true,
        "page_total": 1,
        "page_now": 1,
        "num_in_page": 10,
        "list": [
            {
                "id": 1,
                "from_id": -1,
                "from_account": "system",
                "from_name": "系统消息",
                "to_id": 1,
                "to_name": "admin",
                "content": "test message",
                "state": 0
            },
            {
                "id": 2,
                "from_id": 2,
                "from_account": "doctor",
                "from_name": "editor",
                "to_id": 1,
                "to_name": "admin",
                "content": "test message",
                "state": 1
            },
            {
                "id": 3,
                "from_id": -1,
                "from_account": "system",
                "from_name": "系统消息",
                "to_id": 1,
                "to_name": "admin",
                "content": "test message",
                "state": 1
            }
        ]
    }
}
   * 
   */
  async getList() {
    const { ctx, service } = this;
    console.log("msg add");

    // let checkDataRes = checkData(ctx, "", "to_id", "content");
    let result = await service.common.selectPaginationJoin({
      db: "p_msg m",
      param: {
        "m.from_id": ctx.request.body.from_id,
        "m.to_id": ctx.request.body.to_id,
        "m.state": ctx.request.body.state,
        page_now: ctx.request.body.page_now,
        num_in_page: ctx.request.body.num_in_page,
        "m.status": 1,
      },
      columns: [
        "m.id",
        "m.from_id",
        "IF((m.from_id=-1),('system'),(u1.account)) AS from_account",
        "IF((m.from_id=-1),('系统消息'),(u1.name)) AS from_name",
        "m.to_id",
        "u2.name AS to_name",
        "m.content",
        "m.state",
      ],
      search: {
        from_account: ctx.request.body.from_account,
        from_name: ctx.request.body.from_name,
        to_name: ctx.request.body.to_name,
      },
      joins: [
        "LEFT JOIN p_user u1 ON m.from_id=u1.id",
        "LEFT JOIN p_user u2 ON m.to_id=u2.id",
      ],
    });

    if (result.is_success) {
      ctx.body = new ctx.helper._success(result);
    } else {
      ctx.body = new ctx.helper._error("暂无数据");
    }
  }

  /**
   * @api {Post} /api/msg/update 修改站内信息
   * @apiGroup message
   * @apiParam {Number} id 信息id
   * @apiParam {Number} from_id 来源用户id， 系统为-1
   * @apiParam {Number} to_id 目标用户id
   * @apiParam {Number} state 1:为未读， 0:为已读
   * @apiParam {String} content 信息内容
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作"
}
   * 
   */
  async update() {
    const { ctx, service } = this;
    console.log("msg add");

    let checkDataRes = checkData(
      ctx,
      "id",
      "from_id",
      "to_id",
      "content",
      "state"
    );
    if (checkDataRes.is_pass) {
        let result = await service.common.update(
            "p_msg",
            {
              from_id: ctx.request.body.from_id,
              to_id: ctx.request.body.to_id,
              content: ctx.request.body.content,
              state: ctx.request.body.state,
            },
            {
              id: ctx.request.body.id,
              status: 1,
            }
          );
      if (result.affectedRows) {
        ctx.body = new ctx.helper._success();
      } else {
        ctx.body = new ctx.helper._error();
      }
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }

  /**
   * @api {Post} /api/msg/del 删除站内信息
   * @apiGroup message
   * @apiParam {Number} id 信息id
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作"
}
   * 
   */
  async del() {
    const { ctx, service } = this;

    let checkDataRes = checkData(
      ctx,
      "id"
    );
    if (checkDataRes.is_pass) {
      let result = await service.common.update(
        "p_msg",
        {
          status: 0,
        },
        {
          id: ctx.request.body.id
        }
      );
      if (result.affectedRows) {
        ctx.body = new ctx.helper._success();
      } else {
        ctx.body = new ctx.helper._error();
      }
    } else {
      ctx.body = new ctx.helper._lack(checkDataRes.msg);
    }
  }
}

module.exports = MessageController;
