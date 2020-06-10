const Service = require('egg').Service;
const { _pwd } = require("../utils/cryp");
const { _setRedis } = require("../utils/redisModel");

class loginService extends Service {
  async login() {
    const {PUser,PRole}=this.app.model.Tables;
    
    // const loginRes = await service.common.get("p_user", {
    //   account: ctx.request.body.account,
    //   password: ctx.request.body.password,
    // });
    const loginRes = await PUser.findOne({
      where:{
        account: this.ctx.request.body.account,
        password: this.ctx.request.body.password,
        status:1
      },
      include:[{
        model:PRole,
        attributes:["id", "name"],
        as:"roles"
      }]
    });

    
    if (loginRes) {
      
      const time = Date.now();
      const { id, account ,name, roles, avatar } = loginRes.dataValues;
      const { password: token } = new _pwd(id + time);
      _setRedis(token, {
        userInfo: { account,name, roles, avatar },
        
        id,
        time,
      });
      this.ctx.status=200;
      return new this.ctx.helper._success({ token, roles });
    } else {
      this.ctx.status=400;
      return new this.ctx.helper._error("账号或密码错误");
    }
    
    // return await this.app.mysql.get("p_user", { account, password });
  }
}

module.exports = loginService;