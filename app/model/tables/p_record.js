module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const p_record = app.model.define(
    "p_record",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "记录id",
      },
      operator_id: {
        type: INTEGER,
        comment: "留下记录的用户id",
        allowNull: false,
      },
      worker_id: {
        type: INTEGER,
        comment: "负责工作人员id",
        allowNull: false,
      },
      time_stamp: { type: STRING(13), comment: "生成时间戳", allowNull: false },
      type_id: {
        type: INTEGER(11),
        comment: "记录类型,1答卷2面谈",
        allowNull: false,
      },
      content: { type: TEXT, comment: "面谈内容", allowNull: true },
      score: {
        type: STRING(255),
        comment: "答卷总得分，用于导出Excel",
        allowNull: true,
      },
      title: {
        type: STRING(255),
        comment: "面谈标题或问卷标题",
        allowNull: true,
      },
      paper_evaluation: { type: TEXT, comment: "答卷评价", allowNull: true },
      paper_exercises: {
        type: TEXT,
        comment: "用户的答卷答案",
        allowNull: true,
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
      tableName: "p_record",
    }
  );

  p_record.associate=function(){
    app.model.Tables.PRecord.belongsTo(app.model.Tables.PUser,{foreignKey:"operator_id", as:"user"});
    app.model.Tables.PRecord.belongsTo(app.model.Tables.PUser,{foreignKey:"worker_id", as:"doctor"});
    // app.model.Tables.PUser.belongsTo(app.model.Tables.PRole,{foreignKey:"role_id", onDelete:"SET NULL"});
  }

  return p_record;
};
