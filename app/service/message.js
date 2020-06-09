const Service = require("egg").Service;

class MessageService extends Service {
  async add() {
    const { ctx } = this;
    const { PMsg } = this.app.model.Tables;
    try {
      let result = await PMsg.create(ctx.request.body);
      console.log(result);
      if (result) {
        ctx.status = 200;
        return new ctx.helper._success(result);
      }
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async getList() {
    const { ctx, service } = this;
    console.log("msg add");

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
      return new ctx.helper._success(result);
    } else {
      return new ctx.helper._error("暂无数据");
    }
  }

  async update(data) {
    const { ctx } = this;
    const { PMsg } = this.app.model.Tables;
    try {
      let condition = { id: data.id };
      delete data.id;
      let result = await PMsg.update(data, { where: condition });
      console.log(result);

      if (result[0] > 0) {
        ctx.status = 200;
        return new ctx.helper._success();
      } else {
        ctx.status = 404;
        return new ctx.helper._error("没有修改");
      }
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async del(data) {
    const { ctx } = this;
    const { PMsg } = this.app.model.Tables;
    try {
      let condition = { id: data.id };
      let result =  await PMsg.update({status:0}, { where: condition });
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

module.exports = MessageService;
