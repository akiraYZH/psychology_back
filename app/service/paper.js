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
    const { PPaper, PUser } = this.app.model.Tables;
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
        attributes: ["id", "title", "time_stamp"],
        include: {
          model: PUser,
          required: false,
          where: {
            name: { [Op.like]: `%${data.name}%` },
          },
          attributes: ["id", "account", "name"],
          as: "editor",
        },
      });

      ctx.status = 200;
      return Object.assign(new ctx.helper._success(), result);

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

  async detailScore(data) {
    const { ctx } = this;
    const { PPaper, PUser, PExercises } = this.app.model.Tables;
    try {
      let result = await PPaper.findOne({
        where: { id: data.id, status: 1 },
        attributes: ["id", "title", "exercises_json", "time_stamp"],
        include: {
          model: PUser,
          required: false,
          as: "editor",
          attributes: ["id", "account", "name"],
        },
      });

      
      result.exercises_json = eval(result.exercises_json);

      let aExercises = await PExercises.findAll({
        where:{
          id:{[Op.in]:result.exercises_json},
          status:1
        },
        attributes:["id","title","option_score_obj","mold_id","type_id"]
      })
      
      aExercises.forEach(item=>{
        item.option_score_obj=eval(item.option_score_obj);
      })
      
      delete result.dataValues.exercises_json;
      result.dataValues.exercises=aExercises;
      
      ctx.status=200;
      return new ctx.helper._success(result);
     
    } catch (error) {
      
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  // async detailAdmin(aIds) {
  //   let sql = `SELECT id, title, option_score_obj, mold_id, type_id FROM p_exercises WHERE 1=1`;
  //   let conditions = "";

  //   conditions += " AND (" + aIds.join(" OR id=") + ")";
  //   conditions += " AND status=1";
  //   sql += conditions;
  //   console.log(sql);

  //   return await this.app.mysql.query(sql);
  // }

  async update(data) {
    const { ctx } = this;
    const { PPaper } = this.app.model.Tables;
    try {
      let condition = {id:data.id, status:1};
      data.exercises_json=JSON.stringify(data.exercises_json);
      let result = await PPaper.update(data, {where:condition});
      if (result[0]>0) {
        ctx.status = 200;
        return new ctx.helper._success();
      }else{
        ctx.status = 400;
        return new ctx.helper._error("没有修改");
      }
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }


  async del(data) {
    const { ctx } = this;
    const { PPaper } = this.app.model.Tables;
    try {
      let condition = { id: data.id, status: 1 };
      let result = await PPaper.update({ status: 0 }, { where: condition });
      console.log(result);

      if (result[0] > 0) {
        ctx.status = 200;
        return new ctx.helper._success();
      } else {
        ctx.status = 200;
        return new ctx.helper._error("没有改动");
      }
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }


}

module.exports = PaperService;
