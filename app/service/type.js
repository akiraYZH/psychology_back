const Service = require("egg").Service;

class TypeService extends Service {
  async getList() {
    const { ctx } = this;
    const { PType } = this.app.model.Tables;
    let result = await PType.findAll({
      where: {
        status: 1,
      },
    });
    result = result.filter((item) => {
      if (item.name == "总分") {
        return false;
      } else {
        return true;
      }
    });

    if (result.length) {
      ctx.status = 200;
      return new ctx.helper._success(result);
    } else {
      ctx.status = 404;
      return new ctx.helper._error("暂无数据");
    }
  }
}

module.exports = TypeService;
