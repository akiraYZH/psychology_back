module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const p_msg = app.model.define(
    "p_msg",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "站内信id",
      },
      from_id: {
        type: INTEGER,
        comment: "来源id(-1为系统信息)",
        defaultValue:-1,
        allowNull:false
      },
      to_id: {
        type: INTEGER,
        comment: "目标id",
        allowNull:false
      },
      content: { type: TEXT, comment: "内容",allowNull:false},
      state: { type: INTEGER(11), comment: "0:未读， 1:已读",  defaultValue: 0,allowNull:false},
      status: {type:INTEGER(11),defaultValue:1,comment:"1:正常 0:停止使用",allowNull:false}
    },
    {
      //timestamp:true会自动创建created_at和updated_at字段
      timestamps: false,
      tableName: "p_msg",
    }
  );

    // p_msg.associate=function(){
    //   app.model.Tables.PUser.hasMany(app.model.Tables.PMsg, {foreignKey:"to_id", as:"to", constraints:false});
    //   app.model.Tables.PMsg.belongsTo(app.model.Tables.PUser, {foreignKey:"from_id", as:"to", constraints:false});
    //   // app.model.Tables.PMsg.belongsToMany(app.model.Tables.PUser, {foreignKey:"from_id", through:"p_msg", constraints:true});
    // }
  // p_msg.sync({
  //   //改变表的结构，保留数据
  //   alter: true
  // }).then(() => {
  //   console.log("p_msg Table has been created");
  // });
  return p_msg;
};
