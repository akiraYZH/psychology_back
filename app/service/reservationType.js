const Service = require("egg").Service;

class ReservationTypeService extends Service {
  async add() {
    const { ctx } = this;
    const { PReservationType } = this.app.model.Tables;
    try {
      let result = await PReservationType.create(ctx.request.body);
      console.log(result);
      if (result) {
        ctx.status = 200;
        return new ctx.helper._success({ insertId: result.id });
      }
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async getList() {
    const { ctx, service } = this;
    const { PReservationType } = this.app.model.Tables;
    try {
      let result = await PReservationType.findAll({ 
          attributes:["id","type_name","description"],
          where: { status: 1 } 
        });
        console.log(result);
        
      if (result.length) {
        ctx.status=200;
        return new ctx.helper._success(result);
      } else {
        ctx.status=404;
        return new ctx.helper._error("暂无数据");
      }
    }catch(error){
        ctx.status = 500;
        return new ctx.helper._error(error);
    }
  }

  async update(data) {
    const { ctx } = this;
    const { PReservationType } = this.app.model.Tables;
    try {
      let condition = { id: data.id };
      delete data.id;
      let result = await PReservationType.update(data, { where: condition });
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
    const { PReservationType } = this.app.model.Tables;
    try {
      let condition = { id: data.id };
      let result = await PReservationType.update({ status: 0 }, { where: condition });
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

module.exports = ReservationTypeService;
