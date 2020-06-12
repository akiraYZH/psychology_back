const Service = require("egg").Service;
const Op = require("sequelize").Op;


class ExerciseService extends Service {
  async add(data) {
    const { ctx } = this;
    const { PExercises } = this.app.model.Tables;
    try {
      if (
        ctx.request.body.option_obj.length == ctx.request.body.score_obj.length
      ) {
        let option_score_obj = [];
        let aOptions = data.option_obj;
        let aScores = data.score_obj;

        aOptions.forEach((item, index) => {
          option_score_obj.push({ option: item, score: aScores[index] });
        });

        let result = await PExercises.create({
          title: data.title,
          option_obj: JSON.stringify(aOptions),
          score_obj: JSON.stringify(aScores),
          option_score_obj: JSON.stringify(option_score_obj),
          type_id: data.type_id,
        });

        if (result) {
          console.log(result);

          ctx.status = 200;
          return new this.ctx.helper._success();
        } else {
          ctx.status = 500;
          return new this.ctx.helper._error();
        }
      } else {
        status = 400;
        ctx.body = new this.ctx.helper._error("有题目没有设置分数");
      }
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async multiAdd(data) {
    const { ctx } = this;
    const { PExercises } = this.app.model.Tables;
    //创建事务对象
    let transaction = await this.ctx.model.transaction();
    try {
      let exList = data.exList;
      let noScoreIndex = -1;
      for (let i = 0; i < exList.length; i++) {
        if (exList[i].option_obj.length != exList[i].score_obj.length) {
          noScoreIndex = i;
          break;
        }
      }
      if (noScoreIndex != -1) {
        ctx.status = 400;
        ctx.body = new this.ctx.helper._error(
          "第" + (noScoreIndex + 1) + "题有选项没有设置分数"
        );
      } else {
        exList.forEach((item) => {
          item.option_score_obj = [];
          item.option_obj.forEach((item2, index2) => {
            item.option_score_obj.push({
              question: item2,
              score: item.score_obj[index2],
            });
          });
          item.option_obj = JSON.stringify(item.option_obj);
          item.score_obj = JSON.stringify(item.score_obj);
          item.option_score_obj = JSON.stringify(item.option_score_obj);
        });

        for (let i = 0; i < exList.length; i++) {
          await PExercises.create(exList[i], { transaction });
        }

        await transaction.commit();
        ctx.status=200;
        return new this.ctx.helper._success();
      }
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async getList(data) {
    const { ctx, service } = this;
    const { PExercises } = this.app.model.Tables;

    try {
      console.log(data);
      let options = {
        where: {
          type_id: data.type_id,
          title: { [Op.like]: `%${data.title}%` },
          // title: { "like": `%${data.title}%` },
          status: 1,
        },
        attributes: ["id","title", "option_score_obj", "mold_id", "type_id"],
        offset: Number(data.now_page)
          ? (Number(data.now_page) - 1) * Number(data.now_page)
          : 0,
        limit: Number(data.num_in_page) || 10
      }
      
      
      const result = await ctx.helper.selectWithPagging(PExercises, options);

      result.data.forEach(item=>{
        item.option_score_obj= JSON.parse(item.option_score_obj);
      })

      ctx.status = 200;
      let template = new ctx.helper._success();
      return Object.assign(template, result);
    } catch (e) {
      console.log(e);

      this.ctx.status = 500;
      return new this.ctx.helper._error();
    }
  }

  async update(data) {
    const { ctx } = this;
    const { PExercises } = this.app.model.Tables;
    try {
      let condition = { id: data.id, status: 1 };
      delete data.id;
      if (
        ctx.request.body.option_obj.length == ctx.request.body.score_obj.length
      ) {
        let option_score_obj = [];
        let aOptions = data.option_obj;
        let aScores = data.score_obj;

        aOptions.forEach((item, index) => {
          option_score_obj.push({ option: item, score: aScores[index] });
        });

        let result = await PExercises.update({
          title: data.title,
          option_obj: JSON.stringify(aOptions),
          score_obj: JSON.stringify(aScores),
          option_score_obj: JSON.stringify(option_score_obj),
          type_id: data.type_id,
        },{where:condition});

        if (result[0] > 0) {
          ctx.status = 200;
          return new ctx.helper._success();
        } else {
          ctx.status = 404;
          return new ctx.helper._error("没有修改");
        }
      } else {
        status = 400;
        ctx.body = new this.ctx.helper._error("有题目没有设置分数");
      }

      
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async del(data) {
    const { ctx } = this;
    const { PExercises } = this.app.model.Tables;
    try {
      let condition = { id: data.id, status: 1 };
      let result = await PExercises.update({ status: 0 }, { where: condition });

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

module.exports = ExerciseService;
