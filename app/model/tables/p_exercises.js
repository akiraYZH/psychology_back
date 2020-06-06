module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const p_exercises = app.model.define(
    "p_exercises",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "站内信id",
      },
      title: { type: STRING(255), comment: "内容题目",allowNull:false},
      option_obj: { type: TEXT, comment: "答案选项json",allowNull:false},
      score_obj: { type: TEXT, comment: "答案分数json",allowNull:false},
      option_score_obj: { type: TEXT, comment: "选项和分数",allowNull:false},
      mold_id: {
        type: INTEGER(11),
        comment: "题目类型,1选择题",
        defaultValue:1,
        allowNull:false
      },
      type_id: {
        type: INTEGER(11),
        comment: "题目类型id，待定",
        allowNull:false
      },
      status: {type:INTEGER(11),defaultValue:1,comment:"1:正常 0:停止使用",allowNull:false}
    },
    {
      //timestamp:true会自动创建created_at和updated_at字段
      timestamps: false,
      tableName: "p_exercises",
    }
  );


  return p_exercises;
};
