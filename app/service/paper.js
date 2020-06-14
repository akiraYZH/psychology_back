const Service = require("egg").Service;
const Op = require("sequelize").Op;

class PaperService extends Service {
  async add(data) {
    const { ctx } = this;
    const { PPaper } = this.app.model.Tables;
    try {
      data.time_stamp = Date.now();
      data.exercises_json = JSON.stringify(data.exercises_json);
      let result = await PPaper.create(data);
      if (result) {
        ctx.status = 200;
        return new ctx.helper._success({ insertId: result.id });
      }
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async getList(data) {
    const { ctx, app } = this;
    const { PPaper,PUser } = this.app.model.Tables;
    try {
      let result = await ctx.helper.selectWithPagging(PPaper, {
        where: {
          title: { [Op.like]: `%${data.title}%` },
          time_stamp: {
            [Op.gt]: data.start_time,
            [Op.lt]: data.end_time,
          },
        },
        offset: Number(data.now_page)
          ? (Number(data.now_page) - 1) * Number(data.now_page)
          : 0,
        limit: Number(data.num_in_page) || 10,
        include:{
          model:PUser,
          required:false,
          where:{
            name: { [Op.like]: `%${data.name}%` },
          },
          attributes:["id","account","name"]
        }
      });

      ctx.status = 200;
      return new ctx.helper._success(result);
    
      // if (result) {
      //   ctx.status = 200;
      //   return new ctx.helper._success(result);
      // }
    } catch (error) {
      console.log(error);
      
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async detailAdmin(aIds) {
    let sql = `SELECT id, title, option_score_obj, mold_id, type_id FROM p_exercises WHERE 1=1`;
    let conditions = "";

    conditions += " AND (" + aIds.join(" OR id=") + ")";
    conditions += " AND status=1";
    sql += conditions;
    console.log(sql);

    return await this.app.mysql.query(sql);
  }

  async detail(aIds) {
    let sql = `SELECT id, title, option_obj, mold_id, type_id FROM p_exercises WHERE 1=1`;
    let conditions = "";

    conditions += " AND (" + aIds.join(" OR id=") + ")";
    conditions += " AND status=1";
    sql += conditions;
    console.log(sql);

    return await this.app.mysql.query(sql);
  }

  async list() {
    let sql = `SELECT p.id, p.title, p.worker_id, u.name, p.time_stamp FROM p_paper p INNER JOIN p_user u ON  p.worker_id=u.id`;

    console.log(sql);

    return await this.app.mysql.query(sql);
  }
}

module.exports = PaperService;
