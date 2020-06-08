const Service = require("egg").Service;

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
    const { PUser,PRole } = this.app.model.Tables;
    const token = this.ctx.headers.token;
    let redisData = "";
    try {
      redisData = await this.ctx.helper._getRedis(token);
    } catch (e) {
      this.ctx.status = 401;
      return new this.ctx.helper._notLogin();
    }

    const result = await PUser.findOne({
      where: {
        account: redisData.userInfo.account,
        status: 1,
      },
      include:[{
          model:PRole,
          attributes:["id","name"],
          as:"roles"
      }]
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

      if (roles.dataValues.name == "admin" || roles.dataValues.name == "doctor" || roles.dataValues.name == "worker") {
        this.ctx.status=200;
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
        this.ctx.status=200;
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
        this.ctx.status=500;
        return new this.ctx.helper._error("获得用户信息失败");
    }
  }


  async userList() {
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
}

module.exports = UserService;