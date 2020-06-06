module.exports = (app) => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;
    const p_type = app.model.define(
      "p_type",
      {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
          comment: "症状种类id",
        },
        name: {
          type: STRING(255),
          comment: "症状名称",
        },
        symtom_free: { type: TEXT, comment: "无症状评价", allowNull: true },
        symtom_free_advice: { type: TEXT, comment: "无症状建议", allowNull: true },
        low: { type: TEXT, comment: "轻度症状评价", allowNull: true },
        low_advice: { type: TEXT, comment: "轻度症状建议", allowNull: true },
        middle: { type: TEXT, comment: "中度症状评价", allowNull: true},
        middle_advice: { type: TEXT, comment: "中度症状建议", allowNull: true },
        high: { type: TEXT, comment: "重度症状评价", allowNull: true},
        high_advice: { type: TEXT, comment: "重度症状建议", allowNull: true },
        status: {type:INTEGER(11),defaultValue:1,comment:"1:正常 0:停止使用"}
      },
      {
        //timestamp:true会自动创建created_at和updated_at字段
        timestamps: false,
        tableName: "p_type",
      }
    );
  
    // app.ready=function(){
     
    // }
    // p_type.associate=function(){
    //   app.model.Tables.PType.hasMany(app.model.Tables.PExercises,{foreignKey:"type_id"});
    // }
  
    return p_type;
  };
  