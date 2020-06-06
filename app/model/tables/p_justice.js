module.exports = (app) => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;
    const p_justice = app.model.define(
      "p_justice",
      {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
          comment: "地点id",
        },
        parent_id: {
          type: INTEGER,
          comment: "父级id",
          allowNull:false
        },
        name: { type: STRING(10), comment: "名称",allowNull:false},
        // status: {type:INTEGER(11),defaultValue:1,comment:"1:正常 0:停止使用",allowNull:false}
      },
      {
        //timestamp:true会自动创建created_at和updated_at字段
        timestamps: false,
        tableName: "p_justice",
      }
    );
  
    // console.log(app.model);
    
  
    // p_justice.sync({
    //   //改变表的结构，保留数据
    //   alter: true
    // }).then(() => {
    //   console.log("p_justice Table has been created");
    // });
    return p_justice;
  };
  