module.exports = (app) => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;
    const p_paper_user = app.model.define(
      "p_paper_user",
      {
        id: {
          type: INTEGER(11),
          primaryKey: true,
          autoIncrement: true,
          comment: "分配记录id",
        },
        user_id: {
          type: INTEGER(11),
          comment: "用户id",
          allowNull: false,
        },
        distributor_id: {
          type: INTEGER(11),
          comment: "派发人id",
          allowNull: false,
        },
        paper_id: {
            type: INTEGER,
            comment: "试卷id",
            allowNull: false,
          },
        time_stamp: { type: STRING(13), comment: "生成时间戳", allowNull: false },
        state: {
            type: INTEGER(11),
            defaultValue: 0,
            comment: "1:完成 0:未完成",
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
        tableName: "p_paper_user",
      }
    );
  
    p_paper_user.associate=function(){
      
      app.model.Tables.PPaperUser.belongsTo(app.model.Tables.PUser,{foreignKey:"user_id"});
      app.model.Tables.PPaperUser.belongsTo(app.model.Tables.PUser,{foreignKey:"distributor_id"})
      app.model.Tables.PPaperUser.belongsTo(app.model.Tables.PPaper,{foreignKey:"paper_id"})

    }
    // p_paper_user
    //   .sync({
    //     //改变表的结构，保留数据
    //     alter: true,
    //   })
    //   .then(() => {
    //     console.log("p_paper_user Table has been created");
    //   });
    return p_paper_user;
  };
  