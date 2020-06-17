const Service = require("egg").Service;
const Op = require("sequelize").Op;

class UserService extends Service {
  async userInfo() {
    const token = this.ctx.headers.token;
    console.log(token);

    try {
      const redisData = await this.ctx.helper._getRedis(token);

      this.ctx.status = 200;
      return new this.ctx.helper._success({
        token: token,
        roles: redisData.userInfo.roles.name,
      });
    } catch (e) {
      this.ctx.status = 401;
      return new this.ctx.helper._notLogin();
    }
  }

  async userDetail() {
    const { PUser, PRole,PPermission } = this.app.model.Tables;
    console.log(this.ctx.headers);

    const token = this.ctx.headers["x-token"];
    let redisData = "";
    try {
      redisData = await this.ctx.helper._getRedis(token);
    } catch (e) {
      this.ctx.status = 401;
      return new this.ctx.helper._notLogin();
    }

    console.log(redisData);

    const result = await PUser.findOne({
      where: {
        account: redisData.userInfo.account,
        status: 1,
      },
      include: [
        {
          model: PRole,
          attributes: ["id", "name"],
          as: "roles",
          include: {
            model: PPermission,
            attributes: ["id", "name", "apis"],
            where: {
              status: 1,
            },
            required: false,
            as: "permissions",
            attributes:["id","name"]
          },
        },
      ],
    });
    console.log(result.dataValues);

    if (result) {
      const {
        id,
        roles,
        account,
        password,
        name,
        gender,
        birthday,
        phone,
        avatar,
        is_marry,
        job,
        urgent_name,
        urgent_relation,
        urgent_phone,
        visitor_id,
      } = result.dataValues;
      // console.log(roles);

      if (
        roles.dataValues.name == "admin" ||
        roles.dataValues.name == "doctor" ||
        roles.dataValues.name == "worker"
      ) {
        this.ctx.status = 200;
        return new this.ctx.helper._success({
          id,
          roles,
          account,
          password,
          gender,
          name,
          birthday,
          phone,
          avatar,
        });
      } else {
        this.ctx.status = 200;
        return new this.ctx.helper._success({
          id,
          roles,
          account,
          password,
          name,
          gender,
          birthday,
          phone,
          avatar,
          is_marry,
          job,
          urgent_name,
          urgent_relation,
          urgent_phone,
          visitor_id,
        });
      }
    } else {
      this.ctx.status = 500;
      return new this.ctx.helper._error("获得用户信息失败");
    }
  }

  async userList() {
    const { ctx, service } = this;
    const { PUser, PRole } = this.app.model.Tables;

    try {
      const result = await ctx.helper.selectWithPagging(PUser, {
        where: {
          role_id: ctx.query.role_id,
          account: { [Op.like]: `%${ctx.query.account}%` },
          status: 1,
        },
        attributes: ["account", "name", "gender"],
        offset: Number(ctx.query.now_page)
          ? (Number(ctx.query.now_page) - 1) * Number(ctx.query.now_page)
          : 0,
        limit: Number(ctx.query.num_in_page) || 10,
        include: {
          model: PRole,
          attributes: ["id", "name"],
          as: "roles",
        },
      });
      ctx.status = 200;
      let template = new ctx.helper._success();
      return Object.assign(template, result);
    } catch (e) {
      console.log(e);

      this.ctx.status = 500;
      return new this.ctx.helper._error();
    }
  }

  async register() {
    const { PUser } = this.app.model.Tables;
    try {
      const result = await PUser.create(this.ctx.request.body);
      // console.log(result.dataValues.id);
      this.ctx.status = 200;
      return new this.ctx.helper._success("成功注册", {
        insertId: result.dataValues.id,
      });
    } catch (error) {
      // console.log(error.errors);
      this.ctx.status = 500;
      return new this.ctx.helper._error(error.name);
    }
  }

  async multiInsert() {
    try {
      let result = await this.service.common.multiInsert(
        "p_user",
        this.ctx.request.body.exList
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

  async userChange() {
    let { PUser } = this.app.model.Tables;
    let { ctx } = this;
    let condition = {
      id: ctx.request.body.id,
      status: 1,
    };
    delete ctx.request.body.id;
    (ctx.request.body.status || ctx.request.body.status == 0) &&
      delete ctx.request.body.status;

    try {
      let result = await PUser.update(ctx.request.body, { where: condition });
      console.log(result);
      if (result[0] > 0) {
        ctx.status = 200;
        return new this.ctx.helper._uccess("成功修改");
      } else {
        ctx.status = 400;
        return new this.ctx.helper._error("没有改动");
      }
    } catch (error) {
      // console.log(error.errors);
      this.ctx.status = 500;
      return new this.ctx.helper._error(error);
    }
  }

  async userDel() {
    let { PUser } = this.app.model.Tables;
    let { ctx } = this;
    let condition = {
      id: ctx.query.id,
    };
    let result = await PUser.update(
      {
        status: 0,
      },
      { where: condition }
    );
    if (result[0] > 0) {
      ctx.status = 200;
      return new this.ctx.helper._success("成功删除");
    } else {
      ctx.status = 500;
      return new this.ctx.helper._error("删除失败");
    }
  }
  catch(error) {
    // console.log(error.errors);
    this.ctx.status = 500;
    return new this.ctx.helper._error(error);
  }
}

module.exports = UserService;
