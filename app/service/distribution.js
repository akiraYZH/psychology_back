const Service = require("egg").Service;
const Op = require("sequelize").Op;

class DistributionService extends Service {
  async add(data) {
    const { ctx } = this;
    const { PPaperUser } = this.app.model.Tables;
    try {
      data.time_stamp = Date.now();
      let result = await PPaperUser.create(data);
      console.log(result);
      if (result) {
        ctx.status = 200;
        return new ctx.helper._success({ insertId: result.id });
      }
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  // ctx.request.body.list.forEach((item) => (item.time_stamp = Date.now()));
  //     console.log(ctx.request.body.list);

  //     let result = await service.common.multiInsert(
  //       "p_paper_user",
  //       ctx.request.body.list
  //     );
  //     if (result.affectedRows) {
  //       ctx.body = new this.ctx.helper._success();
  //     } else {
  //       ctx.body = new this.ctx.helper._error();
  //     }

  async multiInsert(data) {
    const { ctx } = this;
    try {
      ctx.request.body.list.forEach((item) => (item.time_stamp = Date.now()));

      let result = await this.service.common.multiInsert(
        "p_paper_user",
        data.list
      );
      if (result.affectedRows) {
        this.ctx.status = 200;
        return new this.ctx.helper._success();
      } else {
        this.ctx.status = 500;
        return new this.ctx.helper._error();
      }
    } catch (error) {
      // console.log(error.errors);
      this.ctx.status = 500;
      return new this.ctx.helper._error(error);
    }
  }

  async getList(data) {
    const { ctx, service } = this;
    const { PPaperUser, PUser, PPaper } = this.app.model.Tables;
    try {
      let result = await ctx.helper.selectWithPagging(PPaperUser, {
        attributes: ["id", "time_stamp", "state"],
        where: {
          status: 1,
          user_id: data.user_id,
          distributor_id: data.distributor_id,
          paper_id: data.paper_id,
          state:data.state
        },
        offset: Number(data.now_page)
          ? (Number(data.now_page) - 1) * Number(data.now_page)
          : 0,
        limit: Number(data.num_in_page) || 10,
        include: [
          {
            model: PUser,
            require: false,
            as: "user",
            attributes:["id","account","name"],
            where:{
              name:{[Op.like]:`%${data.name}%`},
              account:{[Op.like]:`%${data.account}%`}

            }
          },
          {
            model: PUser,
            require: false,
            attributes:["id","account","name"],
            as: "distributor",
          },
          {
            model:PPaper,
            require:false,
            attributes:["id","title","time_stamp"],
            as:"paper"
           }
        ],
      });
      console.log(result);

      if (result.data.length) {
        ctx.status = 200;
        return Object.assign(new ctx.helper._success(),result);
      } else {
        ctx.status = 404;
        return new ctx.helper._error("暂无数据");
      }
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async update(data) {
    const { ctx } = this;
    const { PPaperUser } = this.app.model.Tables;
    try {
      let condition = { id: data.id, status: 1 };
      delete data.id;
      let result = await PPaperUser.update(data, { where: condition });
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
    const { PPaperUser } = this.app.model.Tables;
    try {
      let condition = { id: data.id, status: 1 };
      let result = await PPaperUser.update(
        { status: 0 },
        { where: condition }
      );
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

module.exports = DistributionService;
