module.exports = (app) => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;
    const p_paper = app.model.define(
      "p_paper",
      {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
          comment: "试卷id",
        },
        title: {
          type: STRING(255),
          comment: "试卷标题",
          allowNull: false,
        },
        worker_id: {
          type: INTEGER(11),
          comment: "创建人id",
          allowNull: false,
        },
        time_stamp: { type: STRING(13), comment: "生成时间戳", allowNull: false },
        exercises_json: {
            type: TEXT,
            comment: "所包含题目ID集合",
            allowNull: false,
          },
        status: {
          type: INTEGER(11),
          defaultValue: 1,
          comment: "1:正常 0:停止使用",
          allowNull: false,
        },
      },
      {
        //timestamp:true会自动创建created_at和updated_at字段
        timestamps: false,
        tableName: "p_paper",
        engine:"innoDB"
      }
    );
  
    p_paper.associate=function(){
      app.model.Tables.PPaper.belongsTo(app.model.Tables.PUser,{foreignKey:"worker_id"})
    }
    // p_paper
    //   .sync({
    //     //改变表的结构，保留数据
    //     alter: true,
    //   })
    //   .then(() => {
    //     console.log("p_paper Table has been created");
    //   });
    return p_paper;
  };
  